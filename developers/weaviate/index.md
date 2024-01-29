---
title: Home
sidebar_position: 0
image: og/docs/introduction.jpg
hide_table_of_contents: true
hide_title: true
# tags: []
---

<div className = "docHome">

<h1 className = "docHeadText">Welcome to Weviate Docs</h1>

<p className ="docText">Weaviate is an open source, AI-native vector database.<br></br>
Learn how to store and retrieve data objects and vector embeddings. Seamlessly connect <br></br>  to your favorite ML models. And build intuitive, reliable AI applications that scale.

</p>

<div className="welcomeSection">
<div className ="welcomeBox"> 
<div className = "welcomeHeader new"> New to Weaviate? </div>
<p>Start with the <a href="/quickstart/index.md">Quickstart tutorial</a> - an end-to-end demo that takes 15-30 minutes.</p>
</div>
<div className ="welcomeBox"> 
<div className = "welcomeHeader questions">Questions </div>
<p>Please visit our <a href="https://forum.weaviate.io/c/support/">forum</a> to get help from the Weaviate community including the Weaviate team.</p>
</div>
</div>
<br/>



<p className = "highLightText">Getting Started</p>

<h3 className = "docHeader">Step 1 - Choose your deployment</h3>
<p className ="docText">All options include Vectorizer integration, RAG module integration and Optional data replication</p>


<div className="deploySection">
<div className ="deployBox"> 
<div className ="tabContainer">
<div className ="deployTab">Evaluation</div>
<div className ="deployTab">Deployment</div>
<div className ="deployTab">Production</div>
</div>
<div className = "deployContent">
<div className = "deployHeader">Weaviate Cloud Services</div>
<ul className = "deployList">
<li>From evaluation (sandbox) to production</li>
<li>Serverless (infrastructure managed by Weaviate)</li>
</ul>
<button className = "deployButton"><a href = "/developers/wcs/guides/create-instance">Set up a WCS instance</a></button>
</div>
</div>

<div className ="deployBox"> 
<div className ="tabContainer">
<div className ="deployTab">Evaluation</div>
<div className ="deployTab">Deployment</div>
<div className ="deployTab inactive">Production</div>
</div>
<div className = "deployContent">
<div className = "deployHeader docker">Docker</div>
<ul className = "deployList">
<li>For local evaluation & development</li>
<li>Local inference containers available</li>
<li>Multi-modal models available</li>
<li>Fully customizable</li>
<li>System agnostic</li>
<li>Easy to set up</li>
</ul>
<button className = "deployButton"><a href = "/developers/weaviate/installation/docker-compose">Run Weaviate with Docker</a></button>
</div>
</div>




</div>
<br/>


<div className="deploySection">
<div className ="deployBox"> 
<div className ="tabContainer">
<div className ="deployTab inactive">Evaluation</div>
<div className ="deployTab">Deployment</div>
<div className ="deployTab">Production</div>
</div>
<div className = "deployContent">
<div className = "deployHeader kubernetes">Kubernetes</div>
<ul className = "deployList">
<li>For development to production</li>
<li>Local inference containers available</li>
<li>Multi-modal models available</li>
<li>Fully customizable</li>
<li>System agnostic</li>
<li>Zero-downtime updates</li>
<li>Self-deploy or Marketplace deployment</li>
</ul>
<button className = "deployButton"><a href = "/developers/weaviate/installation/kubernetes">Run Weaviate with Kubernetes</a></button>
</div>
</div>



<div className ="deployBox"> 
<div className ="tabContainer">
<div className ="deployTab">Evaluation</div>
<div className ="deployTab inactive">Deployment</div>
<div className ="deployTab inactive">Production</div>
</div>
<div className = "deployContent">
<div className = "deployHeader">Embedded Weaviate</div>
<ul className = "deployList">
<li>For basic, quick evaluation</li>
<li>Conveniently launch Weaviate directly from Python or TS/JS</li>
</ul>
<button className = "deployButton"><a href = "/developers/weaviate/installation/embedded">Run Embedded Weaviate</a></button>
</div>
</div>




