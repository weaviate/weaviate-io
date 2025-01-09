const fetch = require('node-fetch');

const getRepoVersion = async (repoName) => {
    try {
        const response = await fetch( // fetch all release versions
            `https://api.github.com/repos/weaviate/${repoName}/releases`,
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

        // First check if the response was ok
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const releases = await response.json();

        // Check if releases is actually an array
        if (!Array.isArray(releases)) {
            // Debug log to see what we're getting
            console.log(`Raw response for ${repoName}:`, JSON.stringify(releases).slice(0, 200));
            console.error(`Unexpected response format for ${repoName}:`, releases);
            throw new Error(`Expected array of releases but got ${typeof releases}`);
        }

        if (releases.length === 0) {
            throw new Error(`No releases found for ${repoName}`);
        }

        const highestVersion = releases
            .filter(item => !item.prerelease) // remove pre-release items
            .map(item => item.tag_name)       // keep only the tag_name
            .sort()                           // sort items alphabetically – ascending
            .pop()                            // the last item contains the highest version (what we need)
            .replace('v', '')                 // remove the v from the name "v1.26.1" => "1.26.1"

        console.log(`${repoName} ${highestVersion}`);
        return highestVersion;
    } catch (error) {
        console.error(`Error fetching version for ${repoName}:`, error);
        // Maybe return a default version or rethrow depending on your needs
        throw error;
    }
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
