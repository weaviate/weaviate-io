# START-ANY
# Set these environment variables
# WCD_URL - The URL for your Weaviate instance
# WCD_API_KEY - The API key for your Weaviate instance
# OPENAI_API_KEY - The API key for your OpenAI account

# END-ANY

# For testing and rerunning script
if client.collections.exists("Question"):
    client.collections.delete("Question")

# START create schema
import weaviate, os
import weaviate.classes as wvc

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_api_key = os.environ["WCD_DEMO_RO_KEY"]

# The with-as context manager closes the connect when your code exits
with weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,
    auth_credentials=wvc.init.Auth.api_key(wcd_api_key),
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
