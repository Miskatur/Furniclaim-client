export const setAuthtoken = user => {
    const currentUser = {
        email: user.email,
    }
    fetch(`https://furniclaim-server.vercel.app/jwt`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(currentUser)
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data.token)
        })
}