import { userUrlBase } from '../variable.js'

async function getUser(userName) {
    const response = await fetch(`${userUrlBase}/${userName}`) 
    return await response.json()
}

export { getUser }