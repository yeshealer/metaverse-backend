const express = require("express")
const recordRoutes = express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid")

recordRoutes.route("/linkToken").post(function (req, response) {
    console.log('----------------------------')
    const configuration = new Configuration({
        basePath: PlaidEnvironments.sandbox,
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': req.body.client_id,
                'PLAID-SECRET': req.body.secret,
                'Plaid-Version': '2020-09-14',
            },
        },
    });
    const plaidClient = new PlaidApi(configuration);
    const request = {
        "client_id": req.body.client_id,
        "secret": req.body.secret,
        "user": {
            "client_user_id": req.body.client_id
        },
        "client_name": req.body.client_name,
        "products": req.body.products,
        "country_codes": req.body.country_codes,
        "language": req.body.language,
        "account_filters": {
            "depository": {
                "account_subtypes": req.body.account_subtypes
            }
        }
    };
    (async () => {
        try {
            const response_plaid = await plaidClient.linkTokenCreate(request);
            const linkToken = response_plaid.data.link_token;
            response.json(linkToken)
        } catch (error) {
            console.log(error)
        }
    })()
})

module.exports = recordRoutes;