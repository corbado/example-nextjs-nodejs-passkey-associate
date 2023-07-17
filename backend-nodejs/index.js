const express = require('express');
const cors = require('cors');
const Corbado = require('@corbado/node-sdk');
require('dotenv').config()

const app = express();

const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);

app.use(cors()); // handle CORS issue
app.use(express.json());

app.post('/api/createAssociationToken', async (req, res) => {
    const {loginIdentifier, loginIdentifierType} = req.body;
    const clientInfo = corbado.utils.getClientInfo(req);

    try {
        const associationToken = await corbado.associationTokens.create(loginIdentifier, loginIdentifierType, clientInfo);

        if (associationToken?.data?.token) {
            return res.status(200).send(associationToken.data.token);
        } else {
            return res.status(500).send({error: 'Association token creation unsuccessful'});
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({error: 'An error occurred while creating the association token'});
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
