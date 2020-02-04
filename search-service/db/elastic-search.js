const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: process.env.ELASTIC_SEARCH_URI })

module.exports = esClient;