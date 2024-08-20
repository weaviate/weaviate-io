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
    auth_credentials=Auth.api_key(wcd_api_key),
    headers={
        "X-OpenAI-Api-Key": openai_api_key,
    }
)

# START-ANY
try:
    reviews = client.collections.get("WineReview")

    # instruction for the generative module
    generate_prompt = "Explain what occasion these wines might be good for."

    response = reviews.generate.near_text(
        query="dry red wine",
        grouped_task=generate_prompt,
        limit=5
    )

    print(response.generated)  # "Grouped task" generations are attributes of the entire response
    for o in response.objects:
        print(o.properties)  # To inspect the retrieved object
finally:
    client.close()
# END-ANY
