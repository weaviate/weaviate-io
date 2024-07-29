# START-ANY
import weaviate
from weaviate.classes.query import MetadataQuery, Move
import os

client = weaviate.connect_to_local(
    headers={
        # END-ANY
        # START NearTextAWS
        "X-AWS-Access-Key": "YOUR_ACCESS_KEY",
        "X-AWS-Secret-Key": "YOUR_SECRET_KEY",
        # END NearTextAWS
        # START NearTextCohere
        "X-Cohere-Api-Key": os.getenv("COHERE_APIKEY"),
        # END NearTextCohere
        # START NearTextOpenAI
        "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
        # END NearTextOpenAI
        # START NearTextGoogle
        "X-Google-Vertex-Api-Key": "YOUR-VERTEX-API-KEY",
        "X-Google-Studio-Api-Key": "YOUR-AI-STUDIO-API-KEY",
        # END NearTextGoogle
        # START NearTextHuggingface
        "X-HuggingFace-Api-Key": "YOUR_HUGGINGFACE_APIKEY",
        # END NearTextHuggingface
        # START NearTextJinaai
        "X-Jinaai-Api-Key": "YOUR_JINAAI_APIKEY",
        # END NearTextJinaai
        # START NearTextVoyageAI
        "X-VoyageAI-Api-Key": "YOUR_VOYAGEAI_APIKEY",
        # END NearTextVoyageAI
        # START-ANY
    }
)

# END-ANY

# Actual client instantiation
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
publications = client.collections.get("Publication")

response = publications.query.near_text(
    query="fashion",
    distance=0.6,
    move_to=Move(force=0.85, concepts="haute couture"),
    move_away=Move(force=0.45, concepts="finance"),
    return_metadata=MetadataQuery(distance=True),
    limit=2
)

for o in response.objects:
    print(o.properties)
    print(o.metadata)
# END-ANY

# START-ANY

client.close()
# END-ANY
