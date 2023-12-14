# START-ANY
import weaviate
import os

client = weaviate.connect_to_local(
    headers={
        # END-ANY
        # START GenerativeAWS
        "X-AWS-Access-Key": "YOUR_ACCESS_KEY",
        "X-AWS-Secret-Key": "YOUR_SECRET_KEY",
        # END GenerativeAWS
        # START GenerativeCohere
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
        # END GenerativeCohere
        # START GenerativeOpenAI
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
        # END GenerativeOpenAI
        # START GenerativeGoogle
        "X-Palm-Api-Key": "YOUR_GOOGLE_APIKEY",
        # END GenerativeGoogle
        # START GenerativeHuggingface
        "X-HuggingFace-Api-Key": "YOUR_HUGGINGFACE_APIKEY",
        # END GenerativeHuggingface
        # START GenerativeJinaai
        "X-Jinaai-Api-Key": "YOUR_JINAAI_APIKEY",
        # END GenerativeJinaai
        # START-ANY
    }
)

publications = client.collections.get("Publication")

# instruction for the generative module
generate_prompt = "Explain why these magazines or newspapers are about finance"

response = publications.generate.near_text(
    query="magazine or newspaper about finance",
    grouped_task=generate_prompt,
    limit=5
)

print(response.generated)  # "Grouped task" generations are attributes of the entire response
for o in response.objects:
    print(o.properties)  # To inspect the retrieved object
# END-ANY