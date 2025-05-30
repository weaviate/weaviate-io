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
# START HybridWithBM25OperatorOrWithMin
{
  Get {
    JeopardyQuestion(
      limit: 3
      hybrid: {
        query: "Australian mammal cute"
        # highlight-start
        bm25SearchOperator: {
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
# END HybridWithBM25OperatorOrWithMin
"""

gqlresponse = client.graphql_raw_query(gql_query)

gql_query = """
# START HybridWithBM25OperatorAnd
{
  Get {
    JeopardyQuestion(
      limit: 3
      hybrid: {
        query: "Australian mammal cute"
        # highlight-start
        bm25SearchOperator: {
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
# END HybridWithBM25OperatorAnd
"""

gqlresponse = client.graphql_raw_query(gql_query)

client.close()
