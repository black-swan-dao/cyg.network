import { authorizedClient } from '../_authorizedClient.js';
import { loadData } from "$lib/modules/sanity.js"
import SimpleCrypto from "simple-crypto-js"

export const post = async (event) => {
    const REDIRECT_URI = "https://cyg-network.netlify.app/slack-bot-install"
    const body = await event.request.json()
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

    const res = await response.json()
    console.log(res)

    if (res.ok) {
        // encrypt token
        const simpleCrypto = new SimpleCrypto(import.meta.env.VITE_ENCRYPTION_SECRET)
        const encryptedToken = simpleCrypto.encrypt(res.access_token)
        console.log('encryptedToken', encryptedToken)
        console.log(simpleCrypto.decrypt(encryptedToken))

        // Write token to sanity
        const instance = await loadData("*[_type == 'instance' && slackWorkspaceId == $teamId][0]", { teamId: res.team.id })
        console.log('instance', instance)

        if (instance && instance._id) {
            const updatedInstance = await authorizedClient
                .patch(instance._id)
                .set({ slackToken: encryptedToken })
                .commit()
            console.log('updatedInstance', updatedInstance)
            return {
                body: updatedInstance
            };
        }

        return {
            body: res
        };

    } else {
        return {
            body: res
        };
    }

};