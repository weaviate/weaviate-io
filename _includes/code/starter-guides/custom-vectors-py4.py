
# For testing and rerunning script
if client.collections.exists("Question"):
    client.collections.delete("Question")

# START create schema
import weaviate, os
import weaviate.classes as wvc

# The with-as context manager closes the connect when your code exits
with weaviate.connect_to_wcs(
    cluster_url=os.getenv("WCS_URL"),
    auth_credentials=weaviate.auth.AuthApiKey(os.getenv("WCS_API_KEY")),
) as client:
    questions = client.collections.create(
        name="Question",
        properties=[
            wvc.config.Property(
                name="question",
                description="What to ask",
                data_type=wvc.config.DataType.TEXT,
            ),
            wvc.config.Property(
                name="answer",
                description="The clue",
                data_type=wvc.config.DataType.TEXT,
            ),
            wvc.config.Property(
                name="category",
                description="The subject",
                data_type=wvc.config.DataType.TEXT,
            ),
        ],
        vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(),
        generative_config=wvc.config.Configure.Generative.openai(),
    )
# END create schema
