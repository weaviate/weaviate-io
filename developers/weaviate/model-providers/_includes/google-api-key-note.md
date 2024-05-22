<details>
  <summary>API key headers</summary>

Starting from `v1.25.1` and `v1.24.14`, there are separate headers `X-Google-Vertex-Api-Key` and `X-Google-Studio-Api-Key` for Vertex AI users and AI Studio respectively.
<br/>

Prior to Weaviate `v1.25.1` or `v1.24.14`, there was one header for both Vertex AI users and AI Studio, specified with either `X-Google-Api-Key` or `X-PaLM-Api-Key`. We recommend using the new headers for clarity and future compatibility.

</details>
