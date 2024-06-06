#NOT TESTED AS A RUNNING END TO END SCRIPT

# START SimpleInstance
import weaviate
from weaviate.embedded import EmbeddedOptions

client = weaviate.Client(
embedded_options=EmbeddedOptions()
)

data_obj = {
"name": "Chardonnay",
"description": "Goes with fish"
}

client.data_object.create(data_obj, "Wine")
# END SimpleInstance
client.close()

# START CustomModules
import weaviate
from weaviate.embedded import EmbeddedOptions

client = weaviate.Client(
  embedded_options=EmbeddedOptions(
      additional_env_vars={
      "ENABLE_MODULES":
      "backup-s3,text2vec-openai,text2vec-cohere,text2vec-huggingface,ref2vec-centroid,generative-openai,qna-openai"}
  )
)
# END CustomModules
client.close()
