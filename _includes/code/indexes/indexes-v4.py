# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import os
import weaviate

# Instantiate the client with the OpenAI API key
client = weaviate.connect_to_local(
    headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]  # Replace with your inference API key
    }
)

# ===========================
# ===== RANGEABLE INDEX =====
# ===========================

# Refresh
client.collections.delete("Inventory")

# START RangeIndex
from weaviate.classes.config import Property, DataType

client.collections.create(
    "Inventory",
    properties=[
        Property(name="itemName", data_type=DataType.TEXT),
        Property(name="itemDescription", data_type=DataType.TEXT),
        Property(name="itemCount",
                 data_type=DataType.INT,
                 skip_vectorization=True,
                 index_range_filters=True)
    ]
)
# END RangeIndex

# Test
inventory = client.collections.get("Inventory")
# assert inventory.config.get().properties[2].index_range_filters == True
