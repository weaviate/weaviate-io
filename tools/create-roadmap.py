import requests, yaml

roadmap = {}

# Get all roadmap labels
include_labels = []
labels = requests.get('https://api.github.com/repos/semi-technologies/weaviate/labels?per_page=1000')
for label in labels.json():
    if label['name'].find('backlog') >= 0 or label['name'].find('planned-') >= 0:
        include_labels.append(label['name'])
        roadmap[label['name']] = []

# Collect all issues
for label in include_labels:
    issues = requests.get('https://api.github.com/repos/semi-technologies/weaviate/issues?per_page=1000&labels=' + label)
    for issue in issues.json():
        roadmap[label].append({
            'title': issue['title'],
            'url': issue['html_url'],
            '+1': issue['reactions']['+1']
        })

# order 
dict(sorted(roadmap.items(), reverse=False))

# save to yaml
with open('_data/roadmap.yml', 'w') as outfile:
    yaml.dump(roadmap, outfile, default_flow_style=False)
