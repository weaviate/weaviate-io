# How to Build this Website

Weaviate uses [Docusaurus 2](https://docusaurus.io/) to build our
documentation. Docusaurus is a  static website generator that runs under
[Node.js](https://nodejs.org/). We use a Node.js project management tool called
[yarn](https://yarnpkg.com/) to install Docusaurus and to manage project
dependencies.

If you do not have Node.js and `yarn` installed on your system, install them
first.

### Node.js Installation

Use the [nvm](https://github.com/nvm-sh/nvm) package manager to install Node.js.
The `nvm` project page provides an installation script.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

After you install `nvm`, use `nvm` to install Node.js.

```
nvm install node
```

By default, `nvm` installs the most recent version of Node.js. Install Node.js
20.12.2 as well. Version 20.12.2 is more compatible with the current
`weaviate.io` project dependencies.

```
nvm install 20.12.2
nvm use 20.12.2
```

### yarn Installation

Node.js includes the [npm](https://www.npmjs.com/) package manager. Use `npm`
to install `yarn`.

```
npm install --global yarn
```

### Get the Code

To contribute to this web site, first fork this repository and create a local
copy to work on.

1. Log into your Github account.
2. Fork the upstream repository, https://github.com/weaviate/weaviate-io.
3. Clone the repository to your local system.

   ```
   git clone git@github.com:YOUR-GITHUB-HANDLE/weaviate-io.git
   ```

   For details on cloning a repository, including setting up an SSH key, see the
   [GitHub documentation](https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories).

4. Set the remote tracking branch.

   ```
   git remote add upstream https://github.com/weaviate/weaviate-io.git
   ```

5. Check the remotes.

   ```
   git remote -v

   # The output resembles:

   origin	https://github.com/YOUR-GITHUB-HANDLE/weaviate-io.git (fetch)
   origin	https://github.com/YOUR-GITHUB-HANDLE/weaviate-io.git (push)
   upstream	https://github.com/weaviate/weaviate-io.git (fetch)
   upstream	https://github.com/weaviate/weaviate-io.git (push)
   ```

6. Configure a tracking branch.

   This step lets you track upstream changes while you work on your update. When
   you are ready to contribute your changes, create a pull request against the
   `upstream/main` branch.

   Get the upstream branches.

   ```
   git fetch upstream
   ```

   Add `upstream/main` as a tracking branch when you create a new project
   branch. You can use `git checkout` to set the tracking branch, or choose an
   alternative method that fits your workflow.

   ```
   git checkout -b your-update-branch-name upstream/main
   ```

### Update Dependencies

Once you have a local copy of the repository, you need to install Docusaurus and
the other project dependencies.

Switch to the project directory, then use yarn to update the dependencies.

```
cd weaviate.io
yarn install
```

You may see some warnings during the installation.

### Start the yarn Server

When the installation completes, start the `yarn` server to test your build.

```
yarn start &
```

`yarn` builds the project as a static web site and starts a server to host it.
`yarn` also opens a browser window connected to http://localhost:3000/ where
you can see your changes.

Most changes are reflected live without having to restart the server.

If you run ``yarn start`` in the foreground (without the "&"), you have to open
a second terminal to continue working on the command line. When you open a
second terminal, be sure to set the correct Node.js version before running
additional `yarn` commands.

```
nvm use node 20.12.2
```

### Build the Web Site

This command generates static content into the ``build`` directory. You can use
a hosting service to serve the static content.

```
yarn build
```

The `build` command is useful when you are finished editing. If you ran
`yarn start` to start a local web server, you do not need to use `yarn build` to
see you changes while you are editing.

The build command runs a link checker. If you are having trouble with temporarily broken links, you can update the `URL_IGNORES` variable to disable checking for that link.

To disable link checking, add the broken URL to the `URL_IGNORES` lists in these scripts:

- [verify-links.sh](https://github.com/weaviate/weaviate-io/blob/main/_build_scripts/verify-links.sh)
- [verify-links-build-dev.sh](https://github.com/weaviate/weaviate-io/blob/main/_build_scripts/verify-links-build-dev.sh)

Check the link again before you submit a merge request. If the link works, remove it from the `URL_IGNORES` list. If the link doesn't work, tell us about it in the pull request.

### Deployment

Using SSH:

```
USE_SSH=true yarn deploy
```

Not using SSH:

```
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Documentation

### Code examples

Code examples in the documentation are in one of two formats:

#### New format

In many files, you will see a format similar to:

```md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/manage-data.create.py';
import TSCode from '!!raw-loader!/_includes/code/howto/manage-data.create.ts';

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# ValidateObject START"
      endMarker="# ValidateObject END"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// ValidateObject START"
      endMarker="// ValidateObject END"
      language="ts"
    />
  </TabItem>
</Tabs>
```

This makes use of our custom `FilteredTextBlock` JSX component.

Here, the `FilteredTextBlock` component loads lines between the `startMarker` and `endMarker` from the imported scripts. This allows us to write complete scripts, which may include tests to reduce occurrences of erroneous code examples.

For more information about tests, please see [README-tests.md](./README-tests.md).

#### Legacy format

In some code examples, the code will be written directly inside the `TabItem` component, as shown below.

```md
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="languages">
<TabItem value="py" label="Python">

    ```python
    import weaviate

    client = weaviate.Client("http://localhost:8080")
    ```

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

    ```
    import weaviate from 'weaviate-ts-client';

    const client = weaviate.client({
      scheme: 'http',
      host: 'localhost:8080',
    });
    ```

</TabItem>

... and any other tabs

</Tabs>
```

Your IDE will not pick up any errors in these examples, so please make sure to test the code in your preferred environment before editing or adding them here.
