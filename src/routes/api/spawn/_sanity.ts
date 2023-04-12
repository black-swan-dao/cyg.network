import { authorizedClient } from '../_authorizedClient.js';
import type { Body } from './types.js';
import { v4 as uuidv4 } from 'uuid'

export const createNewInstance = (body: Body) => {
    return new Promise(async (resolve, reject) => {
        const id = 'cygnet-' + body.subdomain + '-' + uuidv4().split('-')[0]
        let doc = {
            _type: 'instance',
            _id: id,
            title: body.title,
            subdomain: body.subdomain,
            mainColor: "#0000ff",
            highlightColor: "#41efc8",
            showEthConnection: false,
            connection: body.connection,
            discordGuildId: "",
            slackWorkspaceId: ""
        }

        if (body.connection == 'discord') {
            doc.discordGuildId = body.guildId || ""
        }

        if (body.connection == 'slack') {
            doc.slackWorkspaceId = body.slackWorkspaceId || ""
        }

        const result = await authorizedClient.createOrReplace(doc)
        resolve(result._id)
    });
}

export const updateInstance = (id: string, netlifySiteId: string, auth0ClientId: string) => {
    return new Promise(async (resolve, reject) => {
        const finalDoc = await authorizedClient
            .patch(id)
            .set({ auth0ClientId: auth0ClientId })
            .set({ netlifySiteId: netlifySiteId })
            .commit()
        resolve(finalDoc)
    });
}