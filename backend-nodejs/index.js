const express = require('express');
const cors = require('cors');
const Corbado = require('@corbado/node-sdk');
require('dotenv').config()

const app = express();

// install the Corbado SDK for easy integration
const projectID = process.env.PROJECT_ID;
const apiSecret = process.env.API_SECRET;
const config = new Corbado.Configuration(projectID, apiSecret);
const corbado = new Corbado.SDK(config);

app.use(cors()); // handle CORS issue
app.use(express.json());

/* You need to define an own backend API endpoint that receives the email address / username and creates an association
token for this email address (which is also returned from the API endpoint and is used in the
 <corbado-passkey-associate/> web component */
app.post('/api/createAssociationToken', async (req, res) => {
    const {loginIdentifier, loginIdentifierType} = req.body;
    const clientInfo = corbado.utils.getClientInfo(req);

    try {
        // use the Corbado SDK to create the association token
        // see https://api.corbado.com/docs/api/#tag/Association-Tokens/operation/AssociationTokenCreate) for details
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
