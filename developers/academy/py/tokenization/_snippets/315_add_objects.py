# AddObjects
import weaviate

# END AddObjects

client = weaviate.connect_to_local()

# AddObjects
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local()

# END AddObjects

# AddObjects # StringsToAdd
collection = client.collections.get("TokenizationDemo")

# END AddObjects # END StringsToAdd
# AddObjects
# Get property names
property_names = [p.name for p in collection.config.get().properties]

# AddObjects # StringsToAdd
phrases = [
    # string with special characters
    "Lois & Clark: The New Adventures of Superman",

    # strings with stopwords & varying orders
    "computer mouse",
    "Computer Mouse",
    "mouse computer",
    "computer mouse pad",
    "a computer mouse",

    # strings without spaces
    "variable_name",
    "Variable_Name",
    "Variable Name",
    "a_variable_name",
    "the_variable_name",
    "variable_new_name",
]
# END AddObjects # END StringsToAdd

# AddObjects

for phrase in phrases:
    obj_properties = {name: phrase for name in property_names}
    print(obj_properties)
    collection.data.insert(properties=obj_properties)

client.close()
# END AddObjects
