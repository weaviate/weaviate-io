---
title: How to build a custom module
sidebar_position: 3
image: og/contributor-guide/weaviate-modules.jpg
# tags: ['contributor-guide', 'weaviate module system', 'custom module']
---
# Module creation in a nutshell

If you have your own vectorizer, machine learning or other model that you want to use with Weaviate, you can build your own Weaviate Module.

The visualization below shows how modules are part of and connected to Weaviate. The black border indicates Weaviate Core, with the grey boxes as internals. Everything in red involves how Weaviate uses the modules that are connected, with the general Module System API. The red Module API spans two internal 'layers', because it can influence the Weaviate APIs (e.g. by extending GraphQL or providing additional properties), and it can influence the business logic (e.g. by taking the properties of an object and setting a vector).

Everything that is blue belongs to a specific module (more than one module can be attached, but here we show one module). Here we have an example of Weaviate using the `text2vec-transformers` module `bert-base-uncased`. Everything that belongs to the `text2vec-transformers` module is thus drawn in blue. The blue box inside Weaviate Core is the part 1 of the module: the module code for Weaviate. The blue box outside Weaviate Core is the separate inference service, part 2.

The picture shows three APIs:
* The first grey box inside Weaviate Core, which is the user-facing RESTful and GraphQL API.
* The red box is the Module System API, which are interfaces written in Go.
* The third API is completely owned by the module, which is used to communicate with the separate module container. This is in this case a Python container, shown on the left.

To use a custom ML model with Weaviate, you have two options:
* A: Replace parts of an existing module, where you only replace the inference service (part 2). You don't have to touch Weaviate Core here. This is a good option for fast prototyping and proofs of concepts. In this case, you simply replace the inference model (part 2), but keep the interface with Weaviate in Go. This is a quick way to integrate completely different model types.
* B: Build a complete new module and replace all existing (blue) module parts (both 1 and 2). You can configure custom behavior like extending the GraphQL API, as long as the module can hook into the 'red' Module System API. Keep in mind that you'll need to write some module code in Go to achieve this.

