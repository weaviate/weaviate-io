---
title: Migrate from v2 to v3
sidebar_position: 70
image: og/docs/client-libraries.jpg
# tags: ['typescript', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

:::note TypeScript client version
The current TypeScript client version is `v||site.typescript_client_version||`.
<br />
The TypeScript client v3 is in beta release. To comment on the beta client, contact us in the [Community forum](https://forum.weaviate.io).
:::

import TSClientIntro from '/_includes/clients/ts-client-intro.mdx';

<TSClientIntro />

## Install 

To install the TypeScript client v3, follow these steps: 

1. **Update Node.js**

   The v3 client requires `Node v18` or higher. 

1. **Install the new client package**
    
  ```bash
  npm install weaviate-client --tag beta
  ```

1. **Upgrade Weaviate**

   The v3 client requires Weaviate core `1.23.7` or higher. Whenever possible, use the latest versions of Weaviate core and the Weaviate client.

1. **Open a gRPC port**

   The default gRPC port is 50051.

    <details>
      <summary>docker-compose.yml</summary>

    To map the Weaviate gRPC port in your Docker container to a local port, add this code to your `docker-compose.yml` file:

    ```yaml
        ports:
        - 8080:8080
        - 50051:50051
    ```
    </details>

## Instantiate a client
 
The weaviate object is the main entry point for all API operations. The v3 client instantiates the weaviate object and [creates a connection](/developers/weaviate/starter-guides/connect) to your Weaviate instance.

In most cases, you should use one of the connection helper functions to connect to your Weaviate instance: 

- `connectToWCS`
- `connectToLocal`

You can also use a custom configuration to instantiate the client directly:

<Tabs groupId="platforms">
<TabItem value="wcs" label="WCS">

```ts
import weaviate from 'weaviate-client'

const client = await weaviate.connectToWCS(
  'WEAVIATE_INSTANCE_URL', { // Replace WEAVIATE_INSTANCE_URL with your instance URL
    authCredentials: new weaviate.ApiKey('WEAVIATE_INSTANCE_API_KEY'), 
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  // Replace with your inference API key
    }
  } 
)

console.log(client)
```

</TabItem>
<TabItem value="local" label="Local">

```ts
import weaviate from 'weaviate-client'

const client = await weaviate.connectToLocal({
    httpHost: 'localhost',
    httpPort: 8080,
    grpcHost: 'localhost',
    grpcPort: 50051,
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  }
)
 
console.log(client)
```

</TabItem>
<TabItem value="custom" label="Custom">

```ts
import weaviate from 'weaviate-client'

const client = await weaviate.client({
    rest: {
      host: 'WEAVIATE_INSTANCE_HOST_NAME',
      port: 8080,
      secure: true
    },
    grpc: {
      host: 'WEAVIATE_INSTANCE_HOST_NAME',
      port: 50051,
      secure: true
    },
    auth: {
      apiKey: process.env.WEAVIATE_API_KEY || ''
    },
    headers: {
      'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || ''
    }
  }
)
 
console.log(client)
```

</TabItem>
</Tabs>

## Changes in v3

The v3 client introduces a new way to work with your data. Here are some of the important changes:

- [Collection object replaces client object](#work-with-collections)
- [Builder pattern is removed](#builder-pattern-is-removed)
- [Bulk inserts](#bulk-inserts)
- [Close clients explicitly](#client-close-method)
- [Data filtering](#filter-data)
- [Namespace for generative models](#generate-namespace)
- [Update return object](#return-object)

### Work with collections

The v2 client uses the `client` object for CRUD and search operations. In the v3 client, the `collection` object replaces the `client` object.

After you create a connection, you do not have to specify the collection for each operation. This helps to reduce errors.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
  returnProperties: ['question'],
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
result = await client
  .graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withFields('question')
  .do();

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
</Tabs>

Note here that the collection object can be re-used throughout the codebase.

### Builder Pattern is removed

The v2 client uses builder patterns to construct queries. Builder patterns can be confusing and can lead to invalid queries. The v3 client doesn't use the builder pattern. The v3 client uses specific methods and method parameters instead.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
let result 
const myCollection = client.collections.get('JeopardyQuestion');

result = await myCollection.query.nearText(['animals in movies'],{
  limit: 2,
  returnProperties: ['question', 'answer'],
  returnMetadata: ['distance']
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
let result;

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withNearText({ concepts: ['animals in movies'] })
  .withLimit(2)
  .withFields('question answer _additional { distance }')
  .do();

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
</Tabs>

### Bulk Inserts

The `insertMany()` method replaces `objectBatcher()` to make batch insertions easier.

For more information on batch processing, see [Batch Inserts](/developers/weaviate/client-libraries/typescript/typescript-v3#batch-inserts).

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
const questions = client.collections.get("CollectionName")
const dataObject = [...]; // your data

await questions.data.insertMany(dataBatch);
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
let className = 'CollectionName';  // Replace with your collection name
let dataObject = [...];

let batcher5 = client.batch.objectsBatcher();
for (const dataObj of dataObject)
  batcher5 = batcher5.withObject({
    class: className,
    properties: dataObj,
  });

// Flush
await batcher5.do();
```

</TabItem>
</Tabs>

### Client Close Method

import TSClientClose from '/_includes/clients/ts-client-close.mdx'; 

<TSClientClose />

### Filter data

The `Filter` helper class makes it easier to use filters with conditions. The v3 client streamlines how you use `Filter` so your code is cleaner and more concise.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
import weaviate, { Filters } from 'weaviate-client';
const myCollection = client.collections.get('JeopardyQuestion');

const result = await myCollection.query.fetchObjects({
  returnProperties: ['question', 'answer','round', 'points'],
  filters: Filters.and(
     myCollection.filter.byProperty('round').equal('Double Jeopardy!'),
     myCollection.filter.byProperty('points').lessThan(600)
    ),
  limit: 3,
 })

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withWhere({
    operator: 'And',
    operands: [
      {
        path: ['round'],
        operator: 'Equal',
        valueText: 'Double Jeopardy!',
      },
      {
        path: ['points'],
        operator: 'LessThan',
        valueInt: 600,
      },
    ],
  })
  .withLimit(3)
  .withFields('question answer round points')
  .do();

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
</Tabs>

### Generate Namespace

The v3 client adds a new namespace, `generate` for generative queries. This makes it easier to distinguish generative queries and a base vector searches. 

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
const generatePrompt = `Convert this quiz question: {question} and answer: {answer} into a trivia tweet.`;

const myCollection = client.collections.get('JeopardyQuestion');
const result = await myCollection.generate.nearText(['World history'],{
    singlePrompt: generatePrompt,
  },{
    limit: 2,
    returnProperties: ['round'],
})

console.log(JSON.stringify(result.objects, null, 2));
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
let result;
generatePrompt = 'Convert this quiz question: {question} and answer: {answer} into a trivia tweet.';

result = await client.graphql
  .get()
  .withClassName('JeopardyQuestion')
  .withGenerate({
    singlePrompt: generatePrompt,
  })
  .withNearText({
    concepts: ['World history'],
  })
  .withFields('round')
  .withLimit(2)
  .do();

console.log(JSON.stringify(result, null, 2));
```

</TabItem>
</Tabs>

### Return object 

The new client has a cleaner return object. It is easier to access important information like object UUIDs, object metadata, and generative query results.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
response.objects[0].properties.title  // Get the `title` property of the first object
response.objects[0].uuid  // Get the ID of the first object
response.objects[0].generated  // Get the generated text from a `singlePrompt` request
response.generated  // Get the generated text from a `groupedTask` request
response.metadata?.creationTime // Get the creation time as a native JS Date value
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
response.data?.Get?.Article?.[0].title  // Get the `title` property of the first object
response.data?.Get?.Article?.[0]['_additional']?.id  // Get the ID of the first object
response.data?.Get?.Article?.[0]['_additional']?.generate?.singleResult  // Get the generated text from a `singlePrompt` request
response.data?.Get?.Article?.[0]['_additional']?.generate.groupedResult  // Get the generated text from a `groupedTask` request
response.data?.Get?.Article?.[0]['_additional']?.creationTimeUnix // Get the timestamp when the object was created
```

</TabItem>
</Tabs>

## How to migrate your code


This workflow describes the process one would follow to migrate their codebase to the v3 client. 

1. Install the v3 client package. Update the client package from the v2 to v3 client. 

2. Connect to Weaviate. Make sure your client instantiation respects the new clients syntax. Our documentation on instantiation covers use cases from local, custom to WCS.

3. Migrate your code snippets. The v3 client is collection first which means we do not have to duplicate mentions of the collection you are interacting with.

Below is an example of a basic script in both the v2 and v3 clients. In this script, we define a collection, insert then query objects from the collection, and finally delete the collection. This is to give you an idea of what the migration would entail.

<Tabs groupId="languages">
<TabItem value="jsv3" label="JS/TS (v3)">

```ts
import weaviate from 'weaviate-client'
require('dotenv').config();

async function main() {

  const collectionName = 'Recipes'

  const client = await weaviate.connectToWCS(
    process.env.WEAVIATE_URL || '',
    {
      authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || ''),
      headers: {
        'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '',  
      }
    }
  )

  await client.collections.create({
    name: collectionName,
    vectorizer: weaviate.configure.vectorizer.text2VecOpenAI(),
  })

  const recipeList = [
    {"Name": "Christmas pie", "Description": "Combine a few key Christmas flavours here to make a pie that both children and adults will adore", "Author": "Mary Cadogan", "Ingredients": ["2 tbsp olive oil", "knob butter", "1 onion, finely chopped", "500g sausagemeat or skinned sausages", "grated zest of 1 lemon", "100g fresh white breadcrumbs", "85g ready-to-eat dried apricots, chopped", "50g chestnut, canned or vacuum-packed, chopped", "2 tsp chopped fresh or 1tsp dried thyme", "100g cranberries, fresh or frozen", "500g boneless, skinless chicken breasts", "500g pack ready-made shortcrust pastry", "beaten egg, to glaze"]},
    {"Name": "Simmer-&-stir Christmas cake",  "Description": "An easy-to-make alternative to traditional Christmas cakes which requires no beating", "Author": "Mary Cadogan", "Ingredients": ["175g butter, chopped", "200g dark muscovado sugar", "750g luxury mixed dried fruit (one that includes mixed peel and glac\u00e9 cherries)", "finely grated zest and juice of 1 orange", "finely grated zest of 1 lemon", "100ml/3\u00bd fl oz cherry brandy or brandy plus 4tbsp more", "85g macadamia nut", "3 large eggs, lightly beaten", "85g ground almond", "200g plain flour", "\u00bd tsp baking powder", "1 tsp ground mixed spice", "1 tsp ground cinnamon", "\u00bc tsp ground allspice"]},
    {"Name": "Christmas cupcakes",  "Description": "These beautiful and classy little cakes make lovely gifts, and kids will enjoy decorating them too", "Author": "Sara Buenfeld", "Ingredients": ["200g dark muscovado sugar", "175g butter, chopped", "700g luxury mixed dried fruit", "50g glac\u00e9 cherries", "2 tsp grated fresh root ginger", "zest and juice 1 orange", "100ml dark rum, brandy or orange juice", "85g/3oz pecannuts, roughly chopped", "3 large eggs, beaten", "85g ground almond", "200g plain flour", "\u00bd tsp baking powder", "1 tsp mixed spice", "1 tsp cinnamon", "400g pack ready-rolled marzipan(we used Dr Oetker)", "4 tbsp warm apricotjam or shredless marmalade", "500g pack fondant icingsugar", "icing sugar, for dusting", "6 gold and 6 silver muffincases", "6 gold and 6 silver sugared almonds", "snowflake sprinkles"]},
    {"Name": "Christmas buns",  "Description": "Paul Hollywood's fruit rolls can be made ahead then heated up before adding a glossy glaze and citrus icing", "Author": "Paul Hollywood", "Ingredients": ["500g strong white flour, plus extra for dusting", "7g sachet fast-action dried yeast", "300ml milk", "40g unsalted butter, softened at room temperature", "1 egg", "vegetable oil, for greasing", "25g unsalted butter, melted", "75g soft brown sugar", "2 tsp ground cinnamon", "100g dried cranberries", "100g chopped dried apricot", "50g caster sugar", "zest 1 lemon", "200g icing sugar"]},
    {"Name": "Christmas cupcakes",  "Description": "Made these for the second time today, and I have to say they turned out great! I've got large muffin tins and the mixture made 15 muffins, will definetely make these again at christmas time and decorate festively.", "Author": "Barney Desmazery", "Ingredients": ["280g self-raising flour", "175g golden caster sugar", "175g unsalted butter, very soft", "150g pot fat-free natural yogurt", "1 tsp vanilla extract", "3 eggs", "85g unsalted butter, softened", "1 tsp vanilla extract", "200g icing sugar, sifted", "natural green food colouring(for Christmas trees), sweets, sprinkles and white chocolate stars", "milk and white chocolatebuttons and natural colouring icing pens, available at Asda"]},
    {"Name": "Christmas slaw",  "Description": "A nutty winter salad which is superhealthy, quick to prepare and finished with a light maple syrup dressing", "Author": "Good Food", "Ingredients": ["2 carrots, halved", "\u00bd white cabbage, shredded", "100g pecans, roughly chopped", "bunch spring onions, sliced", "2 red peppers, deseeded and sliced", "2 tbsp maple syrup", "2 tsp Dijon mustard", "8 tbsp olive oil", "4 tbsp cider vinegar"]},
    {"Name": "Christmas mess", "Description": "Delicious and a synch to make! Have made this a couple of times as a dinner party dessert, very pretty as a winter alternative to Eton mess. The fact you use frozen fruits is great, I just used a bog standard pack of frozen mixed berries and added some home made blackberry liqueur. Like other people, I added more cinnamon. Thumbs up!", "Author": "Caroline Hire", "Ingredients": ["600ml double cream", "400g Greek yoghurt", "4 tbsp lemon curd", "1 x 500g bag frozen mixed berries(we used Sainsbury's Black Forest fruits)", "4 tbsp icing sugar", "2 tbsp cassis(optional)", "1 pinch cinnamon", "8 meringuenests"]},
    {"Name": "Christmas brownies", "Description": "Can be made these the day before", "Author": "Miriam Nice", "Ingredients": ["200g unsalted buttercut into cubes, plus extra for greasing", "100g dark chocolate, chopped", "100g milk chocolate, chopped", "3 large eggs", "300g golden caster sugar", "100g plain flour", "50g cocoa powder", "\u00bd tsp mixed spice", "9 sprigs rosemary", "9 glac\u00e9 cherries", "1 egg white", "2 tbsp caster sugar", "4 amaretti biscuits, crushed", "9 chocolate truffles(we used Lindt lindor)", "edible gold lustre spray", "1-2 tsp icing sugarfor dusting", "few chocolate buttons", "edible silver balls"]}
  ]

  const myCollection = client.collections.get(collectionName)

  await myCollection.data.insertMany(recipeList)

  const response = await myCollection.query.nearText('vegetarian food',{
    limit: 2,
    returnMetadata: ['distance']
  })

  console.log('Here is vegetarian recipes', response.objects)

  await client.collections.delete(collectionName)

  console.log('Collection Exists:', await client.collections.exists(collectionName))

}

main()
```

</TabItem>
<TabItem value="jsv2" label="JS/TS (v2)">

```ts
import weaviate, { ApiKey, ConnectionParams, WeaviateClient } from 'weaviate-ts-client';
require('dotenv').config();

async function main() {

  const collectionName = 'Recipes'

  const client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME_URL || 'http', // Replace with https if using WCS
    host: process.env.WEAVIATE_URL || 'localhost:8080', // Replace with your Weaviate URL
    apiKey: new ApiKey(process.env.WEAVIATE_API_KEY || 'YOUR-WEAVIATE-API-KEY'), // Replace with your Weaviate API key
    headers: { 'X-OpenAI-Api-Key': process.env.OPENAI_API_KEY || '' },  // Replace with your inference API key
  });

  const schemaDefinition = {
    class: collectionName,
    vectorizer: 'text2vec-openai',
  }
  
  await client.schema.classCreator().withClass(schemaDefinition).do();

  const recipeList = [
    {"Name": "Christmas pie", "Description": "Combine a few key Christmas flavours here to make a pie that both children and adults will adore", "Author": "Mary Cadogan", "Ingredients": ["2 tbsp olive oil", "knob butter", "1 onion, finely chopped", "500g sausagemeat or skinned sausages", "grated zest of 1 lemon", "100g fresh white breadcrumbs", "85g ready-to-eat dried apricots, chopped", "50g chestnut, canned or vacuum-packed, chopped", "2 tsp chopped fresh or 1tsp dried thyme", "100g cranberries, fresh or frozen", "500g boneless, skinless chicken breasts", "500g pack ready-made shortcrust pastry", "beaten egg, to glaze"]},
    {"Name": "Simmer-&-stir Christmas cake",  "Description": "An easy-to-make alternative to traditional Christmas cakes which requires no beating", "Author": "Mary Cadogan", "Ingredients": ["175g butter, chopped", "200g dark muscovado sugar", "750g luxury mixed dried fruit (one that includes mixed peel and glac\u00e9 cherries)", "finely grated zest and juice of 1 orange", "finely grated zest of 1 lemon", "100ml/3\u00bd fl oz cherry brandy or brandy plus 4tbsp more", "85g macadamia nut", "3 large eggs, lightly beaten", "85g ground almond", "200g plain flour", "\u00bd tsp baking powder", "1 tsp ground mixed spice", "1 tsp ground cinnamon", "\u00bc tsp ground allspice"]},
    {"Name": "Christmas cupcakes",  "Description": "These beautiful and classy little cakes make lovely gifts, and kids will enjoy decorating them too", "Author": "Sara Buenfeld", "Ingredients": ["200g dark muscovado sugar", "175g butter, chopped", "700g luxury mixed dried fruit", "50g glac\u00e9 cherries", "2 tsp grated fresh root ginger", "zest and juice 1 orange", "100ml dark rum, brandy or orange juice", "85g/3oz pecannuts, roughly chopped", "3 large eggs, beaten", "85g ground almond", "200g plain flour", "\u00bd tsp baking powder", "1 tsp mixed spice", "1 tsp cinnamon", "400g pack ready-rolled marzipan(we used Dr Oetker)", "4 tbsp warm apricotjam or shredless marmalade", "500g pack fondant icingsugar", "icing sugar, for dusting", "6 gold and 6 silver muffincases", "6 gold and 6 silver sugared almonds", "snowflake sprinkles"]},
    {"Name": "Christmas buns",  "Description": "Paul Hollywood's fruit rolls can be made ahead then heated up before adding a glossy glaze and citrus icing", "Author": "Paul Hollywood", "Ingredients": ["500g strong white flour, plus extra for dusting", "7g sachet fast-action dried yeast", "300ml milk", "40g unsalted butter, softened at room temperature", "1 egg", "vegetable oil, for greasing", "25g unsalted butter, melted", "75g soft brown sugar", "2 tsp ground cinnamon", "100g dried cranberries", "100g chopped dried apricot", "50g caster sugar", "zest 1 lemon", "200g icing sugar"]},
    {"Name": "Christmas cupcakes",  "Description": "Made these for the second time today, and I have to say they turned out great! I've got large muffin tins and the mixture made 15 muffins, will definetely make these again at christmas time and decorate festively.", "Author": "Barney Desmazery", "Ingredients": ["280g self-raising flour", "175g golden caster sugar", "175g unsalted butter, very soft", "150g pot fat-free natural yogurt", "1 tsp vanilla extract", "3 eggs", "85g unsalted butter, softened", "1 tsp vanilla extract", "200g icing sugar, sifted", "natural green food colouring(for Christmas trees), sweets, sprinkles and white chocolate stars", "milk and white chocolatebuttons and natural colouring icing pens, available at Asda"]},
    {"Name": "Christmas slaw",  "Description": "A nutty winter salad which is superhealthy, quick to prepare and finished with a light maple syrup dressing", "Author": "Good Food", "Ingredients": ["2 carrots, halved", "\u00bd white cabbage, shredded", "100g pecans, roughly chopped", "bunch spring onions, sliced", "2 red peppers, deseeded and sliced", "2 tbsp maple syrup", "2 tsp Dijon mustard", "8 tbsp olive oil", "4 tbsp cider vinegar"]},
    {"Name": "Christmas mess", "Description": "Delicious and a synch to make! Have made this a couple of times as a dinner party dessert, very pretty as a winter alternative to Eton mess. The fact you use frozen fruits is great, I just used a bog standard pack of frozen mixed berries and added some home made blackberry liqueur. Like other people, I added more cinnamon. Thumbs up!", "Author": "Caroline Hire", "Ingredients": ["600ml double cream", "400g Greek yoghurt", "4 tbsp lemon curd", "1 x 500g bag frozen mixed berries(we used Sainsbury's Black Forest fruits)", "4 tbsp icing sugar", "2 tbsp cassis(optional)", "1 pinch cinnamon", "8 meringuenests"]},
    {"Name": "Christmas brownies", "Description": "Can be made these the day before", "Author": "Miriam Nice", "Ingredients": ["200g unsalted buttercut into cubes, plus extra for greasing", "100g dark chocolate, chopped", "100g milk chocolate, chopped", "3 large eggs", "300g golden caster sugar", "100g plain flour", "50g cocoa powder", "\u00bd tsp mixed spice", "9 sprigs rosemary", "9 glac\u00e9 cherries", "1 egg white", "2 tbsp caster sugar", "4 amaretti biscuits, crushed", "9 chocolate truffles(we used Lindt lindor)", "edible gold lustre spray", "1-2 tsp icing sugarfor dusting", "few chocolate buttons", "edible silver balls"]}
  ]

  let counter = 0;
  let batcher = client.batch.objectsBatcher();

  for (const dataObjects of recipeList) {
    batcher = batcher.withObject({
      class: collectionName,
      properties: dataObjects,
    });

    // push a batch of 5 objects
    if (++counter > 4) {
      await batcher.do();
      batcher = client.batch.objectsBatcher();
      counter = 0;
    }
  }

  // push the remaining batch of objects
  if (counter > 0) {
    await batcher.do();
  }

  const response = await client
  .graphql
  .get()
  .withClassName(collectionName)
  .withFields("name description ingredients _additional { distance id }")
  .withNearText({
    "concepts": ['vegetarian food']
  })
  .withLimit(2)
  .do();

  console.log('Here is vegetarian recipes', response.data.Get.Recipes)

  await client.schema.classDeleter().withClassName(collectionName).do();

  console.log('Collection Exists:', await client.schema.exists(collectionName))
}

main()
```

</TabItem>
</Tabs>

In a similar vain, you would go on replacing the v2 code during your migration with the v3 equivalent.
For more code examples, see the pages here:

- [Search](/developers/weaviate/search)
- [Data management](/developers/weaviate/manage-data)
- [Connect to Weaviate](/developers/weaviate/starter-guides/connect)

## Client change logs

See the client [change logs on GitHub](https://github.com/weaviate/typescript-client/releases).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
