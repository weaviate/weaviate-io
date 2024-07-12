# START GetData
import requests

# Download the json file
response = requests.get(
    "https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json"
)

# Write the json file to disk
data = response.json()
with open('jeopardy_1k.json', 'w') as f:
    json.dump(data, f)

# # Uncomment this section to create a csv file
# import pandas as pd

# df = pd.read_json("jeopardy_1k.json")
# df.to_csv("jeopardy_1k.csv", index=False)
# END GetData