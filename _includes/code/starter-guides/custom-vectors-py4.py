# START-ANY
# Set these environment variables
# WEAVIATE_URL - The URL for your Weaviate instance
# WEAVIATE_API_KEY - The API key for your Weaviate instance
# OPENAI_API_KEY - The API key for your OpenAI account

# END-ANY

# For testing and rerunning script
if client.collections.exists("Question"):
    client.collections.delete("Question")

# START create schema
import weaviate, os
import weaviate.classes as wvc

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

# The with-as context manager closes the connect when your code exits
with weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=wvc.init.Auth.api_key(weaviate_api_key),
) as client:
    questions = client.collections.create(
        name="Question",
        properties=[
            wvc.config.Property(
                name="question",
                description="What to ask",
                data_type=wvc.config.DataType.TEXT,
                tokenization=wvc.config.Tokenization.WORD,
                index_searchable=True,
                index_filterable=True,
            ),
            wvc.config.Property(
                name="answer",
                description="The clue",
                data_type=wvc.config.DataType.TEXT,
                tokenization=wvc.config.Tokenization.WORD,
                index_searchable=True,
                index_filterable=True,
            ),
            wvc.config.Property(
                name="category",
                description="The subject",
                data_type=wvc.config.DataType.TEXT,
                tokenization=wvc.config.Tokenization.WORD,
                index_searchable=True,
                index_filterable=True,
            ),
        ],
        vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),
        generative_config=wvc.config.Configure.Generative.openai(),
    )
# END create schema
