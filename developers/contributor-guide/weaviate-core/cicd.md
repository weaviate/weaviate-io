---
title: CICD Philosophy
sidebar_position: 2
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---

Weaviate is not a continuously deployed application, as it is published as releases
and users install Weaviate themselves. Nevertheless, we aim to treat it with
the same level of CI/CD-maturity as one would a continuously deployed
application.

## Trunk-based development

As Weaviate is open-source, we welcome everyone's contributions. It is therefore
not feasible to allow for true trunk-based development. Outside contributors
don't have write access to our `master`/`main` branches. And the "GitHub flow"
(small PRs for every contribution) is well established in the OSS community.

Nevertheless, we believe in the benefits of trunk-based development and want to
get as close to it as possible.

In practice this means:

* Keep every single commit production ready. Do not use the comfort of a branch
  to temporarily ignore quality standards, knowing that you can still fix them
  before creating a Pull Request. As a rule of thumb, every commit should have a
  passing test suite and should not contain anything that you wouldn't want to be
  used at scale.

  There might be situations, especially when developing complex features, where
  you explicitly make commits which are "not production-ready". For example to
  get a get an integration test to pass you might require several commits.
  Please, clearly mark such commits as "WIP".

* The best time to merge a PR is yesterday. There is no harm in having a
  non-breaking, not-yet finished feature already on the trunk. (Especially as
  every commit is production-ready). However, there is harm in three branches
  deviating for a week and leading to massive merge conflicts. Thus, be
  prepared to merge your contribution even if it's not fully complete yet. We
  can always hide unfinished features from users using feature toggles, etc.

## Semantic Versioning

We generally aim to avoid breaking changes. Having to update a major version
frequently is annoying - but it is even more annoying for the user to have to
try to fix a bug themselves.

Weaviate uses semantic versioning to indicate to users that an upgrade path is
safe. Having said that, pre-`v1.0.0`, there were some special situations:

### Versions 0.x.y

Since we have no good way of indicating breaking changes without raising the
major version, we have come up with the following scheme while we are below
version `v1.0.0`:

* Both patches and new features are indicated in the patch version. E.g.
  `0.22.18` might contain new (non-breaking) features as well as fixes over
  `0.22.17`.
* Breaking changes (which should happen very rarely) increase the minor
  version. E.g. `0.23.0` will contain breaking changes over `0.22.x`. This
  workaround will no longer be required once version `v1.0.0` is published and
  proper semantic versioning can be done.

### Versions 1.x.y and larger

Versions v1.0.0 and onwards use Semantic Versioning as it was intended.

## Deprecations

We aim not to introduce a breaking change without having a deprecation period
first. The rule of thumb is:

* If we want to rename something, allow both in parallel, but clearly mark the
  old way as deprecated.
* If we want to remove something, clearly show a deprecation notice when the
  user uses a deprecated feature. This message should present a user with an
  alternative to the deprecated behavior.

To introduce a new deprecation, add it to `deprecations/deprecations.yml`. This
will auto-generate an entry for this deprecation. You can then use the provided
methods to show this deprecation when the user uses a deprecated feature.

## Releases

There is no fixed release schedule. We aim to publish new features and fixes as
early as possible.

However, keep in mind, that an upgrade of an installation can be effort to a
user. If we thus know that several features will be ready within a few days, we
can group those releases.

Do not confuse release frequency with merging to master. While there might be
value to the user in holding back a release a few days, there are no benefits
to holding back a high-quality pull request. In fact, there are only
disadvantages: Mainly deviating code-bases and painful merge conflicts.

### Making a release

*This section only applies to Weaviate employees. Outside contributors cannot make
releases. If you have made a contribution and think it should be released,
please let us know on the public Weaviate Slack.*

There is a convenience script located at `tools/prepare_release.sh`, to use it
adhere to the following steps:

1. Merge everything that should be included, make sure CI is happy.
2. Update the desired target version in `openapi-specs/schema.json`.
3. Run all auto-code generation using `tools/gen-code-from-swagger.sh`.
4. Run the convenience script at `tools/prepare_release.sh`. It will create a
   commit and tag and print a release note template to the terminal.
5. Push the commit and tag using `git push && git push --tags`
6. Create a new GitHub Release using the template. Clearly indicate all
   changes, and link to the respective issues. Check prior releases for
   inspiration.

## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />
