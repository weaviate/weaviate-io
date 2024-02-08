# ===== Instantiate Weaviate client w/ auth config =====
import weaviate
import json

client = weaviate.Client(
    url="https://some-endpoint.weaviate.network",  # Replace w/ your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey(api_key="YOUR-WEAVIATE-API-KEY"),  # Replace w/ your API Key for the Weaviate instance. Delete if authentication is disabled.
    additional_headers={
        "X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",
    },
)

# ===== Basic Single Prompt Generative Query =====

# SinglePromptQuery
response = (
    client.query
    .get("Article", ["title", "summary"])
    .with_near_text({"concepts": ["housing prices"]})
    .with_limit(3)
    # highlight-start
    .with_generate(
        single_prompt="Provide a two-bullet point summary of the article, whose title is {title} and body {summary}"
    )
    # highlight-end
    .do()
)

print(json.dumps(response, indent=2))
# END SinglePromptQuery

# Tests
assert "Article" in response["data"]["Get"]
assert len(response["data"]["Get"]["Article"]) == 3
assert response["data"]["Get"]["Article"][0].keys() == {"title", "summary", "_additional"}
assert response["data"]["Get"]["Article"][0]["_additional"].keys() == {"generate"}
assert "singleResult" in response["data"]["Get"]["Article"][0]["_additional"]["generate"].keys()
# End test

expected_response = """
# Expected SinglePromptQuery results
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "- Real house prices have risen by 5% on average in the latest 12-month period among the 25 countries tracked by The Economist, the quickest in over a decade.\n- House prices in suburban locations are rising faster than in cities due to the expectation that commuting may no longer be daily, reversing a decade-long trend."
            }
          },
          "summary": "As restrictions have eased, house prices have started to go through the roof. Among the 25 countries that The Economist tracks, real house prices rose by 5% on average in the latest 12-month period, the quickest in over a decade. The expectation that commuting may no longer be daily has caused house prices in suburban locations to rise faster than in cities\u2014reversing a decade-long trend. One reason is that house prices do not look as if they threaten financial stability. If house prices in America fell by one-quarter, its 33 biggest banks would still have 50% more capital than they had going into the crisis of 2007-09.",
          "title": "House prices are going ballistic"
        },
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "- Politicians are taking action to address housing shortages, and consultants in Auckland have detected a genuine interest in boosting housing supply.\n- Evidence suggests that autocratic planning systems may be more effective at increasing housing supply, as seen in Switzerland where house prices have risen less than in any other rich country."
            }
          },
          "summary": "Consultants to the government in Auckland detect a genuine interest in boosting housing supply. The part of the country with the most elastic housing supply, Pine Bluff, a midsized city in Arkansas, has an average house price of $90,000. Some evidence seems to back up the view that economists\u2019 obsession with housing supply is misguided. Autocratic planning systems do a better job of boosting housing supply. In the past century Swiss house prices have risen by less than those in any other rich country.",
          "title": "Supply - Politicians are finally doing something about housing shortages"
        },
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "- American house prices rose by 11% in the year to January, the fastest pace for 15 years, and real house prices have risen by an average of 5% across the 25 countries tracked by The Economist.\n- House prices outside Germany's seven biggest cities rose by 11% last year, compared with 6% within them, while house prices in central London and Sydney rose by just 4% and 3% last year, respectively, and those in Manhattan fell by 4%."
            }
          },
          "summary": "American house prices rose by 11% in the year to January, the fastest pace for 15 years. Across the 25 countries tracked by The Economist, real house prices have risen by an average of 5% in the latest 12-month period. At first glance, the robustness of house prices in the face of the economic turmoil inflicted by covid-19 might seem baffling: property prices typically move in tandem with the economy. House prices outside Germany\u2019s seven biggest cities rose by 11% last year, compared with 6% within them. By contrast, house prices in central London and Sydney rose by just 4% and 3% last year, respectively; those in Manhattan fell by 4%.",
          "title": "House prices in the rich world are booming"
        }
      ]
    }
  }
}
# END Expected SinglePromptQuery results
"""

# ===== Basic Grouped Generative Query =====

# GroupedTaskQuery
response = (
    client.query
    .get("Article", ["title", "summary"])
    .with_near_text({"concepts": ["housing prices"]})
    .with_limit(3)
    # highlight-start
    .with_generate(
        grouped_task="Provide any common threads between these articles, if any"
    )
    # highlight-end
    .do()
)