On this page, you'll find how to create a complete new module (option B), so building part 1 and 2. If you only want to replace part 2 (so making use of an existing Weaviate module's API design), you can find instructions [here](/developers/weaviate/modules/other-modules/custom-modules.md#a-replace-parts-of-an-existing-module).

![Weaviate module APIs overview](/img/contributor-guide/weaviate-modules/weaviate-module-apis.svg "Weaviate module APIs overview")

# Prerequisites

This requires some programming in Golang, since you'll need to build the module for Weaviate, which is written in Go. You don't need to be a very experienced Go programmer, but you'll need some basic understanding of how this statically typed language works. You can view and copy code from other modules to your own project, which is explained later. You'll build a custom module ([part 1 of this image](./architecture.md#visualization)), as well as a custom inference service ([part 2](./architecture.md#visualization)). It is recommended to understand the module architecture of Weaviate which you can read [here](./overview.md) (overview) and [here](./architecture.md) (architecture), before you start building your own module.

If you want to make a pull request to Weaviate with your custom module, make sure to adhere to the [code structure](../weaviate-core/structure.md).

# How to get started

## Design the internal Weaviate Module (part 1)

Before you start programming, make sure you have a good design and idea how your module should look like:
1. The name of the module should follow the [naming convention](./overview.md#module-characteristics). For a vectorizer: `<media>2vec-<name>-<optional>` and other modules: `<functionality>-<name>-<optional>`.
2. Optional GraphQL [`_additional` property fields](/developers/weaviate/api/graphql/additional-properties.md). Here you can return any new field with data that you would like. Make sure the field name doesn't clash with existing field names, like `id`, `certainty`, `classification` and `featureProjection`, and `_additional` fields of other modules that you activate in the same startup configuration. New `_additional` fields can also have subfields.
3. Optional GraphQL [filters](/developers/weaviate/api/graphql/filters.md). You can make a new GraphQL filter on different levels. If your filter is a 'class-level influencer' that influences which results will be returned, you can introduce it at the `Class` level. Examples are `near<Foo>`, `limit` or `ask`. If your module would only enhance existing results, you should scope the filter to the new `_additional` property. An example is `featureProjection`.
4. Think about what you or another user should be able to configure to use this Weaviate Module. Configuration can be passed in the Weaviate configuration (e.g. in the [docker-compose.yml file](https://github.com/weaviate/weaviate-examples/blob/4edd6ee767d0e80bca1dd8d982db2378992ddb67/weaviate-contextionary-newspublications/docker-compose.yaml#L24-L29)).

## Design the inference model (part 2)

The inference model is a service that provides at least four API endpoints:
1. `GET /.well-known/live` responds `204` when the app is alive.
2. `GET /.well-known/ready` responds `204` when the app is ready to serve traffic.
3. `GET /meta` responds meta information about the inference model.
4. `POST /<foo>` (at least 1) is the endpoint that the Weaviate Module uses for inference. For a vectorizer this might for example be `POST /vectors`, which takes a JSON body with the data to vectorize. A vector will be returned (in JSON format). The Question Answering model, on the other hand, has an endpoint `POST /answers`, which takes a JSON body with the text to tokenize and returns a list of tokens found in the text (also formatted as JSON).

You can always ask us on [the forum](https://forum.weaviate.io/), [Slack](https://weaviate.io/slack) or [GitHub](https://github.com/weaviate/weaviate/issues) to get help with the design.

# How to build a custom module - guidelines

Once you are happy with the design, you can [fork the latest Weaviate version](https://github.com/weaviate/weaviate) and make a new branch from master.
Ideally, you create an [issue on GitHub](https://github.com/weaviate/weaviate/issues) with the module. Now you can refer to this issue in you commits, as well as ask for feedback from us and the community.

These guidelines follow the example of the [QnA module](https://github.com/weaviate/weaviate/tree/master/modules/qna-transformers). This is a module with an additional feature, no vectorization module. It adds information in the GraphQL `_additional` field by examining the data in Weaviate.

## 1. First files

1. In the `/modules` folder, make a new folder with the name of your module. Make sure to adhere to the [naming convention](./overview.md#module-characteristics).
2. Add a file `config.go` ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/config.go)). This file describes some configuration of the module to Weaviate. You can copy/paste most of the example file, make sure to adapt the functions' receiver names.
2. Add a file `module.go` ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/module.go)). This file describes the module as a whole and its capabilities. You will, again, be able to copy most of an example file to your project. Make sure to define which `modulecapabilities` (from [here](https://github.com/weaviate/weaviate/tree/master/entities/modulecapabilities)) you want to use (this will be explained later).

## 2. Add GraphQL additional query, filter and result fields

If you want to add GraphQL query and results field with your module, you can add them in the `_additional` field (note, filters may also appear on higher level, see [above](#design-the-internal-weaviate-module-part-1)). Information in this field contains additional information per data objects that is returned by the GraphQL query. If you are making a vectorization module, you might not need a new `_additional` field, so follow these steps only if you made a new field in your design.

1. First, add a folder called `additional` in the module.
2. In here, make a file `provider.go`, a folder named `/models` with a file `models.go` and a folder named which describes your new additional field (in this example `/answer`)
3. In `models.go`, define the new field as a `struct`. For example, [here](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/models/models.go) the struct `Answer` defines the fields that will be added to the GraphQL `_additional { answer {} }` field. GraphQL results are in JSON, so we need to specify that. `"omitempty"` should be added to prevent GraphQL errors.
4. In `/answer`, we will define the result using the [GraphQL Go library](https://github.com/graphql-go/graphql). In this folder, we make 3 files to add GraphQL result fields:
    1. `newField_graphql_field.go`(e.g. [`answer_graphql_field.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer_graphql_field.go)). Here we write the complete GraphQL `_additional {newField}`. We make use of the GraphQL Go library to define the new function.  If you would like to add a filter in this new `_additional` field, you can define that here. If you would like to add a filter on a higher level in the GraphQL query (not in the `_additional` field), you don't need to define this in this file, but on a higher level ([see for example the QnA `ask` filter](https://github.com/weaviate/weaviate/tree/master/modules/qna-transformers/ask)).
    2. `<fieldname>.go` (e.g. [`answer.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer.go)). `AdditionalPropertyFn` will be called when the GraphQL `_additional {<new_field>} ` field is called. Best is to refer to a new function, which is the next file to create.
    3. `<fieldname>_result.go` (e.g. [`answer_result.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer_result.go)). Here's the function that goes from argument values (in `params`) and a list of returned data objects (in `in`), to results in your new `_additional { newField {} }`, via a call to the inference container. It should return a struct defined in `/ent/<foo>_result.go`. For example in [`/ent/vectorization_result.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ent/vectorization_result.go), we see a struct `AnswerResult`.
    It is recommended to first return some hard-coded values, to validate this is working correctly without calling the inference API.
5. Finally, let's look at `provider.go`. In here the connection between the new `_additional {}` field and Weaviate is defined. With this module, you want to add information to the `_additional {}` field with a new field. We need to define this here, to let the GraphQL fields appear when the module is selected in the Weaviate setup. Methods to return a GraphQL result should follow Weaviate's module API. Those methods are written in [`/entities/modulecapabilities`](https://github.com/weaviate/weaviate/tree/master/entities/modulecapabilities). See [here](./architecture.md#module-capabilities-additionalgo) for a detailed explanation of what you can find in [`additional.go`](https://github.com/weaviate/weaviate/blob/master/entities/modulecapabilities/additional.go).

It is recommended to [test](#running-and-testing-weaviate-during-development) what you built until now with hardcoded data (so without making a call to an inference API yet). You can replace this later with actual calls.

Make sure to also write tests for the GraphQL field and for the result (e.g. [this](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer_graphql_field_test.go) and [this](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer_test.go)).

## 3. Add GraphQL filter (other than in `_additional`)

If you choose to add a filter outside the `_additional` GraphQL field, you need to take a slightly different approach to add the filter arguments as explained in the previous step. That is because you can't include the filter arguments in the `/additional` GraphQL field. For example, the QnA module has the filter `ask` on class level (click [here](/developers/weaviate/modules/reader-generator-modules/qna-transformers.md#graphql-ask-search) for an example). This argument was created in a new folder inside the new module folder in Weaviate ([example](https://github.com/weaviate/weaviate/tree/master/modules/qna-transformers/ask)). To achieve this, make sure to follow these steps:
1. Create a new folder inside your new module folder with the name of the filter (e.g. [`/ask`](https://github.com/weaviate/weaviate/tree/master/modules/qna-transformers/ask)). In this folder:
2. Define the GraphQL filter arguments in `graphql_argument.go` ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ask/graphql_argument.go), and also write a test for this.
3. Define the parameters in `params.go` ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ask/param.go)).
4. In [`graphql_provider.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ask/graphql_provider.go), you define which `modulecapabilities` of Weaviate you want to use with this filter.
5. Additionally, you can add some 'helper functions', for example to extract parameter values (see [`param_helper.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ask/param_helper.go) and [`params_extract.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ask/grapqhl_extract.go)) (and don't forget the tests).
6. Make sure to let Weaviate know about this new filter and arguments in a file in the new module folder ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ask.go)).
7. Again, you can first fill the filter arguments with some hardcoded values to test, before you use the filter's values to compute the GraphQL result (which you do for example [here](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer_result.go#L28)).

## 4. Design the client for communication with the inference app

The internal Weaviate module makes `http` requests to a service that does the actual inference or computation. You need to define this connection in the Weaviate module.

1. Create a `/clients` folder.
2. Create a `startup.go` file ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/startup.go)). Weaviate uses the functions `WaitForStartup()` and `checkReady` to connect to the specified inference service location, by calling the `"/.well-known/ready"` endpoint of the container. Most likely, you will be able to copy and past [this file](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/startup.go) almost completely to your project (you need to change the function receiver and the warning messages to your custom module).
3. Create a `<>_meta.go` file (e.g. [`qna_meta.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/qna_meta.go)). The function `MetaInfo()` will use the `/meta` endpoint of the service to collect meta information, which will be exposed in Weaviate's `/meta` endpoint.
4. Create a file (e.g. [`qna.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/qna.go)) that calls the inference service and returns results that you want to add to the GraphQL result. You can use the arguments and GraphQL results, and your custom inference container to return the module's results in the `_additional {}` field. The result should be in the format (struct) you define in `/ent/<module>_result.go` (e.g. [`/ent/vectorization_result.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/ent/vectorization_result.go)). For now, you can return any hardcoded data (and not make an actual call to the inference API), to test whether this function works.
5. Create tests: testing `meta` ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/qna_meta_test.go)) and `startup` ([example](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/startup_test.go)).

## 5. Create the inference container

So far we've programmed the module inside Weaviate. Now, let's work on the inference container, which takes care of the actual machine learning or data enhancement. This should be a service, that is running when Weaviate is using the module or can be packed in a container (which is recommended). The service API should have at least 4 endpoints, described above. Make sure that the body of the actual inference endpoint(s) accepts JSON with data that is sent by Weaviate (which you defined in e.g. [`qna.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/qna.go)), and that it returns JSON that Weaviate understands (as you defined in e.g. [`qna.go`: `answersResponse`](https://github.com/weaviate/weaviate/blob/7036332051486b393d83f9ea2ffb0ca1b2269328/modules/qna-transformers/clients/qna.go#L94)).

How you build the inference service is up to you. For example, if you have your own machine learning model, you could write a Python wrapper around it, using for example [`FastAPI`](https://fastapi.tiangolo.com/).

## 6. Call the inference container

Now it is time to replace any hardcoded data from previous steps with results from an API call.
1. Call the inference container in the dedicated script you wrote in the `/client` folder (e.g. [`qna.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/clients/qna.go)).
2. Finish your `/additional/<fieldname>_result.go` function by replacing hardcoded return values with values you get from the inference API (e.g. [`answer_result.go`](https://github.com/weaviate/weaviate/blob/master/modules/qna-transformers/additional/answer/answer_result.go)).

## 7. Add user-specific configuration

Add user-specific configuration to both the Weaviate module and the inference API that you omitted for simplification in the previous steps.

# Running and testing Weaviate during development

During development of the new Module, you can run Weaviate locally. Make sure to have the following set:
1. Your module should be present in the (local) [`/modules` folder](https://github.com/weaviate/weaviate/tree/master/modules).
2. Hook up the module to Weaviate. The module will not be 'turned on' if you don't say so in `docker-compose.yml`.
    1. In `/adapters/handlers/rest/configure_api.go`, add your module to the import list ([example](https://github.com/weaviate/weaviate/blob/7036332051486b393d83f9ea2ffb0ca1b2269328/adapters/handlers/rest/configure_api.go#L37)), and register it as a module ([example](https://github.com/weaviate/weaviate/blob/7036332051486b393d83f9ea2ffb0ca1b2269328/adapters/handlers/rest/configure_api.go#L330-L332)). The module will not be turned on if you don't say so in the Docker Compose file. Use the name of the module here, the same as you have used as folder name in the `/modules`.
    2. Add the service to `tools/dev/restart_dev_environment.go` ([example](https://github.com/weaviate/weaviate/blob/7036332051486b393d83f9ea2ffb0ca1b2269328/tools/dev/restart_dev_environment.sh#L21-L23)). Here you define the argument (to start the dev environment) that will start the correct Weaviate setup. In the example, the argument is `i2v-neural`.
    3. Add the service to `tools/dev/run_dev_server.sh` ([example](https://github.com/weaviate/weaviate/blob/7036332051486b393d83f9ea2ffb0ca1b2269328/tools/dev/run_dev_server.sh#L77-L92)). This is the Docker Compose setup for running the development server. Define where the new modules should run and configure them. It also includes the command to run Weaviate, you can copy this.
    4. And add the service to `docker-compose.yml`([example](https://github.com/weaviate/weaviate/blob/7036332051486b393d83f9ea2ffb0ca1b2269328/docker-compose.yml#L37-L40)). The inference container (part 2) should be running on the defined port.

Inside the Weaviate project folder, run

```bash
tools/dev/restart_dev_environment.sh --<SERVICE-NAME>
# e.g. tools/dev/restart_dev_environment.sh --i2v-neural
```

to restart the development server. Then, run

```bash
tools/dev/run_dev_server.sh --<LOCAL-CONFIG-NAME>
# e.g. tools/dev/run_dev_server.sh --local-image
```

You can now load in any sample or test dataset. If you only make changes in the `/modules/<new-module>` folder afterwards, you only need to re-run `tools/dev/run_dev_server.sh --<LOCAL-CONFIG-NAME>` to apply the changes. The data will be kept, so no need to re-import.

#### Passing tests
Before you submit your PR, your new module implementation must pass all existing tests and any new tests that you added. How to run tests, [check this page](../weaviate-core/tests.md#run-the-whole-pipeline).
