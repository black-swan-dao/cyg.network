export const addRecord = (id: string, subdomain: string) => {
    return new Promise(async (resolve, reject) => {
        const url = "https://api.godaddy.com/v1/domains/cyg.network/records/"
        const authString = "sso-key " + import.meta.env.VITE_GODADDY_KEY + ":" + import.meta.env.VITE_GODADDY_SECRET
        const body = JSON.stringify([{
            data: id + '.netlify.app',
            name: subdomain,
            ttl: 3600,
            type: 'CNAME'
        }])
        const options = {
            method: "PATCH",
            headers: {
                'Authorization': authString, 'Content-type': 'application/json; charset=utf-8',
            },
            body: body
        };
        const response = await fetch(url, options)
        console.log(response)
        resolve(response)
    });
}