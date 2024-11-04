# InstantiationExample
import weaviate

# highlight-start
client = weaviate.connect_to_local()
# highlight-end

print(client.is_ready())  # Should print: `True`

client.close()  # Free up resources
# END InstantiationExample
