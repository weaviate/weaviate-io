# Use the official OpenJDK image as a base
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the container
# Adjust paths as needed
COPY ./_includes/code/howto/java/src/test/java/io/weaviate/docs/quickstart/IsReady.java /app/src/test/java/
COPY ./pom.xml /app
RUN ls -alh /app
# Install dependencies and compile the project
RUN mvn clean install
