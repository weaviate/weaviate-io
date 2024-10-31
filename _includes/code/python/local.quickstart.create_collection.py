# CreateCollection
import weaviate
from weaviate.classes.config import Configure

client = weaviate.connect_to_local()

# END CreateCollection
# NOT SHOWN TO THE USER - DELETE EXISTING COLLECTION
client.collections.delete("Question")

# CreateCollection
# highlight-start
questions = client.collections.create(
    name="Question",
    vectorizer_config=Configure.Vectorizer.text2vec_ollama(     # Configure the Ollama embedding integration
        api_endpoint="http://host.docker.internal:11434",       # Allow Weaviate from within a Docker container to contact your Ollama instance
        model="nomic-embed-text",                               # The model to use
    ),
    generative_config=Configure.Generative.ollama(              # Configure the Ollama generative integration
        api_endpoint="http://host.docker.internal:11434",       # Allow Weaviate from within a Docker container to contact your Ollama instance
        model="llama3.2",                                       # The model to use
    )
)
# highlight-end
# CreateCollection

client.close()  # Free up resources
# END CreateCollection


