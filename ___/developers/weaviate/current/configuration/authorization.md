---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Authorization
intro: Similar to our philosophy regarding database back-ends and the overall authentication scheme, authorization is also implemented in a pluggable fashion. This means you can choose the plugin that fits your use case best. If you have only a few users and don’t need to differentiate between their rights, the Admin List plugin is a perfect fit. If you need to control each user’s permissions at a very fine-grained level however, you should opt to use the RBAC plugin.
description: Authorization in Weaviate
tags: ['authorization']
sidebar_position: 5
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/setup/authorize.html
    - /documentation/weaviate/current/configuration/authorization.html
---

# Admin List

Admin List relies on the configured `Authentication Schema` to correctly identify
the user. On each request, a check against a pre-configured admin list is done.
If the user is contained in this list, they get all permissions. If they aren't,
they get none. It's not possible to assign only some rights to a specific user
with the Admin List plugin.

# Read-Only list

Other than a list of admins, it is also possible to specify a list of read-only users.
Those users have permissions on all `get` and `list` operations, but no other
permissions.

If a subject is present on both the admin and read-only list, Weaviate will
error on startup due to the invalid configuration.

# Usage

Configure the admin plugin in the Docker Compose configuration yaml like so:

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      AUTHORIZATION_ADMINLIST_ENABLED: 'true'
      AUTHORIZATION_ADMINLIST_USERS: 'jane@doe.com,john@doe.com'
      AUTHORIZATION_ADMINLIST_READONLY_USERS: 'roberta@doe.com'
```

The above would enable the plugin and make users `jane@doe.com` and
`john@doe.com` admins. Additionally, user `roberta@doe.com` will have read-only permissions.

Note that in the above example, email ids are used to identify the user. This is not a requirement, in fact, any string can be used. This depends on what you configured in the authentication settings. For example, if you are using Open ID Connect authentication, you could set the `authentication.oidc.username_claim` to `email` to achieve the result shown above.

# RBAC

More fine-grained Role-Based Access Control (RBAC) coming soon. As of now the
only possible distinction is between Admins (CRUD), Read-Only Users and
entirely unauthorized users.

# More Resources

{% include docs-support-links.html %}
