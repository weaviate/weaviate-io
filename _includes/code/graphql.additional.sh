# START Sorting
echo '{
  "query": "{
    Get {
      Article(sort: [{
        path: [\"title\"]
        order: asc
      }]) {
        title
        url
        wordCount
      }
    }
  }"
}' | curl \
    -X POST \
    -H 'Content-Type: application/json' \
    -d @- \
    http://localhost:8080/v1/graphql
# END Sorting

# START MultiplePropSorting
Coming soon
# END MultiplePropSorting

# START AdditionalPropSorting
Coming soon
# END AdditionalPropSorting
