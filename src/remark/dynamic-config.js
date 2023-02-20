const fetch = require('node-fetch');

const getSparkProperties = async () => {
    const response = await fetch(`https://api.github.com/repos/weaviate/spark-connector/releases/latest`)
    const sparkData = await response.json();
    
    const assets = sparkData.assets[0];

    return {
        download_url: assets.browser_download_url,
        file_name: assets.name
    };
}

const appendDynamicConfig = async (config) => {
    const spark = await getSparkProperties()
    config.spark_download_url = spark.download_url;
    config.spark_file_name = spark.file_name;
}

module.exports = {
    appendDynamicConfig
}