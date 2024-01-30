# START-ANY
import weaviate
# END-ANY

# START CreateSimpleCollection  # START CreateCollectionElaborate
import weaviate.classes as wvc
# END CreateSimpleCollection  # END CreateCollectionElaborate
# START-ANY

client = weaviate.connect_to_local()

try:
# END-ANY


    # ========================================
    # GetSchema
    # ========================================

    # START GetSchema
    schema = client.collections.list_all(simple=False)  # Use `simple=False` to get comprehensive information

    print(schema)
    # END GetSchema


    # ========================================
    # CreateSimpleCollection
    # ========================================

    client.collections.delete("Article")

    # START CreateSimpleCollection
    client.collections.create(
        name="Article",
        description="A written text, for example a news article or blog post",
        properties=[
            wvc.config.Property(
                data_type=wvc.config.DataType.TEXT,
                description="Title of the article",
                name="title",
            ),
            wvc.config.Property(
                data_type=wvc.config.DataType.TEXT,
                description="The content of the article",
                name="content",
            ),
        ]
    )
    # END CreateSimpleCollection


    # ========================================
    # CreateCollectionElaborate
    # ========================================

    client.collections.delete("Article")

    # START CreateCollectionElaborate
    client.collections.create(
        name="Article",
        description="A written text, for example a news article or blog post",
        vector_index_config=wvc.config.Configure.VectorIndex.hnsw(
            distance_metric=wvc.config.VectorDistances.COSINE,
            ef=128,
            max_connections=64
        ),
        vectorizer_config=wvc.config.Configure.Vectorizer.text2vec_openai(
            vectorize_collection_name=True,
        ),
        properties=[
            wvc.config.Property(
                data_type=wvc.config.DataType.TEXT,
                description="Title of the article",
                name="title",
                index_filterable=True,
                index_searchable=True,
                skip_vectorization=False,
                vectorize_property_name=False,
            ),
            wvc.config.Property(
                data_type=wvc.config.DataType.TEXT,
                description="The content of the article",
                name="content",
                index_filterable=True,
                index_searchable=True,
                skip_vectorization=False,
                vectorize_property_name=False,
            ),
        ],
        sharding_config=wvc.config.Configure.sharding(
            virtual_per_physical=128,
            desired_count=1,
            desired_virtual_count=128,
        )
    )
    # END CreateCollectionElaborate


    # ========================================
    # GetOneCollection
    # ========================================

    # START GetOneCollection
    articles = client.collections.get("Article")
    articles_config = articles.config.get(simple=False)

    print(articles_config)
    # END GetOneCollection


    # ========================================
    # DeleteOneCollection
    # ========================================

    # START DeleteOneCollection
    client.collections.delete("Article")
    # END DeleteOneCollection


    # ========================================
    # UpdateCollection
    # ========================================

    client.collections.delete("Article")

    # Create a collection
    client.collections.create(
        name="Article",
        description="A written text, for example a news article or blog post",
        properties=[
            wvc.config.Property(
                data_type=wvc.config.DataType.TEXT,
                description="Title of the article",
                name="title",
            ),
            wvc.config.Property(
                data_type=wvc.config.DataType.TEXT,
                description="The content of the article",
                name="content",
            ),
        ],
        inverted_index_config=wvc.config.Configure.inverted_index(
            bm25_k1=1.2,
            bm25_b=0.7
        ),
        vector_index_config=wvc.config.Configure.VectorIndex.hnsw(
            dynamic_ef_factor=8
        )
    )

    # START UpdateCollection
    # Retrieve the collection
    articles = client.collections.get("Article")

    # Update the collection
    articles.config.update(
        description="An updated collection description.",
        inverted_index_config=wvc.config.Reconfigure.inverted_index(
            bm25_k1=1.1,
            bm25_b=0.8
        ),
        vector_index_config=wvc.config.Reconfigure.VectorIndex.hnsw(
            dynamic_ef_factor=10
        )
    )
    # END UpdateCollection


    # ========================================
    # AddProperty
    # ========================================

    # START AddProperty
    articles = client.collections.get("Article")

    articles.config.add_property(
        wvc.config.Property(
            name="onHomepage",
            data_type=wvc.config.DataType.BOOL
        )
    )
    # END AddProperty


    # ========================================
    # InspectCollectionShards
    # ========================================

    # START InspectCollectionShards
    articles = client.collections.get("Article")

    article_shards = articles.config.get_shards()
    print(article_shards)
    # END InspectCollectionShards


    # ========================================
    # UpdateCollectionShards
    # ========================================

    # START UpdateCollectionShards
    # Coming soon :)
    # END UpdateCollectionShards

# START-ANY

finally:
    client.close()
# END-ANY
