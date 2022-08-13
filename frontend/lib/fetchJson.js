export default async function fetchJson(input, init) {
    const response = await fetch(input, init)
    const data = await response.json()
    if (response.ok) {
        return data
    }
    throw "Error!"
}
