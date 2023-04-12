import { loadData } from "$lib/modules/sanity"
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {

    // console.log('url', url.searchParams.get('code'))

    if (url.searchParams.get('code') !== import.meta.env.VITE_INVITATION_CODE) {
        throw error(403, 'not allowed');
    }

    const page = await loadData("*[_id == 'general'][0]", {})
    const instances = await loadData("*[_type == 'instance']", {})
    return {
        page,
        instances
    };
}
