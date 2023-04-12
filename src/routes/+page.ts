import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const page = await loadData("*[_id == 'general'][0]", {})
    return {
        page
    };
}