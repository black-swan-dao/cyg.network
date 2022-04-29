import { NetlifyAPI } from 'netlify'

export const deployToNetlify = (id, subdomain, auth0ClientId) => {
    return new Promise(async (resolve, reject) => {
        // const NetlifyAPI = await import('netlify')
        const api = new NetlifyAPI(import.meta.env.VITE_NETLIFY_TOKEN)
        const site = await api.createSite({
            body: {
                name: id,
                custom_domain: subdomain + '.cyg.network',
                build_settings: {
                    cmd: 'yarn build',
                    dir: 'build',
                    env: {
                        VITE_CYGNET_ID: id,
                        VITE_AUTH0_CLIENT_ID: auth0ClientId,
                        VITE_AUTH0_DOMAIN: import.meta.env.VITE_AUTH0_DOMAIN,
                        VITE_SANITY_ID: import.meta.env.VITE_SANITY_ID,
                        VITE_SANITY_TOKEN: import.meta.env.VITE_SANITY_TOKEN,
                    }
                },
                repo: {
                    provider: "github",
                    repo: "black-swan-dao/cygnet-client",
                    private: false,
                    branch: "main",
                },
            }
        });
        resolve(site.id)
    });
}