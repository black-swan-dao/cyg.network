import { loadData } from "$lib/modules/sanity.js"

export const get = async (request) => {
    // console.log('request', request.url.searchParams.get('code'))
    if (request.url.searchParams.get('code') !== import.meta.env.VITE_INVITATION_CODE) {
        return { status: 403 };
    }
    const page = await loadData("*[_id == 'general'][0]")
    const instances = await loadData("*[_type == 'instance']")
    return { body: { page: page.status === 404 ? 'ERROR' : page, instances: instances.status === 404 ? 'ERROR' : instances } };
};
