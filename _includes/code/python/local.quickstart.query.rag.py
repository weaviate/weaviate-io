# RAG
import weaviate

client = weaviate.connect_to_local()

questions = client.collections.get("Question")

# highlight-start
response = questions.generate.near_text(
    query="biology",
    limit=2,
    grouped_task="Write a tweet with emojis about these facts."
)
# highlight-end

print(response.generated)  # Inspect the generated text

client.close()  # Free up resources
# END RAG
