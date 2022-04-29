import { ManagementClient } from 'auth0';

export const createAuth0App = (id, subdomain) => {
    return new Promise(async (resolve, reject) => {
        const auth0 = new ManagementClient({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
            clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET
        });

        const whitelist = [
            "https://" + subdomain + ".cyg.network",
            "https://" + id + ".netlify.app",
            "http://localhost:3000"
        ]

        const data = {
            name: id,
            callbacks: whitelist,
            allowed_origins: whitelist,
            web_origins: whitelist,
            allowed_logout_urls: whitelist,
            app_type: "spa",
            token_endpoint_auth_method: "none",
        }

        const newClient = await auth0.createClient(data)
        resolve(newClient.client_id)
    });
}