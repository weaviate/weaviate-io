import requests, yaml, os

# Set Github API token if available in the env variables
headers = {}
if 'GITHUB_API_TOKEN' in os.environ:
    headers = { 'Authorization': 'Bearer ' + os.environ['GITHUB_API_TOKEN'] }

# Function to call github API with an access token
def call_githubAPI(query):
    base_url = 'https://api.github.com/repos/semi-technologies/weaviate/'
    url = base_url + query

    # Add code to retrieve the token
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception("Failed Request.get => " + url + "\n" + response.content.decode())

    return response.json()

# Return True if label is planned-* or backlog
def isRoadmapLabel(label):
    return (
        label['name'].startswith('planned-') or
        label['name'] == 'backlog'
    )

# Get all roadmap labels and filter out unrelated labels
labels = call_githubAPI('labels?per_page=1000')
labels = list(filter(isRoadmapLabel, labels))

# Construct Roadmap for each label
roadmap = {}
for label in labels:
    label_name = label['name']
    
    roadmap[label_name] = {
        'description': label['description'],
        'items': []
    }

    # Get issues for each label and add them to the roadmap object
    issues = call_githubAPI('issues?per_page=1000&labels=' + label_name)

    for issue in issues:
        roadmap[label_name]['items'].append({
            'title': issue['title'],
            'url': issue['html_url'],
            '+1': issue['reactions']['+1'],
        })

# order 
dict(sorted(roadmap.items(), reverse=False))

# save to yaml
with open('_data/roadmap.yml', 'w') as outfile:
    yaml.dump(roadmap, outfile, default_flow_style=False)
