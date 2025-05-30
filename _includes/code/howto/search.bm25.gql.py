# Howto: Hybrid search - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate.classes.init import Auth
import os

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
    },
)

gql_query = """
# START BM25OperatorOrWithMin
{
  Get {
    JeopardyQuestion(
      limit: 3
      bm25: {
        query: "Australian mammal cute"
        # highlight-start
        searchOperator: {
          operator: Or,
          minimumOrTokensMatch: 2
        }
        # highlight-end
      }
    ) {
      question
      answer
    }
  }
}
# END BM25OperatorOrWithMin
"""

gqlresponse = client.graphql_raw_query(gql_query)

gql_query = """
# START BM25OperatorAnd
{
  Get {
    JeopardyQuestion(
      limit: 3
      bm25: {
        query: "Australian mammal cute"
        # highlight-start
        searchOperator: {
          operator: And,
        }
        # highlight-end
      }
    ) {
      question
      answer
    }
  }
}
# END BM25OperatorAnd
"""

gqlresponse = client.graphql_raw_query(gql_query)

client.close()
