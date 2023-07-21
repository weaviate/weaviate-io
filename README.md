# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
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

  <TabItem value="js" label="TypeScript">
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
<TabItem value="js" label="JavaScript">

    ```
    const weaviate = require('weaviate-client');

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
