package helper

import "os"

const (
  envScheme = "WEAVIATE_SCHEME"
  envHost   = "WEAVIATE_HOST"
  envPort   = "WEAVIATE_PORT"
)

func EnvScheme(defaultScheme string) string {
  return env(envScheme, defaultScheme)
}

func EnvHost(defaulHost string) string {
  return env(envHost, defaulHost)
}

func EnvPort(defaultPort string) string {
  return env(envPort, defaultPort)
}

func env(envName string, def string) string {
  if env := os.Getenv(envName); env != "" {
    return env
  }
  return def
}
