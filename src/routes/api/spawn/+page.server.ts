import { createNewInstance, updateInstance } from './_sanity.js';
import type { Body } from './types.js';
import { deployToNetlify } from './_netlify.js';
import { createAuth0App } from './_auth0.js';
import { addRecord } from './_godaddy.js';

export const actions = {
    default: async (event) => {
        const body: Body = await event.request.json()

        // 1. Create new instance on sanity server
        const id = await createNewInstance(body)
        console.log('1 __ id', id)

        // 2. Set up new app on auth0
        const auth0ClientId = await createAuth0App(id, body.subdomain)
        console.log('2 __ auth0ClientId', auth0ClientId)

        // 3. Deploy frontend from github to netlify
        const netlifySiteId = await deployToNetlify(id, body.subdomain, auth0ClientId)
        console.log('3 __ netlifySiteId', netlifySiteId)

        // 4. Redirect subdomain to netlify site
        await addRecord(id, body.subdomain)
        console.log('4 __ CNAME record set')

        // 5. Update instance in sanity
        const finalDoc = await updateInstance(id, netlifySiteId, auth0ClientId)
        console.log('5 __ finalDoc', finalDoc)

        return finalDoc;
    }
};