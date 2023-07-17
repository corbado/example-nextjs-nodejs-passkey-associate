const express = require('express');
const cors = require('cors');
const app = express();
const Corbado = require('@corbado/node-sdk');
require('dotenv').config()

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);

app.use(cors()); // handle CORS issue
app.use(express.json());

app.post('/api/createAssociationToken', async (req, res) => {

    console.log(req.body)
    const {loginIdentifier, loginIdentifierType} = req.body;
    const clientInfo = corbado.utils.getClientInfo(req);
    try {
        const associationToken = await corbado.associationTokens.create(loginIdentifier, loginIdentifierType, clientInfo);
        console.log("Result ist :", associationToken.data);
        res.send(associationToken?.data?.token).status(200);
    } catch (err) {
        console.log(err)
        res.send("Error occured.").status(500);
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
