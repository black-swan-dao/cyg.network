import { createNewInstance, updateInstance } from './_sanity';
import type { Body } from './types';
import { createSite, createEnvVars, forceBuild } from './_netlify';
import { createAuth0App } from './_auth0';
import { addRecord } from './_godaddy';

export const actions = {
    default: async (event) => {
        const body: Body = await event.request.json()

        // 1. Create new instance on sanity server
        const id = await createNewInstance(body) as string
        console.log('1 __ id', id)

        // 2. Set up new app on auth0
        const auth0ClientId = await createAuth0App(id, body.subdomain) as string
        console.log('2 __ auth0ClientId', auth0ClientId)

        // 3. Deploy frontend from github to netlify
        const netlifySiteId = await createSite(id, body.subdomain) as string
        console.log('3 __ netlifySiteId', netlifySiteId)

        // 4. Create env vars on netlify
        await createEnvVars(id, netlifySiteId, auth0ClientId)
        console.log('4 __ env vars set', netlifySiteId)

        // 4. Redirect subdomain to netlify site
        await addRecord(id, body.subdomain)
        console.log('5 __ CNAME record set')

        // 5. Update instance in sanity
        const finalDoc = await updateInstance(id, netlifySiteId, auth0ClientId)
        console.log('6 __ finalDoc', finalDoc)

        // 6. Build again to make sure env vars are set
        await forceBuild(netlifySiteId);

        return finalDoc;
    }
};