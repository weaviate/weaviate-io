---
layout: post
title: Build a React-based front-end app for your Weaviate neural search
description: "A complete implementation guide to creating a React.js app styled with Material UI that integrates with a Weaviate dataset"
published: false
author: Henrique Pereira
author-img: /img/people/icon/henrique.jpg
card-img: /img/blog/hero/build-a-react-app-with-weaviate-card.png
hero-img: /img/blog/hero/build-a-react-app-with-weaviate.png
canonical-url: https://medium.com/semi-technologies/build-a-react-based-front-end-app-for-your-weaviate-neural-search-bafac9a772b4
canonical-name: Medium
date: 2021-02-23
toc: true
---

<!-- TODO: make sure the content is up to date -->

## Introduction
In this article, we will be using [React hooks](https://reactjs.org/docs/hooks-intro.html){:target="_blank"} to build our React app, style it with [Material UI](https://material-ui.com/){:target="_blank"} and learn how to integrate it with [Weaviate](/){:target="_blank"} neural search. This article will go through the steps of starting a React.js app from scratch, building the UI necessary to interact with Weaviate, and display results in the app’s interface.

But before we get into it, let me give you a brief introduction about what Weaviate is and some of its use cases.

## What is Weaviate?
[Weaviate](/){:target="_blank"} is a cloud-native, modular, real-time vector search engine. It is extremely powerful and it makes a lot easier to search through vast amounts of data. Unlike traditional search engines, where you need to search for exact words in order to retrieve the desired data, Weaviate uses vector indexing mechanisms at its core to represent the data. In other words, Weaviate places the data in a vector-space near other text with similar or related meaning. This amazing feature allows you to search for data objects without needing to type exact words. The below image shows an example of a query result for the search phrase “Traveling in Asia”. The results are a list of articles that may not have the exact words ‘Traveling”, “in”, or “Asia” in its title, but Weaviate is able to identify a close relationship between the words and display these results.

![Example of the results received from Weaviate when searching for ‘Traveling in Asia’](/img/blog/build-a-react-app-with-weaviate/weaviate-results-in-action.png)
*Weaviate is able to identify a close relationship between the words and display these results.*

There are numerous use cases for when to use Weaviate. Some of the most popular use cases include the following but are not limited to: Semantic search, image search, similarity search, anomaly detection, power recommendation engines, e-commerce search, data classification in ERP systems, automated data harmonization, cybersecurity threat analysis

Check out Weaviate’s [documentation](/developers/weaviate/current/){:target="_blank"} for more information.

## Setting up Weaviate
There are different ways you can set up Weaviate. In this article, We’re going to use the publicly available endpoint at `https://demo.dataset.playground.semi.technology/` which serves a demo dataset including 1000+ news articles to search through. This public endpoint is read-only, but you could also set up your own instance of Weaviate (either locally or in the cloud) and then import your own data. For more resources on how to set up Weaviate, see Weaviate’s documentation.

## Creating your React.js app
![React.js logo](/img/blog/build-a-react-app-with-weaviate/react-logo.jpeg)

A quick and efficient way to start a new `React.js` app, is using the [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app){:target="_blank"} toolchain. In case you aren’t too familiar with React.js, I would recommend becoming more familiar with it before proceeding to the next steps. React.js provides a really good [starter guide](https://reactjs.org/docs/getting-started.html){:target="_blank"} in case you need it.

To create a new React.js app, go to your desired folder in the terminal and run the following command:

```bash
npx create-react-app weaviate-example-app
```

Once completed, go to the project root folder and fire up the app:

```bash
cd weaviate-example-app
npm start
```

This will run the app at `http://localhost:3000` and keep the hot loading going so it automatically updates the app every time you make changes and saves them. And if by any chance you have something else running on `http://localhost:3000`, you’ll be prompted to use a different port. Just answer yes if that’s the case.

## Cleaning up the React.js app
Create-react-app comes with template files and because we won’t need some of them, we can go ahead and delete them. Inside the `src` folder, we can delete the following files: `App.test.js` , `logo.svg`, `reportWebVitals.js`, `setupTests.js`.

Then, still inside the `src` folder, go to the index.js and delete the following:

```javascript
import reportWebVitals from './reportWebVitals';
```

And

```javascript
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Still inside the `src` folder, go to the App.js file and delete the following:

```javascript
import logo from './logo.svg';
```

And

```JSX
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>Edit <code>src/App.js</code> and save to reload.</p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >Learn React</a>
</header>
```

Lastly, go to the file `App.css` and delete the following:

```css
.App-logo {
  height: 40vmin;
  pointer-events: none;
}
@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}
.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.App-link {
  color: #61dafb;
}
@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

Now we have a greenfield app, which we can use as a starting point for our search frontend. Save the app and you should see an empty page in the browser with no errors.

## Creating the UI form to interact with Weaviate
![Material UI library Image](/img/blog/build-a-react-app-with-weaviate/Material-UI-library.png)

In this app, we will be browsing through Weaviate’s news articles demo dataset. To accomplish this, we will need a text input to type keywords, and a search button to trigger the search function.

To give these elements some style, we will be using [Material UI](https://material-ui.com/){:target="_blank"} components. If you aren’t too familiar with Material UI, check out [their documentation](https://mui.com/material-ui/getting-started/installation/){:target="_blank"} to learn more. It’s easy to get started and extremely powerful.

Go to the app’s root folder and run the following command to install Material-UI:

```bash
npm install @material-ui/core
```

Also, install Material UI icons package as we will be using it later for the search button icon:

```bash
npm install @material-ui/icons
```

Once both are installed, go to your `App.js` file and import the [TextField](https://mui.com/material-ui/react-text-field/#form-props){:target="_blank"} component at the top of the file:

```JSX
import TextField from '@material-ui/core/TextField';
```

Inside the `<div>` element with the className App, render the TextField element like this:

```JSX
<div className="App">
  <form>
    <TextField
      id="weaviate-search-text-field"
      label="Type keyword"
      type="search"
      variant="outlined"
    />
  </form>
</div>
```

Now let’s add our search button. To accomplish this, import Material UI’s [Button](https://mui.com/material-ui/react-button/#buttons-with-icons-and-label){:target="_blank"} component as well as the [SearchIcon](https://mui.com/material-ui/material-icons/){:target="_blank"} to the top of the `App.js` file:

```JSX
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
```

Below the TextField Component, render the Button component with the SearchIcon:

{% raw  %}
```JSX
<Button
  variant="contained"
  color="primary"
  startIcon={<SearchIcon />}
  className="searchButton"
  style={{ height: "55px" }}
>
  Search
</Button>
```
{% endraw %}

Add some padding in the `App.css` file:

```css
.App {
 text-align: center;
 padding: 20px;
}
```

And you should get something that looks like this:

![Image of what your app should look like at this point](/img/blog/build-a-react-app-with-weaviate/search-bar.png)

## Using React hooks to store the input value
Looking good so far. Now it’s time to use React’s state to store the value of the TextField component. We will be using React hooks to accomplish this. First, import the [useState](https://reactjs.org/docs/hooks-state.html){:target="_blank"} hook at the top of the `App.js` file:

```JSX
import React, {useState} from "react";
```

Second, define the state variable. Refer to the [useState docs](https://reactjs.org/docs/hooks-state.html){:target="_blank"} for details:

```JSX
const [keyword, setKeyword] = useState("");
```

Next, set keyword to be the value of the TextField component and also the onChange event so it updates the value of keyword as you type:

```JSX
<TextField
  id="weaviate-search-text-field"
  label="Type keyword"
  type="search"
  variant="outlined"
  className="searchInput"
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
/>
```

## Hooking up the search Button component
Let’s hook up our Button component with the onClick event to trigger the search function (we can call it `weaviateMagic()`):

{% raw %}
```JSX
<Button
 variant="contained"
 color="primary"
 startIcon={<SearchIcon />}
 className="searchButton"
 style={{ height: "55px" }}
 onClick={() => weaviateMagic(keyword)}
 >
 Search
</Button>
```
{% endraw %}

The weaviateMagic function is not defined yet. To define it, let’s create a new file called functions inside the src folder:

![Image of the function.js file being added to the src folder](/img/blog/build-a-react-app-with-weaviate/functions-in-folder.png)
<!-- <br/> *functions.js inside the src folder* -->

Inside this file, we can define our weaviateMagic function and export it using [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules){:target="_blank"}. For now, the function will simply console log ‘it works’ so we can make sure it works properly. Later on we will write the functionality for it.

```JSX
export const weaviateMagic = () => {
 console.log("it works");
};
```

At the top of the `App.js` file, import the weaviateMagic function:

```JSX
import {weaviateMagic} from './functions'
```

To make sure this works, save all the files and go to the browser’s console. When you click on the search Button component, ‘it works’ should be printed.

That’s it! Our form is set up, styled and ready to go.

## Introducing Weaviate to our React.js app
![Weaviate logo](/img/logo-weaviate-emblem-color.svg){:style="height:200px"}

Great work so far. Now that our form is ready on the frontend, it’s time to hook it up to Weaviate. All interactions with Weaviate happen through RESTful API and GraphQL requests. To make our lives easier, Weaviate features [client packages](/developers/weaviate/current/client-libraries/index.html) in different languages (`Go`, `Python`, `Java`, and `JavaScript`) which abstract away these interactions providing an easier and smoother interaction. We are, of course, going to be using the `JavaScript client` package since this is a React.js application.

We can install the Weaviate JavaScript client package via npm:

```bash
npm install weaviate-client
```

After installation is complete, import the package at the top of the `functions.js` file:

```JSX
import weaviate from 'weaviate-client'
```

As explained in the Weaviate [JavaScript client docs](/developers/weaviate/current/client-libraries/javascript.html){:target="_blank"}, we also need to set up a variable for our client and connect it to the news articles dataset we discussed earlier:

```JSX
const client = weaviate.client({
  scheme: "https",
  host: "demo.dataset.playground.semi.technology/",
});
```

Now that the Weaviate JavaScript client is set up, we can go ahead and finish writing our weaviateMagic() function. To accomplish this, we need to introduce Weaviate’s Get{} function. This function is Weaviate’s most direct way of accessing your data. For more details on how this function works check out the [Get{} docs](/developers/weaviate/current/graphql-references/get.html){:target="_blank"}.

```JSX
export const weaviateMagic = (keyword) => {
  client.graphql
  .get()
  .withNearText({
    concepts: [keyword],
    certainty: 0.7,
  })
  .withClassName("Article")
  .withFields("title url wordCount")
  .withLimit(100)
  .do()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
};
```

Notice a few things about this function. We use the Get{} function to access the data. Then we use the [withNearText()](/developers/weaviate/current/retriever-vectorizer-modules/text2vec-transformers.html#additional-graphql-api-parameters){:target="_blank"} method to filter the search by our keyword with a `certainty` of 0.7. Since this is a GraphQL API running — we’ll only get back what we requested, which is this case are the fields title, url, and wordCount. Then we `limit` our query to 100 results. Finally, we call the do() method to perform the query. Since this is a ES6 promise, we need then() and catch().

**Try it out!** Type a search phrase and click the search button, then go to the browser’s console, you see the results under Data => Get => Article which should be an array of 100 items. Each item contains the title, wordCount, and url of that particular article.

## Saving results in React state
Now let’s save these results in state. Create a new state variable (articles and setArticles) in the `App.js` file:

```JSX
const [articles, setArticles] = useState(null);
```

And let’s not forget to pass in setArticles to our `weaviateMagic()` function:

```JSX
onClick={() => weaviateMagic(keyword, setArticles)}
export const weaviateMagic = (keyword, setArticles) => {
```

For a better user experience, we can dynamically change the text value of the search button. The value being ‘Searching’ when the function is running and we wait for the results to populate the UI. And ‘Search’ for when we aren’t waiting for results to come through. To achieve this, we can create a new state variable (`isSearching` and `setIsSearching`) and set its initial value to false:

```JSX
const [isSearching, setIsSearching] = useState(false);
```

Next, we dynamically set the value of the search button. `App.js` file inside the search button:

```JSX
{isSearching ? "Searching…" : "Search"}
```

We also need to pass in the isSearching and setIsSearching to our `weaviateMagic()` function. It will be used to change the state of the search button text, letting the user know if the function is running or not.

```JSX
onClick={() => weaviateMagic(keyword, setArticles, setIsSearching)}
export const weaviateMagic = (keyword, setArticles, setIsSearching) => {
```

Finally, to make this work we need to set isSearching to true when the `weaviateMagic()` function starts running and then set it to false again once the promise resolves:

```JSX
setIsSearching(true);
client.graphql
  .get()
  .withNearText({
    concepts: [keyword],
    certainty: 0.7,
  })
  .withClassName("Article")
  .withFields("title url wordCount")
  .withLimit(100)
  .do()
  .then((res) => {
    setArticles(res.data.Get.Article);
    setIsSearching(false);
})
```

The final function should look like this:

```JSX
export const weaviateMagic = (keyword, setArticles, setIsSearching) => {
  setIsSearching(true);
  client.graphql
    .get()
    .withNearText({
      concepts: [keyword],
      certainty: 0.7,
    })
    .withClassName("Article")
    .withFields("title url wordCount")
    .withLimit(100)
    .do()
    .then((res) => {
      setArticles(res.data.Get.Article);
      setIsSearching(false);
    })
    .catch((err) => {
      console.log(err);
    });
};
```

## Displaying the results in the UI
Great work so far! Now that our weaviateMagic function works, it’s time to display the results in the UI of our application. To accomplish this, we will once again leverage the power of Material UI to quickly build something that looks good.

For each article, we will display a [Material UI Card](https://mui.com/material-ui/react-card/#card){:target="_blank"} component with the fields we requested in the query (title, url and wordCount) inside of it. Let’s first create our Article component which will be rendered for each article in the results array. Create a new file called `Article.js` inside the src folder:

![Image of the Article component being created inside the src folder](/img/blog/build-a-react-app-with-weaviate/articles-in-folder.png)

Inside the `Article.js` file, import the [Card](https://mui.com/material-ui/react-card/#card){:target="_blank"}, [Typography](https://mui.com/material-ui/react-typography/#typography){:target="_blank"}, and [Button](https://mui.com/material-ui/react-button/#text-buttons){:target="_blank"} components from Material-UI. Also import [makeStyles](https://mui.com/system/styles/api/#makestyles-styles-options-hook){:target="_blank"} so we can apply custom styling to our Article component.

```JSX
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
```

The Article component has a prop (we can call it article) which contains the data we need. Be sure to also call this prop article later when we pass it from the App.js component. The Article component should look like this:

{% raw %}
```JSX
const Article = ({ article }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
    <Typography className={classes.typography} component="h3" variant="h5">
      Title: {article.title}
    </Typography>
    <Typography className={classes.typography} component="h3" variant="h5">
      Word count: {article.wordCount}
    </Typography>
    <div style={{ display: "flex" }}>
    <Typography className={classes.typography} component="h3" variant="h5">
      url:
    </Typography>
    <Button
      href={article.url}
      target="_blank"
      color="primary"
      className={classes.button}
    >
      {article.url}
    </Button>
    </div>
    </Card>
  );
};
export default Article;
```
{% endraw %}

And above the Article component we can apply custom styles:

```css
const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
    marginBottom: "20px",
    width: "700px",
    padding: "10px",
    background: "#3f51b5",
  },
  typography: {
    textAlign: "left",
    color: "#fff",
  },
  button: {
    color: "#fff",
  },
});
```

Feel free to apply your own styling to the Article component. These are meant to be basic for simplicity sake.

Back to our App.js file, we now need to render the Article component for each array item. Import the [Container](https://mui.com/material-ui/react-container/#container){:target="_blank"} component from Material-UI and also the Article component:

```JSX
import Container from "@material-ui/core/Container";
import Article from "./Article";
```

Underneath the <form> element, render the Container component with a <div> element inside. And then inside the <div> element we need to map through the results array and render an Article component for each item of the array. We can use [React’s conditional rendering technique](https://reactjs.org/docs/conditional-rendering.html){:target="_blank"} for this:

{% raw %}
```JSX
<Container maxWidth="md" style={{ marginTop: "30px" }}>
  <div
    style={{
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {articles
    ? articles.map((article, idx) => (
    <Article article={article} key={idx} />
    ))
    : null}
  </div>
</Container>
```
{% endraw %}

**That’s it!** We now have a React.js application that integrates with Weaviate search engine by performing queries to the news articles demo dataset. The results are displayed in the UI.

A results page should look something like this. With 100 cards being displayed:

![Displayed results for the Weaviate function](/img/blog/build-a-react-app-with-weaviate/weaviate-results-in-action.png)

You can also check out the [GitHub repo](https://github.com/halvespereira/weaviate-example-app){:target="_blank"} for this app here. Thanks and happy coding! :)

## Conclusion
Weaviate is a powerful tool that can definitely eliminate a lot of headaches when it comes to searching through vast amounts of data. It integrates really well with React.js via the Weaviate client package, which abstracts away GraphQL and RESTful API requests to perform very fast searches with impressive results through a large dataset.

## What next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.
