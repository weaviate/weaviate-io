# NearText
import weaviate
import json

client = weaviate.connect_to_local()

questions = client.collections.get("Question")

# highlight-start
response = questions.query.near_text(
    query="biology",
    limit=2
)
# highlight-end

for obj in response.objects:
    print(json.dumps(obj.properties, indent=2))

client.close()  # Free up resources
# END NearText
