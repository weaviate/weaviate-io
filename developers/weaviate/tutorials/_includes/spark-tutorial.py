# START InitiateSparkSession
from pyspark.sql import SparkSession

spark = (
    SparkSession.builder.config("spark.jars", "spark-connector-assembly-1.4.0.jar")
    .config("spark.driver.extraJavaOptions", "-Djava.security.manager=allow")
    .master("local[*]")
    .appName("weaviate")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")
# END InitiateSparkSession

# START ReadDataIntoSpark
df = spark.read.load("sphere.100k.jsonl", format="json")
# END ReadDataIntoSpark

# START VerifyDataRead
df.limit(3).toPandas().head()
# END VerifyDataRead

# START CreateCollection
import weaviate
from weaviate.classes.config import DataType, Property

client = weaviate.connect_to_local(host="localhost", port=8080)

client.collections.delete_all()

client.collections.create(
    name="Sphere",
    properties=[
        Property(name="raw", data_type=DataType.TEXT),
        Property(name="sha", data_type=DataType.TEXT),
        Property(name="title", data_type=DataType.TEXT),
        Property(name="url", data_type=DataType.TEXT),
    ],
)
# END CreateCollection

# START WriteToWeaviate
df.limit(1500).withColumnRenamed("id", "uuid").write.format(
    "io.weaviate.spark.Weaviate"
).option("batchSize", 200).option("scheme", "http").option(
    "host", "localhost:8080"
).option(
    "id", "uuid"
).option(
    "className", "Sphere"
).option(
    "vector", "vector"
).mode(
    "append"
).save()
# END WriteToWeaviate

client.close()

# START CreateNamedVectorCollection
import weaviate
from weaviate.classes.config import Configure, DataType, Property

client = weaviate.connect_to_local(host="localhost", port=8080)

client.collections.delete_all()

client.collections.create(
    name="BringYourOwnVectors",
    properties=[
        Property(name="title", data_type=DataType.TEXT),
    ],
    vectorizer_config=[
        Configure.NamedVectors.none(
            name="regular",
            vector_index_config=Configure.VectorIndex.hnsw(),
        ),
        Configure.NamedVectors.none(
            name="colbert",
            vector_index_config=Configure.VectorIndex.hnsw(
                multi_vector=Configure.VectorIndex.MultiVector.multi_vector()
            ),
        ),
    ],
)
# END CreateNamedVectorCollection
# START ReadNamedVectorDataIntoSpark
from pyspark.sql.types import StructType, StructField, StringType, ArrayType, FloatType

spark_byov_schema = StructType(
    [
        StructField("title", StringType()),
        StructField("regularVector", ArrayType(FloatType())),
        StructField("multiVector", ArrayType(ArrayType(FloatType()))),
    ]
)

data = [("Title", [0.1, 0.2], [[0.1, 0.2], [0.3, 0.4]])]

df = spark.createDataFrame(data=data, schema=spark_byov_schema)

df.write.format("io.weaviate.spark.Weaviate").option("scheme", "http").option(
    "host", "localhost:8080"
).option("grpc:host", "localhost:50051").option(
    "className", "BringYourOwnVectors"
).option(
    "vectors:regular", "regularVector"
).option(
    "multiVectors:colbert", "multiVector"
).mode(
    "append"
).save()
# END ReadNamedVectorDataIntoSpark

# START CloseConnection
client.close()
# END CloseConnection
