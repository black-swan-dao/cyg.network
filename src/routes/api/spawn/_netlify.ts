export const createSite = (id: string, subdomain: string) => {
    return new Promise(async (resolve, reject) => {
        const url = "https://api.netlify.com/api/v1/sites"
        const body = JSON.stringify({
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

export const createEnvVars = (id: string, siteId: string, auth0ClientId: string) => {
    return new Promise(async (resolve, reject) => {
        const url = "https://api.netlify.com/api/v1/accounts/pwrstudio/env?site_id=" + siteId
        const scopes = [
            "builds",
            "functions",
            "runtime",
            "post-processing"
        ]
        const body = JSON.stringify([
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
        ]);
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
        await fetch(url, options)
        resolve({})
    });
}

export const forceBuild = (siteId: string) => {
    return new Promise(async (resolve, reject) => {
        const url = "https://api.netlify.com/api/v1/sites/" + siteId + "/builds"
        const body = JSON.stringify({
            clear_cache: true
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
        await fetch(url, options)
        resolve({})
    });
}
