# START FastAPI Example
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
import os
import weaviate
from weaviate.collections.classes.internal import GenerativeSearchReturnType

cohere_api_key = os.getenv("COHERE_API_KEY")  # Best practice: store your API keys in environment variables

# Initialize the Weaviate client
async_client = weaviate.use_async_with_local(
    headers={
        "X-Cohere-Api-Key": cohere_api_key  # Replace with your Cohere API key
    }
)


@asynccontextmanager
async def lifespan(app: FastAPI):  # See https://fastapi.tiangolo.com/advanced/events/#lifespan-function
    # Connect the client to Weaviate
    await async_client.connect()
    yield
    # Close the connection to Weaviate
    await async_client.close()


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def read_root():
    collection = async_client.collections.get("Movie")
    obj_count = await collection.aggregate.over_all(total_count=True)
    return {"object_count": obj_count.total_count}


@app.get("/search")
async def search(query: str) -> dict:
    if not await async_client.is_ready():
        raise HTTPException(status_code=503, detail="Weaviate is not ready")

    collection = async_client.collections.get("Movie")
    print(query)
    response: GenerativeSearchReturnType = await collection.generate.hybrid(
        query=query,
        target_vector="overview_vector",
        single_prompt=f"""
        The user searched for query: {query}.
        Based on the following overview, simply recommend or not whether the
        user might want to watch the movie. Do not offer any follow-ups or additional info.
        MOVIE TITLE: {{title}}. OVERVIEW: {{overview}}
        """,
        limit=3,
    )

    return {
        "responses": [
            {
                "title": object.properties["title"],
                "overview": object.properties["overview"],
                "recommendation": object.generated,
            }
            for object in response.objects
        ]
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
# END FastAPI Example
