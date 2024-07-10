from fastapi import FastAPI, HTTPException
import os
import weaviate
from weaviate.collections.classes.internal import GenerativeSearchReturnType

app = FastAPI()

cohere_api_key = os.getenv("COHERE_API_KEY")  # Best practice: store your API keys in environment variables

# Initialize the Weaviate client
async_client = weaviate.use_async_with_local(
    headers={
        "X-Cohere-Api-Key": cohere_api_key  # Replace with your Cohere API key
    }
)


@app.on_event("startup")  # This event is triggered when the app starts
async def startup_event():
    await async_client.connect()  # Connect the client to Weaviate


@app.on_event("shutdown")  # This event is triggered when the app stops
async def shutdown_event():
    await async_client.close()  # Close the connection to Weaviate


@app.get("/search")
async def search(query: str) -> dict:
    if not await async_client.is_ready():
        raise HTTPException(status_code=503, detail="Weaviate is not ready")

    collection = async_client.collections.get("Movie")
    response: GenerativeSearchReturnType = await collection.generate.hybrid(
        query,
        target_vector="overview_vector",
        single="Describe the movies in these results, and why the user should watch it.",
        limit=3,
    )

    return {
        "generated_ad": response.generated,
        "movies": [obj.properties["title"] for obj in response.objects],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
