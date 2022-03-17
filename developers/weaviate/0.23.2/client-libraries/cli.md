---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Weaviate CLI
intro: The Command Line Interface of Weaviate.
description: The Command Line Interface of Weaviate
tags: ['cli']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Installation

The Weaviate CLI is available on [Pypi.org](https://pypi.org/project/weaviate-cli/). The package can be easily installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for python 3.7 and higher.

The Weaviate CLI can be installed with:

```sh
$ pip install weaviate-cli==1.2.0
```

To check if the cli is installed correctly, run:

```sh
$ weaviate-cli version
```

which should return `1.2.0`.

# Functions

## Configuration

You need to configure the CLI tool before you can interact with you Weaviate instance. This can be done manually or by adding flags to commands. 
- Manually (interactive): 
  ```sh
  $ weaviate-cli config set
  ```
  After which you will be asked to enter the Weaviate URL and authentication mode.

- Flags: if you didn't configure the CLI manually, you can add a configuration flag pointing to a configuration json file (`--config-file myconfig.json`) with every command you execute.
  
  ```bash
  $ weaviate-cli --config-file myconfig.json
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
        "secret": <your_client_secret>
    }
  }   
  ``` 
  or

  ```json
  {
    "url": "http://localhost:8080",
    "auth": {
        "user": <user name>,
        "pass": <user password>
    }
  }   
  ```

You can view the configuration with the command:

```sh
$ weaviate-cli config view
```

## Ping
You can ping the Weaviate URL you're connected to with:
```sh
$ weaviate-cli ping
```

Which returns `Weaviate is reachable!` if the connection with the Weaviate server is set up correctly.


## Schema
There are three operation with regard to the schema: [import](#import), [export](#export) and [truncate](#truncate).

### Import

Adding a schema can be done via:

```sh
$ weaviate-cli schema import my_schema.json
```

Where `my_schema.json` contains the schema as described [here](../how-tos/how-to-create-a-schema.html).

When a schema is already present, it won't be replaced unless the flag `--force` is added to the command:

```sh
$ weaviate-cli schema import --force my_schema.json 
```

### Export
You can export a schema to a json file that is present in the Weaviate instance by:

```sh
$ weaviate-cli schema export my_schema.json
```

Where `my_schema.json` can be replaces by a json file and local location. Naturally this function only outputs the schema to the given location when a schema is present in Weaviate. 

### Truncate

With `truncate` you can remove the entire schema and all the data that is associated with it. You will be asked for confirmation unless the `--force` flag is added.

```sh
$ weaviate-cli schema truncate
```

## Data

### Import
The `import` function enables data import from a json file. When the flag `--fail-on-error` is added, this command execution will fail if an error was thrown by Weaviate when loading the data object in. 

```sh
$ weaviate-cli data import my_data_objects.json
```

The json file and location is passed in the command. The file needs to be formatted according to the Weaviate data schema, for example:

```json
{
    "things": [
        {
            "class": "Publication",
            "id": "f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
            "schema": {
                "name": "New York Times"
            }
        },
        {
            "class": "Author",
            "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4303",
            "schema": {
                "name": "Jodi Kantor",
                "writesFor": [{
                    "beacon": "weaviate://localhost/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80",
                    "href": "/v1/things/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
                }]
            }
        }
    ]
}
```

### Empty
With `empty` you can remove all data objects in Weaviate. You will be asked for confirmation unless the `--force` flag is added.

```sh
$ weaviate-cli data empty
```

# More Resources

{% include docs-support-links.html %}