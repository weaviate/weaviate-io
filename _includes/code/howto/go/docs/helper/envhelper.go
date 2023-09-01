package helper

import "os"

const (
	envScheme = "WEAVIATE_SCHEME"
	envHost   = "WEAVIATE_HOST"
	envPort   = "WEAVIATE_PORT"
)

func EnvScheme(defaultScheme string) string {
	return Env(envScheme, defaultScheme)
}

func EnvHost(defaulHost string) string {
	return Env(envHost, defaulHost)
}

func EnvPort(defaultPort string) string {
	return Env(envPort, defaultPort)
}

func Env(envName string, def string) string {
	if env := os.Getenv(envName); env != "" {
		return env
	}
	return def
}
