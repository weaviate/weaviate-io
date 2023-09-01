package io.weaviate.docs.helper;

import java.util.Optional;

public class EnvHelper {

  private static final String ENV_SCHEME = "WEAVIATE_SCHEME";
  private static final String ENV_HOST = "WEAVIATE_HOST";
  private static final String ENV_PORT = "WEAVIATE_PORT";

  private EnvHelper() {
  }

  public static String scheme(String defaultScheme) {
    return env(ENV_SCHEME, defaultScheme);
  }

  public static String host(String defaultHost) {
    return env(ENV_HOST, defaultHost);
  }

  public static String port(String defaultPort) {
    return env(ENV_PORT, defaultPort);
  }

  public static String env(String envName, String def) {
    return Optional.ofNullable(System.getenv(envName)).orElse(def);
  }
}