</div>
<br/>


<h3 className = "docHeader">Step 2 - Choose your scenario</h3>
<p className="docText">Import data with Weaviate vectorizer, execute basic queries and discover the best<br></br> search options, including vector, keyword and hybrid searches.
</p>


<div className="deploySection scenario">

<div className="scenarioBox">

<div className="scenarioLogo data"></div>
<div className="scenarioText">
<span><a href="/developers/weaviate/manage-data/import">Data imports</a> to <a href="/developers/weaviate/search/similarity">vector</a> searches, made easy</span>

<p>Weaviate abstracts away complexities of building a vector database.</p>
<p>Learn how to import data with a Weaviate vectorizer, and run basic queries.</p>
</div>


</div>
<div className="scenarioBox">

<div className="scenarioLogo custom"></div>
<div className="scenarioText">
<span><a href="/developers/weaviate/starter-guides/custom-vectors">Custom vectors with Weaviate</a></span>


<p>It’s easy to import data with pre-existing vectors into Weaviate.</p>
<p>Learn how Weaviate can just as easily work with your existing data and corresponding vectors.</p>
<p>You can perform the same searches, and even work with a vectorizer if a compatible one is available.</p>

</div>


</div>
<div className="scenarioBox">

<div className="scenarioLogo semantic"></div>
<div className="scenarioText">
<span><a href="/developers/weaviate/search">Semantic search</a> and <a href="/developers/weaviate/starter-guides/generative">RAG</a></span>

<p>Weaviate makes it easy for you to find the right information.</p>
<p><a href="/developers/weaviate/search">Learn how to perform different types of available searches</a>, including vector, keyword and hybrid searches.</p>
<p>See how filters can add to these capabilities, and <a href="/developers/weaviate/starter-guides/generative">how to perform retrieval augmented generation</a>.</p>
</div>


</div>

</div>


<h3 className = "docHeader">What Next</h3>
<p className="docText">We recommend starting with these sections</p>


<div className="deploySection whatsNext"> 

<div className="whatnextBox">
<span>What is Weaviate?</span>
<p>Weaviate is an open source vector search engine that stores both objects and vectors.</p>
<div className= "wtLearn"><a href="/developers/weaviate#what-is-weaviate">Learn more</a></div>
</div>
<div className="whatnextBox">
<span>What can you do with Weaviate?</span>
<p>Features, examples, demo applications, recipes, use cases, etc..</p>
<div className= "wtLearn"><a href="/developers/weaviate/more-resources/example-use-cases">Learn more</a></div>
</div>
<div className="whatnextBox small">
<span className="filters">Installation</span>
<p>Learn about the available options for running Weaviate, along with instructions on installation and configuration.</p>
<div className= "wtLearn"><a href="/developers/weaviate/installation">Learn more</a></div>
</div>
<div className="whatnextBox small">
<span className="filters">How-to: Configure</span>
<p>Discover how to configure Weaviate to suit your specific needs.</p>
<div className= "wtLearn"><a href="/developers/weaviate/configuration">Learn more</a></div>
</div>
<div className="whatnextBox small">
<span className="filters">Concepts</span>
<p>Get the most out of Weaviate and learn about its architecture and various features.</p>
<div className= "wtLearn"><a href="/developers/weaviate/concepts">Learn more</a></div>
</div>

</div>


<div className="secondaryContent">
<h3>Need Help</h3>
<div className="secondaryTabs slack"><a href="https://weaviate.io/slack">Slack</a></div>
<div className="secondaryTabs github"><a href="https://github.com/weaviate/weaviate">Github</a></div>
<div className="secondaryTabs forum"><a href="https://forum.weaviate.io/">Forum</a></div>
</div>


</div>