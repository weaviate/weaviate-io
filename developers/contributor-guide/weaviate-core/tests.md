---
title: Tests
sidebar_position: 3
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---

## Philosophy

### Test Pyramid

Weaviate Core follows a typical [Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html) approach. As Weaviate itself contains no graphical user interface (GUI), the highest level tests test the user journeys at an API level.

The tests are grouped into the following three levels:

#### Unit tests

Unit tests test the smallest possible unit, mostly one "class" (usually a `struct` in golang) with its methods. Unit tests are designed to validate the business logic and not the internals.

Unit tests are stateless and do not depend on any external programs or runtime other than the Golang-built tools. (Note: We do make use of the [stretchr/testify](https://github.com/stretchr/testify) packages. However, they are installed with any other code-level dependency and don't require running dedicated software).

This makes tests fast to execute, easy to adapt and easy to run with third-party tools like code watchers.

#### Integration tests

Integration tests test anything that crosses a boundary. A boundary could be the dependence on an external party (e.g. a third-party database) or an independent custom tool, such as the contextionary.

With the standalone feature we also make use of integration tests to test disk access. As outlined above, unit tests are meant to be stateless. We consider accessing the filesystem from the code as a boundary in the sense that they should be an integration test.

Integration tests may require third-party dependencies which can be spun up using docker. Convenience scripts are provided, see below.

Slow integration tests (run-time of over 10s) receive a different build tag, so those slow tests can be skipped during local development if they are not required. See the section on how to run tests for details.

#### Journey tests

The highest level tests are journey tests. As the top of the pyramid, those tests come with the highest execution cost. There should thus be a few. At the same time they provide a lot of value as they make sure all the components play together. Journey tests don't usually care about edge cases, but rather about validating that a user journey is possible.

Journey-tests are black-box tests. This means the test code is completely unaware of any of the internals of Weaviate. Compare this to the unit or integration tests which tests snippets of (Golang) code. The journey tests test an application. The only way for the journey test to interact with the application is through means that are also available to users, such as the public APIs. Our Journey tests are written in Golang to keep the context-switching to a minimum for developers, but the fact that they only test APIs and not code means that they could technically be written in any language.

This makes sure that the UX for our users is great and the most important features are always working as intended. As a downside they come with the highest execution cost because journey tests need to compile and run the application before being able to run the tests themselves. In addition any runtime [backing service](https://12factor.net/backing-services) must also be present in a test scenario. To make this easy for developers, we provide convenience scripts which build both the application and all backing services and runs them in `Docker Compose`.

Backing services are always ephemeral and will be created solely for the tests. Weaviate will never require a test runtime that it does not create itself. This makes clean up easy and our tests very portable. New contributors should be able to run the entire test pipeline locally within seconds after first cloning the repository.

### Benchmark tests

These tests have two functions:

1) Identify regressions automatically before they are merged.
2) Enable performance tracking over time.

They are currently very limited but will be extended over time.

### Test coverage

We aim to have the highest useful test coverage possible. In some cases this might mean 100% test coverages, in other scenarios this might be considerably less. Golang is very explicit about it's error handling. Especially as errors are wrapped (or "annotated") you will find a lot of `if err != nil { ... }` statements. Each of those if statements is a code branch that - if left untested - will reduce the overall coverage. Whether each error case should have an explicit test case is something that you should decide based upon how much value such a test adds. Not necessarily on coverage numbers alone.

Nevertheless, you should aim to always make sure that your contribution does not lower the overall test coverage. We have `codecov` installed in our CI pipeline to prevent you from accidentally contributing something that would lower the coverage.

### Cross-repository dependencies

There are various ways to interact with the Weaviate API. You can send HTTP requests directly or you could use a client, such as the [python client](/developers/weaviate/client-libraries/python/index.md) to interact with Weaviate. In the Weaviate core repository we have chosen not to use any of our own clients. This has the goal to minimize dependencies and allow independent development by different teams.

As a result all journey tests in Weaviate core either use the go client (which is auto-generated from swagger) or plain HTTP.

## How to run tests

### Run the whole pipeline

There is a convenience script available which runs the entire test pipeline in the same fashion that it is run on CI. It only requires a correctly set up Golang environment, as well as `Docker Compose` to be set up on your machine.

You can run the entire pipeline, except the benchmark tests, using:

```sh
test/run.sh
```

This script will run tests exactly the same way as on CI, i.e. all levels, including "slow" tests. If this script passes locally - and there are no flaky tests - the test section on CI will pass as well.

### Unit tests

As outlined in the Philosophy, unit tests have no dependencies other than the vendor code dependencies. You can thus run them with pure `go test` commands. For example to run all unit tests, simply run:

```sh
go test ./...
```

#### Adding new unit tests

* Add unit tests in the same folder as the code they are testing
* Aim to write "black box" unit tests that test the public ("exported") methods of the class under test without knowing too much about the internals.
* Do not use any build tags.

### Integration tests
As outline in the Philosophy, integration tests require backing services to be run. We have a convenience script available which starts all required services in `Docker Compose` and runs the tests against it:

```sh
test/integration/run.sh
```

#### Adding new integration tests

* Use the `integrationTest` build tag on your test, so it is ignored during unit test runs.
* Make sure the test prepares for and cleans up after itself, so tests can be run in succession.
* If your test requires a lot of time to execute, consider marking it as a slow test and making it optional. (see below).

#### Slow integration tests

With the introduction of Standalone mode there is some behavior that needs to be tested at scale. For example, the HNSW index might work fine on a fictional test set where all entries are on layer 0, but then break once several layers need to be traversed.

Similarly tests which test recall (in an HNSW index) require a dataset size, where the number of nodes is considerably larger than the `ef` parameter at search. Otherwise the search is a full-dataset scan which will always have 100% recall.

These tests are considered "slow tests". They are an important part in our test pipeline. The slow tests are important for release testing, however, individual tests might not be important for feature testing. Therefore these tests. Therefore these tests are opt-in with the `--include-slow` flag on the test runner:

```sh
test/integration/run.sh --include-slow
```

Note that while slow tests are optional on the integration test runner script, the overall test script (`test/run.sh`) does set this option. Therefore any optional test becomes a required test on CI - or when running the CI-like script locally.

To mark an integration test as "slow" simply use the `integrationTestSlow` build tag, instead of the `integrationTest` tag.

### Journey tests
As outline in the Philosophy, journey tests require the application to be compiled as well as all backing services to be running. We have a convenience script available which starts all required services in `Docker Compose` and runs the tests against it.

The script is part of the overall pipeline script, but you can configure it to run only the journey tests like so:

```
test/run.sh --acceptance-only
```

#### Add a new journey test
Journey tests don't use any specific build tags, however, they are all isolated in a specific folder. This folder is ignored during integration or unit test runs.

To add a new test, pick the most appropriate sub-folder (or add a new one) in `test/acceptance`.

### Benchmark tests

Benchmark tests are not run automatically with the `run.sh` script. They can be started using

```sh
test/run.sh --benchmark-only
```

Their output is the runtime of the benchmarks. It prints the results and additionally writes them into a file.

To run these benchmarks `git lfs` must be installed and initialized by running the following in the Weaviate repository:

```sh
git lfs install
```

## Tools and Frameworks

We use the default Golang testing structure, to organize tests. This means a test block is wrapped in a `func TestMyUnit(t *testing.T) {}` block. Inside this the `t.Run("description", func(t *testing.T) {})` blocks are used to add more structure to the test.

Prefer the use of [stretchr/testify](https://github.com/stretchr/testify) to make assertions. We consider the readability of testify assertions higher than those of raw if statements if no assertion library was used.

If there are cases which cannot be solved using `testify`, write a manual assertion.

### Catastrophic Failure of tests
Use the `assert` package if a failure of this tests is not catastrophic and use the `require` package if a test should not execute beyond a failure.

A typical scenario for this is checking for an error when we know that the other return value would be nil otherwise. For example:

```
res, err := DoSomethingAwesome()
require.Nil(t, err)
assert.Equal(t, "foo", res.Name)
```

If we didn't use `require` on the error, the test would continue executing. Therefore the last line would panic as `res.Name` would try to access a property of a nil-object.

By using `require.Nil` we can abort this test early, if an unexpected error was returned.

## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />
