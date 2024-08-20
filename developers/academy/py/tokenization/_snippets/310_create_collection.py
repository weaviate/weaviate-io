# CreateDemoCollection
import weaviate
from weaviate.classes.config import Property, DataType, Tokenization, Configure

# END CreateDemoCollection

client = weaviate.connect_to_local()

# CreateDemoCollection
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_weaviate_cloud(...) or
# client = weaviate.connect_to_local()

# END CreateDemoCollection

client.collections.delete("TokenizationDemo")

# CreateDemoCollection
tkn_options = [
    Tokenization.WORD,
    Tokenization.LOWERCASE,
    Tokenization.WHITESPACE,
    Tokenization.FIELD,
]

# Create a property for each tokenization option
properties = []
for tokenization in tkn_options:
    prop = Property(
        name=f"text_{tokenization.replace('.', '_')}",
        data_type=DataType.TEXT,
        tokenization=tokenization
    )
    properties.append(prop)


client.collections.create(
    name="TokenizationDemo",
    properties=properties,
    vectorizer_config=Configure.Vectorizer.none()
)

client.close()
# END CreateDemoCollection
