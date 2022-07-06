// import { createNewInstance, updateInstance } from './_sanity.js';
// import { deployToNetlify } from './_netlify.js';
// import { createAuth0App } from './_auth0.js';
// import { addRecord } from './_godaddy.js';
// import FormData from 'form-data';

export const post = async (event) => {
    const REDIRECT_URI = "https://cyg-network.netlify.app/slack-bot-install"
    const body = await event.request.json()
    console.log(body)
    console.log(body.code)

    // app.client.oauth.v2.access
    // const result = await slackClient.oauth.v2.access({code: body.code, redirect_uri: REDIRECT_URI, })
    // curl - F code = 1234 - F client_id = 3336676.569200954261 - F client_secret = ABCDEFGH https://slack.com/api/oauth.v2.access
    const base_url = "https://slack.com/api/oauth.v2.access"

    const url = base_url +
        '?client_id=' + import.meta.env.VITE_SLACK_CLIENT_ID +
        '&client_secret=' + import.meta.env.VITE_SLACK_CLIENT_SECRET +
        '&redirect_uri=' + REDIRECT_URI +
        '&code=' + body.code

    const response = await fetch(url, {
        method: "POST",
        redirect: 'follow'
    })

    const res = await response.text()

    // encrypt token
    // write auth token to sanity
    // response.team.id
    // response.access_token

    return {
        body: res
    };


};