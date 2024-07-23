// Howto: Multiple target vectors search - TypeScript examples

// TODO: Needs tests

// ================================
// ===== INSTANTIATION-COMMON =====
// ================================



// client = weaviate.connect_to_wcs(
//     cluster_url=os.getenv("WCD_DEMO_URL"),
//     auth_credentials=AuthApiKey(os.getenv("WCD_DEMO_RO_KEY")),
//     headers={
//         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
//     },
// )

// client = weaviate.connect_to_local(
//     headers={
//         "X-OpenAI-Api-Key": os.getenv("OPENAI_APIKEY"),
//     }
// )

// ========================
// ===== Basic search =====
// ========================


// START MultiBasic
it('Perform a near_text query with multiple target vectors', () => {
 return client.graphql
   .get()
   .withClassName("Jeopardy_Tiny_Dataset")
   .withHybrid({
     query: 'Best',
     targetVectors: MultiVectorTargets.sum(['title', 'rating']),
   })
   .withFields('rating')
   .do()
   .then((res) => {
     expect(res.data.Get.NamedVectorTest).toHaveLength(3);
     expect(res.data.Get.NamedVectorTest[0].rating).toBe('Best');
   });
});




collection = client.collections.get("Jeopardy_Tiny_Dataset")
response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    target_vector=["jeopardy_questions_vector", "jeopardy_answers_vector"],  // Specify the target vectors
)

for o in response.objects:
    print(o.properties)
// END MultiBasic


// ========================
// ===== Set Weights =====
// ========================

// START MultiWeights
collection = client.collections.get("Jeopardy_Tiny_Dataset")
response = collection.query.near_text(
    query="a wild animal",
    limit=2,
    target_vector=wvc.query.TargetVectors.manual_weights({"jeopardy_questions_vector": 0.1, "jeopardy_answers_vector": 0.5})
)

for o in response.objects:
    print(o.properties)
// END MultiWeights
