export async function fetchChatroom(token: string) {
    const response = await fetch("https://localhost:8000/rooms", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'auth-token': token,
        },
        mode: 'cors', // no-cors, *cors, same-origin
    })
    const data = await response.json()
    return data;
}