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
        "X-Google-Vertex-Api-Key": "YOUR-VERTEX-API-KEY",
        "X-Google-Studio-Api-Key": "YOUR-AI-STUDIO-API-KEY",
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

# END-ANY
client.close()

from weaviate.classes.init import Auth

# Best practice: store your credentials in environment variables
wcd_url = os.environ["WCD_DEMO_URL"]
wcd_api_key = os.environ["WCD_DEMO_RO_KEY"]
openai_api_key = os.environ["OPENAI_APIKEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=wcd_url,
    auth_credentials=wcd_api_key,
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
    }
)

# START-ANY
try:
    reviews = client.collections.get("WineReview")

    # instruction for the generative module
    generate_prompt = "Describe the following as a Facebook Ad: {review_body}"

    response = reviews.generate.near_text(
        query="fruity white wine",
        single_prompt=generate_prompt,
        limit=3
    )

    for o in response.objects:
        print(o.generated)  # "Single prompt" generations are attributes of each object
        print(o.properties)  # To inspect the retrieved object
finally:
    client.close()
# END-ANY
