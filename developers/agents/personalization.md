---
title: Personalization Agent
sidebar_position: 50
image: og/docs/agents.jpg
# tags: ['agents', 'getting started', 'personalization agent']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/agents/_includes/personalization_agent.py';

# Weaviate Personalization Agent

:::caution

![This Weaviate Agent isn't quite ready yet.](./_includes/agents_coming_soon_light.png#gh-light-mode-only "This Weaviate Agent isn't quite ready yet.")
![This Weaviate Agent isn't quite ready yet.](./_includes/agents_coming_soon_dark.png#gh-dark-mode-only "This Weaviate Agent isn't quite ready yet.")

To be notified when this agent is released, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

The Weaviate Personalization Agent is an agentic service designed to return personalized recommendations tailored to each user. The Personalization Agent uses data from the associated Weaviate Cloud instance to provide these recommendations.

:::tip User vs Developer
The Personalization Agent is all about providing personalized recommendations tailored to a particular person. In this context, that person will be referred to as the `user`. The developer is the person who is using the Personalization Agent to provide these recommendations.
:::

The developer would simply provide a user profile, and the Personalization Agent takes care of all intervening steps to provide a set of personalized recommendations from Weaviate. The resulting workflow for the developer looks as follows:

![Weaviate Personalization Agent from a developer perspective](./_includes/personalization_agent_overview_light.png#gh-light-mode-only "Weaviate Personalization Agent from a developer perspective")
![Weaviate Personalization Agent from a developer perspective](./_includes/personalization_agent_overview_dark.png#gh-dark-mode-only "Weaviate Personalization Agent from a developer perspective")

## Architecture

The Personalization Agent is provided as a service on Weaviate Cloud.

When a user-specific recommendations request is made, the Personalization Agent analyses the user profile and any other known context to autonomously carry out the searches itself. The context may include data about the previous user interactions, information about the user themselves, and any other relevant information.

The Personalization Agent uses the contextual information to not only retrieve the most relevant recommendations, but also to rank them for the user.

## Personalization Agent: visualized workflow

![Weaviate Personalization Agent at a high level](./_includes/personalization_agent_architecture_light.png#gh-light-mode-only "Weaviate Personalization Agent at a high level")
![Weaviate Personalization Agent at a high level](./_includes/personalization_agent_architecture_dark.png#gh-dark-mode-only "Weaviate Personalization Agent at a high level")

The Personalization Agent works as follows at a high level:

- Create a Weaviate-managed user collection, which will store each user's profiles & previous interactions for each user.
- When a request for personalized recommendations is made, the Personalization Agent fetches the user data, and analyze it to determine patterns and preferences.
- Perform initial searches in Weaviate based on the analysis to retrieve the most relevant recommendations.
- Use appropriate foundation models to determine any additional search strategies, and to re-rank fetched data as required.
- Perform additional searches in Weaviate as needed to retrieve the final set of recommendations.
- Combine and rank the recommendations based on the user's profile and preferences.

Then, the Personalization Agent returns the user-specific recommendations in the response. The response will also include intermediate outputs, such as the underlying search results from Weaviate.

Let's dive into a little more detail about the Personalization Agent.

### User profiles

The Personalization Agent uses user profiles to provide personalized recommendations. This information is stored in a collection in your Weaviate instance under a specific name. The user profile may include the user's preferences and previous interactions, such as their likes and dislikes.

![Weaviate Personalization Agent - User Data Collection](./_includes/personalization_agent_users_light.png#gh-light-mode-only "Weaviate Personalization Agent - User Data Collection")
![Weaviate Personalization Agent - User Data Collection](./_includes/personalization_agent_users_dark.png#gh-dark-mode-only "Weaviate Personalization Agent - User Data Collection")

As shown here, the user data collection can be updated over time. It can be updated with information about new users, or with new information about existing users.

This will help the Personalization Agent continue to learn and provide the most relevant, up-to-date recommendations to each user.

### Recommendations

There are two major components to the Personalization Agent's recommendations, the searches it performs to retrieve the recommendations, and the ranking of the recommendations.

#### Searches

The Personalization Agent performs searches in Weaviate to retrieve the most relevant recommendations for the user from the specified collections.

![Weaviate Personalization Agent - Searches](./_includes/personalization_agent_search_light.png#gh-light-mode-only "Weaviate Personalization Agent - Searches")
![Weaviate Personalization Agent - Searches](./_includes/personalization_agent_search_dark.png#gh-dark-mode-only "Weaviate Personalization Agent - Searches")

The diagram depicts that the search process may be based on a number of factors:

- The user's profile and preferences, fetched from the user data collection.
- The user's previous interactions, fetched from the user data collection.
- The recommendation context, such as the type of recommendations requested or any other relevant information.
- Additional search strategies, as determined by the Personalization Agent.

The Personalization Agent may perform multiple searches in Weaviate to retrieve the most relevant recommendations, before combining and ranking them.

#### (Re-)Ranking

The Personalization Agent uses multiple factors to rank the recommendations it retrieves from Weaviate, so that the final result set is tailored to the user's preferences.

![Weaviate Personalization Agent - (re)rank](./_includes/personalization_agent_rank_light.png#gh-light-mode-only "Weaviate Personalization Agent - (re)rank")
![Weaviate Personalization Agent - (re)rank](./_includes/personalization_agent_rank_dark.png#gh-dark-mode-only "Weaviate Personalization Agent - (re)rank")

The rankings may be based on a number of factors:

- The user's profile and preferences, fetched from the user data collection.
- The user's previous interactions, fetched from the user data collection.
- The recommendation context, such as the type of recommendations requested or any other relevant information.
- Additional ranking strategies, as determined by the Personalization Agent.

This process ranks the combined result set as a whole, before serving them back in the response.

## Usage

:::caution

![This Weaviate Agent isn't quite ready yet.](./_includes/agents_coming_soon_light.png#gh-light-mode-only "This Weaviate Agent isn't quite ready yet.")
![This Weaviate Agent isn't quite ready yet.](./_includes/agents_coming_soon_dark.png#gh-dark-mode-only "This Weaviate Agent isn't quite ready yet.")

To be notified when this agent is released, [**sign up here for updates**](https://events.weaviate.io/weaviate-agents).

:::

### Prerequisites

The Personalization Agent is tightly integrated with Weaviate Cloud. As a result, the Personalization Agent is available exclusively for use with a Weaviate Cloud instance, and a supported version of the client library.

### Connect to Personalization Agent

Provide the following to the Personalization Agent:

- Your Weaviate Cloud instance details (e.g. the `WeaviateClient` object in Python) to the Personalization Agent.
- A list of the collections that the Personalization Agent may use to produce recommendations.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START InstantiatePersonalizationAgent"
            endMarker="# END InstantiatePersonalizationAgent"
            language="py"
        />
    </TabItem>
</Tabs>

### Obtain personalized recommendations

In the simplest form, provide a user profile to the Personalization Agent. The Personalization Agent will process the user profile, perform the necessary searches in Weaviate, and return the personalized recommendations.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START BasicQuery"
            endMarker="# END BasicQuery"
            language="py"
        />
    </TabItem>

</Tabs>

#### Query with parameters

Additional parameters can be provided to the Personalization Agent to further tune the recommendations.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START QueryParameters"
            endMarker="# END QueryParameters"
            language="py"
        />
    </TabItem>

</Tabs>

### Update user data

The Personalization Agent relies on each individual user's profile to provide personalized recommendations.

The API includes ways to provide this information when creating the agent. Additionally, you can update the user data collection with new information over time, so that the Personalization Agent can learn from the latest available data.

#### Add user properties

Fields for user properties can be added to the user data collection at any time.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START AddUserProperties"
            endMarker="# END AddUserProperties"
            language="py"
        />
    </TabItem>

</Tabs>

#### Add users

New users can be added to the user data collection at any time.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START AddUserEntry"
            endMarker="# END AddUserEntry"
            language="py"
        />
    </TabItem>

</Tabs>

#### Update user interactions

Additional interactions can be added one at a time, or in bulk.

<Tabs groupId="languages">
    <TabItem value="py_agents" label="Python">
        <FilteredTextBlock
            text={PyCode}
            startMarker="# START AddUserInteractions"
            endMarker="# END AddUserInteractions"
            language="py"
        />
    </TabItem>

</Tabs>

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>

