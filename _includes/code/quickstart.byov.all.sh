# Bring Your Own Vectors - curl example
# Download the data file
curl -O -L "https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny+vectors.json"

# Replace with your endpoints
SCHEMA_API_URL="https://some-endpoint.weaviate.network/v1/schema"
BATCH_API_URL="https://some-endpoint.weaviate.network/v1/batch/objects"
BATCH_SIZE=100

# Create the schema. Weaviate's autoschema feature will infer class properties when importing.
echo '{
  "class": "Question",
  "vectorizer": "text2vec-openai",
}' | curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d @- \
  $SCHEMA_API_URL

# Read the JSON file and loop through its entries
lines_processed=0
batch_data="{\"objects\": ["

cat jeopardy_tiny+vectors.json | jq -c '.[]' | while read line; do
  # Concatenate lines
  line=$(echo "$line" | jq "{class: \"Question\", properties: {answer: .Answer, question: .Question, category: .Category}}")

  TODO: add the vector

  if [ $lines_processed -eq 0 ]; then
    batch_data+=$line
  else
    batch_data+=",$line"
  fi

  lines_processed=$((lines_processed + 1))

  # If the batch is full, send it to the API using curl
  if [ $lines_processed -eq $BATCH_SIZE ]; then
    batch_data+="]}"

    curl -X POST "$BATCH_API_URL" \
         -H "Content-Type: application/json" \
         -d "$batch_data"
    echo "" # Print a newline for better output formatting

    # Reset the batch data and counter
    lines_processed=0
    batch_data="{\"objects\": ["
  fi
done

# Send the remaining data (if any) to the API using curl
if [ $lines_processed -ne 0 ]; then
  batch_data+="]}"

  curl -X POST "$BATCH_API_URL" \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR-WEAVIATE-API-KEY" \
       -d "$batch_data"
  echo "" # Print a newline for better output formatting
fi
