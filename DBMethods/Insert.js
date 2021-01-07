const express = require('express');
const app = express()

const insert = () => {
    app.get('/insert', async (request, response) => {
        let countryName = request.query.name;
        Countries.insertMany({ name: countryName });
    })
}

exports.insert = insert