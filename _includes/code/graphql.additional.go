// START Sorting
package main

import (
  "context"
  "fmt"

  "github.com/weaviate/weaviate-go-client/v4/weaviate"
  "github.com/weaviate/weaviate-go-client/v4/weaviate/graphql"
)

func main() {
  cfg := weaviate.Config{
    Host:   "localhost:8080",
    Scheme: "http",
  }
  client, err := weaviate.NewClient(cfg)
  if err != nil {
    panic(err)
  }

  title := graphql.Field{Name: "title"}
  url := graphql.Field{Name: "url"}
  wordCount := graphql.Field{Name: "wordCount"}

  byTitleAsc := graphql.Sort{
    Path: []string{"title"}, Order: graphql.Asc,
  }

  ctx := context.Background()
  result, err := client.GraphQL().Get().
    WithClassName("Article").
    WithSort(byTitleAsc).
    WithFields(title, url, wordCount).
    Do(ctx)
  if err != nil {
    panic(err)
  }
  fmt.Printf("%v", result)
}
// END Sorting

// START MultiplePropSorting
Coming soon
// END MultiplePropSorting

// START AdditionalPropSorting
Coming soon
// END AdditionalPropSorting
