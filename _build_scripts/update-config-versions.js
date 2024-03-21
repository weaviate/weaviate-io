const fetch = require('node-fetch');

const getRepoVersion = async (repoName) => {
    const response = await fetch(
        `https://api.github.com/repos/weaviate/${repoName}/releases/latest`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': // Use the github token if available
                    (process.env.GH_API_TOKEN) ?
                        `Bearer ${ process.env.GH_API_TOKEN }` : ''
            }
        }
    );

    const repoData = await response.json();

    const version = repoData.tag_name.match(/\d{1,2}\.\d{1,2}\.\d{1,2}/g)[0]
    return version;
}


// Build time versions replace values set in versions-config.json
// versions-config.json values are used for yarn local yarn builds
const appendVersionsToConfig = async (config) => {
    config.weaviate_version = await getRepoVersion('weaviate');
    config.python_client_version = await getRepoVersion('weaviate-python-client');
    config.go_client_version = await getRepoVersion('weaviate-go-client');
    config.java_client_version = await getRepoVersion('weaviate-java-client');
    // config.javascript_client_version = await getRepoVersion('weaviate-javascript-client');
    config.typescript_client_version = await getRepoVersion('typescript-client');
    config.helm_version = await getRepoVersion('weaviate-helm');
    config.weaviate_cli_version = await getRepoVersion('weaviate-cli');

    config.spark_connector_version = await getRepoVersion('spark-connector');
}

const fs = require('fs');
const readConfig = (path) => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
}

const updateConfigFile = async () => {
    const path = './versions-config.json';

    const config = readConfig(path);

    await appendVersionsToConfig(config);

    fs.writeFile(path, JSON.stringify(config, null, 2), (err) => {
      if (err) return console.log(err);

      console.log(`Updating ${path}`)
      console.log(JSON.stringify(config, null, 2));
    });
}

updateConfigFile();