print(json.dumps(response, indent=2))
# END GroupedTaskQuery

# Tests
assert "Article" in response["data"]["Get"]
assert len(response["data"]["Get"]["Article"]) == 3
assert response["data"]["Get"]["Article"][0].keys() == {"title", "summary", "_additional"}
assert response["data"]["Get"]["Article"][0]["_additional"].keys() == {"generate"}
assert "groupedResult" in response["data"]["Get"]["Article"][0]["_additional"]["generate"].keys()
# End test

expected_response = """
# Expected GroupedTaskQuery results
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "All three articles discuss the recent rise in house prices in various countries, with a focus on the impact of the COVID-19 pandemic on the housing market. The articles also touch on the factors driving the increase in prices, such as changes in commuting patterns and supply shortages. Additionally, the articles mention the potential risks and concerns associated with the rapid rise in house prices, including the threat to financial stability and the impact on affordability for buyers."
            }
          },
          "summary": "As restrictions have eased, house prices have started to go through the roof. Among the 25 countries that The Economist tracks, real house prices rose by 5% on average in the latest 12-month period, the quickest in over a decade. The expectation that commuting may no longer be daily has caused house prices in suburban locations to rise faster than in cities\u2014reversing a decade-long trend. One reason is that house prices do not look as if they threaten financial stability. If house prices in America fell by one-quarter, its 33 biggest banks would still have 50% more capital than they had going into the crisis of 2007-09.",
          "title": "House prices are going ballistic"
        },
        {
          "_additional": {
            "generate": null
          },
          "summary": "Consultants to the government in Auckland detect a genuine interest in boosting housing supply. The part of the country with the most elastic housing supply, Pine Bluff, a midsized city in Arkansas, has an average house price of $90,000. Some evidence seems to back up the view that economists\u2019 obsession with housing supply is misguided. Autocratic planning systems do a better job of boosting housing supply. In the past century Swiss house prices have risen by less than those in any other rich country.",
          "title": "Supply - Politicians are finally doing something about housing shortages"
        },
        {
          "_additional": {
            "generate": null
          },
          "summary": "American house prices rose by 11% in the year to January, the fastest pace for 15 years. Across the 25 countries tracked by The Economist, real house prices have risen by an average of 5% in the latest 12-month period. At first glance, the robustness of house prices in the face of the economic turmoil inflicted by covid-19 might seem baffling: property prices typically move in tandem with the economy. House prices outside Germany\u2019s seven biggest cities rose by 11% last year, compared with 6% within them. By contrast, house prices in central London and Sydney rose by just 4% and 3% last year, respectively; those in Manhattan fell by 4%.",
          "title": "House prices in the rich world are booming"
        }
      ]
    }
  }
}
# END Expected GroupedTaskQuery results
"""

# ===== Grouped Generative Query w/ Specific properties =====

# GroupedTaskWithProperties
response = (
    client.query
    .get("Article", ["title"])
    .with_near_text({"concepts": ["housing prices"]})
    .with_limit(3)
    # highlight-start
    .with_generate(
        grouped_task="Repeat the provided prompt, exactly",
        grouped_properties=["title"]
    )
    # highlight-end
    .do()
)

print(json.dumps(response, indent=2))
# END GroupedTaskWithProperties

# Tests
assert "Article" in response["data"]["Get"]
assert len(response["data"]["Get"]["Article"]) == 3
assert response["data"]["Get"]["Article"][0].keys() == {"title", "_additional"}
assert response["data"]["Get"]["Article"][0]["_additional"].keys() == {"generate"}
assert "groupedResult" in response["data"]["Get"]["Article"][0]["_additional"]["generate"].keys()
# End test

expected_response = """
# Expected GroupedTaskWithProperties results
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "[{\"title\":\"House prices are going ballistic\"},{\"title\":\"Supply - Politicians are finally doing something about housing shortages\"},{\"title\":\"House prices in the rich world are booming\"}]"
            }
          },
          "title": "House prices are going ballistic"
        },
        {
          "_additional": {
            "generate": null
          },
          "title": "Supply - Politicians are finally doing something about housing shortages"
        },
        {
          "_additional": {
            "generate": null
          },
          "title": "House prices in the rich world are booming"
        }
      ]
    }
  }
}
# END Expected GroupedTaskWithProperties results
"""
