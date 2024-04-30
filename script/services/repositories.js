import { userUrlBase, maxItems } from '../variable.js'

async function getRepos(userName) {
    const response = await fetch(`${userUrlBase}/${userName}/repos?per_page=${maxItems}`)
    return await response.json()
}

export { getRepos }