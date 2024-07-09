# FilterExampleBasic
import weaviate
from weaviate.classes.query import MetadataQuery
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


def search_demo(collection: Collection, property_names: List[str], query_strings: List[str]):
    from weaviate.classes.query import MetadataQuery

    for query_string in query_strings:
        print("\n" + "=" * 40 + f"\nBM25 search results for: '{query_string}'" + "\n" + "=" * 40)
        for property_name in property_names:
            # highlight-start
            response = collection.query.bm25(
                query=query_string,
                return_metadata=MetadataQuery(score=True),
                query_properties=[property_name]
            )
            # highlight-end
            if len(response.objects) > 0:
                print(f">> '{property_name}' search results")
                for obj in response.objects:
                    print(obj.properties[property_name], round(obj.metadata.score, 3))


search_demo(collection, property_names, query_strings)
# END FilterExampleBasic

client.connect()

# ClarkExample
search_demo(collection, property_names, ["clark", "Clark", "clark:", "Clark:", "lois clark", "clark lois"])
# END ClarkExample

"""
# ClarkResults
========================================
BM25 search results for: 'clark'
========================================
>> 'text_word' search results
Lois & Clark: The New Adventures of Superman 0.613

========================================
BM25 search results for: 'Clark'
========================================
>> 'text_word' search results
Lois & Clark: The New Adventures of Superman 0.613

========================================
BM25 search results for: 'clark:'
========================================
>> 'text_word' search results
Lois & Clark: The New Adventures of Superman 0.613
>> 'text_lowercase' search results
Lois & Clark: The New Adventures of Superman 0.48

========================================
BM25 search results for: 'Clark:'
========================================
>> 'text_word' search results
Lois & Clark: The New Adventures of Superman 0.613
>> 'text_lowercase' search results
Lois & Clark: The New Adventures of Superman 0.48
>> 'text_whitespace' search results
Lois & Clark: The New Adventures of Superman 0.48

========================================
BM25 search results for: 'lois clark'
========================================
>> 'text_word' search results
Lois & Clark: The New Adventures of Superman 1.226
>> 'text_lowercase' search results
Lois & Clark: The New Adventures of Superman 0.48

========================================
BM25 search results for: 'clark lois'
========================================
>> 'text_word' search results
Lois & Clark: The New Adventures of Superman 1.226
>> 'text_lowercase' search results
Lois & Clark: The New Adventures of Superman 0.48
# END ClarkResults
"""

# MouseExample
search_demo(collection, property_names, ["computer mouse", "a computer mouse", "the computer mouse", "blue computer mouse"])
# END MouseExample

"""
# MouseResults
========================================
BM25 search results for: 'computer mouse'
========================================
>> 'text_word' search results
mouse computer 0.889
Computer Mouse 0.889
computer mouse 0.889
a computer mouse 0.764
computer mouse pad 0.764
>> 'text_lowercase' search results
mouse computer 0.819
Computer Mouse 0.819
computer mouse 0.819
a computer mouse 0.688
computer mouse pad 0.688
>> 'text_whitespace' search results
mouse computer 1.01
computer mouse 1.01
a computer mouse 0.849
computer mouse pad 0.849
>> 'text_field' search results
computer mouse 0.982

========================================
BM25 search results for: 'a computer mouse'
========================================
>> 'text_word' search results
mouse computer 0.889
Computer Mouse 0.889
computer mouse 0.889
a computer mouse 0.764
computer mouse pad 0.764
>> 'text_lowercase' search results
a computer mouse 1.552
mouse computer 0.819
Computer Mouse 0.819
computer mouse 0.819
computer mouse pad 0.688
>> 'text_whitespace' search results
a computer mouse 1.712
mouse computer 1.01
computer mouse 1.01
computer mouse pad 0.849
>> 'text_field' search results
a computer mouse 0.982

========================================
BM25 search results for: 'the computer mouse'
========================================
>> 'text_word' search results
mouse computer 0.889
Computer Mouse 0.889
computer mouse 0.889
a computer mouse 0.764
computer mouse pad 0.764
>> 'text_lowercase' search results
mouse computer 0.819
Computer Mouse 0.819
computer mouse 0.819
a computer mouse 0.688
computer mouse pad 0.688
Lois & Clark: The New Adventures of Superman 0.48
>> 'text_whitespace' search results
mouse computer 1.01
computer mouse 1.01
a computer mouse 0.849
computer mouse pad 0.849

========================================
BM25 search results for: 'blue computer mouse'
========================================
>> 'text_word' search results
mouse computer 0.889
Computer Mouse 0.889
computer mouse 0.889
a computer mouse 0.764
computer mouse pad 0.764
>> 'text_lowercase' search results
mouse computer 0.819
Computer Mouse 0.819
computer mouse 0.819
a computer mouse 0.688
computer mouse pad 0.688
>> 'text_whitespace' search results
mouse computer 1.01
computer mouse 1.01
a computer mouse 0.849
computer mouse pad 0.849
# END MouseResults
"""

# UnderscoreExample
search_demo(collection, property_names, ["variable_name"])
# END UnderscoreExample

"""
# UnderscoreResults
========================================
BM25 search results for: 'variable_name'
========================================
>> 'text_word' search results
Variable Name 0.716
Variable_Name 0.716
variable_name 0.716
variable_new_name 0.615
the_variable_name 0.615
a_variable_name 0.615
>> 'text_lowercase' search results
Variable_Name 0.97
variable_name 0.97
>> 'text_whitespace' search results
variable_name 1.27
>> 'text_field' search results
variable_name 0.982
# END UnderscoreResults
"""

client.close()
