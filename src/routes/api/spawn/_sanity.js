import { authorizedClient } from '../_authorizedClient.js';
import { v4 as uuidv4 } from 'uuid'

export const createNewInstance = body => {
    return new Promise(async (resolve, reject) => {
        const id = 'cygnet-' + body.subdomain + '-' + uuidv4().split('-')[0]
        let doc = {
            _type: 'instance',
            _id: id,
            title: body.title,
            subdomain: body.subdomain,
            discordGuildId: body.guildId,
            mainColor: "#0000ff",
            highlightColor: "#41efc8",
            showEthConnection: false
        }
        const result = await authorizedClient.createOrReplace(doc)
        resolve(result._id)
    });
}

export const updateInstance = (id, netlifySiteId, auth0ClientId) => {
    return new Promise(async (resolve, reject) => {
        const finalDoc = await authorizedClient
            .patch(id)
            .set({ auth0ClientId: auth0ClientId })
            .set({ netlifySiteId: netlifySiteId })
            .commit()
        resolve(finalDoc)
    });
}