---
title: gRPC
sidebar_position: 5
image: og/docs/api.jpg
# tags: ['schema']
---

## Overview

Starting with Weaviate `v1.19.0`, a gRPC interface has been progressively added to Weaviate. gRPC is a high-performance, open-source universal RPC framework that is contract-based and can be used in any environment. It is based on HTTP/2 and Protocol Buffers, and is therefore very fast and efficient.

As of Weaviate `v1.23.7`, the gRPC interface is considered stable. The latest (`v4`) Weaviate Python client library supports gRPC, and the other client libraries will follow.

## Protocol Buffer (Protobuf) definitions

A gRPC interface is defined through its Protocol Buffer, or Protobuf ([read more](https://protobuf.dev/)) definitions.

In the case of Weaviate, the `.proto` files are listed in the Core library's [proto directory](https://github.com/weaviate/weaviate/tree/master/grpc/proto/v1).

This directory contains the following files:

- `weaviate.proto`: The main Protobuf definition file. This file defines the `Weaviate` service, and specifies the RPC methods available in the Weaviate service.
- `batch.proto`: Defines data structures for handling batch object operations. This file is imported by `weaviate.proto`.
- `search_get.proto`: Defines data structures for handling search (get) operations. This file is imported by `weaviate.proto`.
- `base.proto`: Defines base data structures to be used elsewhere. This file is imported by `batch.proto` and `search_get.proto`.

## How to use gRPC

### Server-side

To take advantage of the gRPC API, we recommend using the latest version of Weaviate. We suggest using port `50051` for gRPC calls. This can be set in the configuration file for Weaviate. (Note that Weaviate Cloud Services uses port `443` for gRPC.)

As an example, the snippet below maps `50051` as the host port so that it can be accessed from outside the container. The `50051` port is mapped to the `50051` port inside the container for gRPC calls, and the `8080` port is mapped to the `8080` port inside the container for REST calls.

```yaml:

```yaml
---
version: '3.4'
services:
  weaviate:
    # ... Other settings
    ports:
     - "8080:8080"  # REST calls
     - "50051:50051"  # gRPC calls
  # ... Other settings
```

### Client-side

You can use the gRPC interface through the ([`v4` Weaviate Python client library](/developers/weaviate/client-libraries/python)). gRPC support in the other client libraries will follow.

Alternatively, you can use other tools, such as the `grpcurl` command-line tool, to interact with the gRPC API. Some options include:

- `grpcurl` command-line tool ([GitHub repo](https://github.com/fullstorydev/grpcurl))
- Postman ([How to send a gRPC request with Postman](https://learning.postman.com/docs/sending-requests/grpc/grpc-request-interface/))
