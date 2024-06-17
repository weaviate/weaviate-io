# FilterExampleBasic
import weaviate
from weaviate.classes.query import Filter
from weaviate.collections import Collection
from typing import List

# END FilterExampleBasic

client = weaviate.connect_to_local()

# FilterExampleBasic
# Instantiate your client (not shown). e.g.:
# client = weaviate.connect_to_wcs(...) or
# client = weaviate.connect_to_local()

# END FilterExampleBasic

# FilterExampleBasic
collection = client.collections.get("TokenizationDemo")

# END FilterExampleBasic


# FilterExampleBasic
# Get property names
property_names = list()
for p in collection.config.get().properties:
    property_names.append(p.name)

query_strings = ["<YOUR_QUERY_STRING>"]


def filter_demo(collection: Collection, property_names: List[str], query_strings: List[str]):
    from weaviate.classes.query import Filter

    for query_string in query_strings:
        print("\n" + "=" * 40 + f"\nHits for: '{query_string}'" + "\n" + "=" * 40)
        for property_name in property_names:
            # highlight-start
            response = collection.query.fetch_objects(
                filters=Filter.by_property(property_name).equal(query_string),
            )
            # highlight-end
            if len(response.objects) > 0:
                print(f">> '{property_name}' matches")
                for obj in response.objects:
                    print(obj.properties[property_name])


filter_demo(collection, property_names, query_strings)
# END FilterExampleBasic

client.connect()

# ClarkExample
filter_demo(collection, property_names, ["clark", "Clark", "clark:", "Clark:", "lois clark", "clark lois"])
# END ClarkExample

"""
# ClarkResults
========================================
Hits for: 'clark'
========================================
>> 'text_word' matches
Lois & Clark: The New Adventures of Superman

========================================
Hits for: 'Clark'
========================================
>> 'text_word' matches
Lois & Clark: The New Adventures of Superman

========================================
Hits for: 'clark:'
========================================
>> 'text_word' matches
Lois & Clark: The New Adventures of Superman
>> 'text_lowercase' matches
Lois & Clark: The New Adventures of Superman

========================================
Hits for: 'Clark:'
========================================
>> 'text_word' matches
Lois & Clark: The New Adventures of Superman
>> 'text_lowercase' matches
Lois & Clark: The New Adventures of Superman
>> 'text_whitespace' matches
Lois & Clark: The New Adventures of Superman

========================================
Hits for: 'lois clark'
========================================
>> 'text_word' matches
Lois & Clark: The New Adventures of Superman

========================================
Hits for: 'clark lois'
========================================
>> 'text_word' matches
Lois & Clark: The New Adventures of Superman
# END ClarkResults
"""

# MouseExample
filter_demo(collection, property_names, ["computer mouse", "a computer mouse", "the computer mouse", "blue computer mouse"])
# END MouseExample

"""
# MouseResults
========================================
Hits for: 'computer mouse'
========================================
>> 'text_word' matches
computer mouse
Computer Mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_lowercase' matches
computer mouse
Computer Mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_whitespace' matches
computer mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_field' matches
computer mouse

========================================
Hits for: 'a computer mouse'
========================================
>> 'text_word' matches
computer mouse
Computer Mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_lowercase' matches
computer mouse
Computer Mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_whitespace' matches
computer mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_field' matches
a computer mouse

========================================
Hits for: 'the computer mouse'
========================================
>> 'text_word' matches
computer mouse
Computer Mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_lowercase' matches
computer mouse
Computer Mouse
mouse computer
computer mouse pad
a computer mouse
>> 'text_whitespace' matches
computer mouse
mouse computer
computer mouse pad
a computer mouse

========================================
Hits for: 'blue computer mouse'
========================================
# END MouseResults
"""

# UnderscoreExample
filter_demo(collection, property_names, ["variable_name"])
# END UnderscoreExample

"""
# UnderscoreResults
========================================
Hits for: 'variable_name'
========================================
>> 'text_word' matches
variable_name
Variable_Name
Variable Name
a_variable_name
the_variable_name
variable_new_name
>> 'text_lowercase' matches
variable_name
Variable_Name
>> 'text_whitespace' matches
variable_name
>> 'text_field' matches
variable_name
# END UnderscoreResults
"""

client.close()
