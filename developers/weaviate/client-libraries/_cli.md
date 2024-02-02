---
title: Weaviate CLI
sidebar_position: 90
image: og/docs/client-libraries.jpg
# tags: ['cli']
---


:::note Weaviate CLI version
The current Weaviate CLI version is `v||site.weaviate_cli_version||`.
:::

## Installation

The Weaviate CLI is available on [Pypi.org](https://pypi.org/project/weaviate-cli/). The package can be easily installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for Python 3.7 and higher.

The Weaviate CLI can be installed with:

```sh
pip install weaviate-cli
```

To check if the cli is installed correctly, run:

```sh
weaviate version
```

which should return ||site.weaviate_cli_version||.

## Functions

### Configuration

You need to configure the CLI tool before you can interact with you Weaviate instance. This can be done manually or by adding flags to commands.
- Manually (interactive):
  ```sh
  weaviate config set
  ```
  or
  ```sh
  weaviate init
  ```
  After which you will be asked to enter the Weaviate URL and authentication mode.

- Flags: if you didn't configure the CLI manually, you can add a configuration flag pointing to a configuration json file (`--config-file myconfig.json`) with every command you execute.

  ```bash
  weaviate --config-file myconfig.json
  ```

  in which `myconfig.json` should look like:
  ```json
  {
    "url": "http://localhost:8080",
    "auth": null
  }
  ```
  or
  ```json
  {
    "url": "http://localhost:8080",
    "auth": {
        "type": "client_secret",
        "secret": <your_client_secret>
    }
  }
  ```
  or

  ```json
  {
    "url": "http://localhost:8080",
    "auth": {
        "type": "username_and_password",
        "user": <user name>,
        "pass": <user password>
    }
  }
  ```
  or

  ```json
  {
    "url": "http://localhost:8080",
    "auth": {
        "type": "api_key",
        "api_key": <api key>
    }
  }
  ```

You can view the configuration with the command:

```sh
weaviate config view
```

### Ping
You can ping the Weaviate URL you're connected to with:
```sh
weaviate ping
```

Which returns `Weaviate is reachable!` if the connection with the Weaviate server is set up correctly.


### Schema
There are three operations available with regard to the schema: [import](#import), [export](#export) and [truncate](#truncate).

#### Import

Adding a schema can be done via:

```sh
weaviate schema import my_schema.json
```

Where `my_schema.json` contains the schema as described [here](../starter-guides/schema.md).

To overwrite your schema you can use the `--force` flag, this will clear the index and replace your schema:

```sh
weaviate schema import --force my_schema.json # using --force will delete your data
```

#### Export
You can export a schema to a json file that is present in the Weaviate instance by:

```sh
weaviate schema export my_schema.json
```

Where `my_schema.json` can be replaces by a json file and local location. Naturally this function only outputs the schema to the given location when a schema is present in Weaviate.

#### Truncate

With `delete` you can remove the entire schema and all the data that is associated with it. You will be asked for confirmation unless the `--force` flag is added.

```sh
weaviate schema delete
```

### Data

#### Import
The `import` function enables data import from a json file. When the flag `--fail-on-error` is added, this command execution will fail if an error was thrown by Weaviate when loading the data object in.

```sh
weaviate data import my_data_objects.json
```

The json file and location is passed in the command. The file needs to be formatted according to the Weaviate data schema, for example:

```json
{
    "classes": [
        {
            "class": "Publication",
            "id": "f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
            "properties": {
                "name": "New York Times"
            }
        },
        {
            "class": "Author",
            "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4303",
            "properties": {
                "name": "Jodi Kantor",
                "writesFor": [{
                    "beacon": "weaviate://localhost/f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
                    "href": "/v1/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
                }]
            }
        }
    ]
}
```

#### Empty
With `delete` you can remove all data objects in Weaviate. You will be asked for confirmation unless the `--force` flag is added.

```sh
weaviate data delete
```
## Change logs

Check the [change logs on GitHub](https://github.com/weaviate/weaviate-cli/releases) for updates on the latest `CLI` changes.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
