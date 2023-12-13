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
        "X-Google-Api-Key": "YOUR_GOOGLE_APIKEY",
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

articles = client.collections.get("Article")

# instruction for the generative module
generate_prompt = "Describe the following as a Facebook Ad: {summary}"

response = articles.generate.near_text(
    query="Italian food",
    single_prompt=generate_prompt,
    limit=5
)

for o in response.objects:
    print(o.generated)  # "Single prompt" generations are attributes of each object
    print(o.properties)  # To inspect the retrieved object
# END-ANY