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