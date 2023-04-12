import { NetlifyAPI } from 'netlify'

export const deployToNetlify = (id, subdomain, auth0ClientId) => {
    return new Promise(async (resolve, reject) => {

        const client = new NetlifyAPI(import.meta.env.VITE_NETLIFY_TOKEN)

        const site = await client.createSite({
            body: {
                name: id,
                custom_domain: subdomain + '.cyg.network',
                repo: {
                    provider: "github",
                    installation_id: import.meta.env.VITE_GITHUB_INSTALLATION_ID,
                    repo_url: "https://github.com/black-swan-dao/cygnet-client",
                    repo_path: "black-swan-dao/cygnet-client",
                    repo_branch: "main",
                    stop_builds: false,
                    cmd: "yarn build",
                    dir: "build",
                },
            },
        })

        const scopes = [
            "builds",
            "functions",
            "runtime",
            "post-processing"
        ]

        // Create Envs
        const envVars = [
            {
                key: "VITE_CYGNET_ID",
                scopes: scopes,
                values: [
                    {
                        id: "VITE_CYGNET_ID",
                        value: id,
                        context: "all"
                    }
                ]
            },
            {
                key: "VITE_AUTH0_CLIENT_ID",
                scopes: scopes,
                values: [
                    {
                        id: "VITE_AUTH0_CLIENT_ID",
                        value: auth0ClientId,
                        context: "all"
                    }
                ]
            },
            {
                key: "VITE_AUTH0_DOMAIN",
                scopes: scopes,
                values: [
                    {
                        id: "VITE_AUTH0_DOMAIN",
                        value: import.meta.env.VITE_AUTH0_DOMAIN,
                        context: "all"
                    }
                ]
            },
            {
                key: "VITE_SANITY_ID",
                scopes: scopes,
                values: [
                    {
                        id: "VITE_SANITY_ID",
                        value: import.meta.env.VITE_SANITY_ID,
                        context: "all"
                    }
                ]
            },
            {
                key: "VITE_SANITY_TOKEN",
                scopes: scopes,
                values: [
                    {
                        id: "VITE_SANITY_TOKEN",
                        value: import.meta.env.VITE_SANITY_TOKEN,
                        context: "all"
                    }
                ]
            }
        ]

        await client.createEnvVars({
            site_id: site.id,
            account_id: "pwrstudio",
            body: envVars
        })

        resolve(site.id)
    });
}