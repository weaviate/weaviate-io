const express = require('express');
const { Client } = require('@notionhq/client');
const app = express();
const PORT = 8080;

// Initialize the Notion client with your integration token
const notionToken = 'secret_xChwt6INQaiaQhTdIK3DNyBLWNhkoVdw7Iv56FEnx5r';  // Ensure this is correct and active
const notion = new Client({ auth: notionToken });

const databaseId = 'bdddc4df8d7b44bea29bb247b287fa1a';  // Ensure no hyphens and it's shared with your integration

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/notion-data', async (req, res) => {
    try {
        console.log('Querying database:', databaseId);
        const response = await notion.databases.query({ database_id: databaseId });
        console.log('Data received:', response.results);
        res.json(response.results);
    } catch (error) {
        console.error('Error fetching from Notion:', error);
        res.status(500).send('Failed to fetch data from Notion');
    }
});

app.get('/', (req, res) => {
    res.send('Server is running. Use /notion-data to fetch data from Notion.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
