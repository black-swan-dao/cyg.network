export const deployToNetlify = (id, subdomain, auth0ClientId) => {
    return new Promise(async (resolve, reject) => {
        const url = "https://api.netlify.com/api/v1/sites"
        const body = JSON.stringify({
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
                stop_builds: false
            },
        })
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + import.meta.env.VITE_NETLIFY_TOKEN);
        myHeaders.append("Content-Type", "application/json");
        console.log(myHeaders)
        const options = {
            method: "POST",
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };
        const response = await fetch(url, options)
        const site = await response.json()
        console.log(site)
        resolve(site.id)
    });
}