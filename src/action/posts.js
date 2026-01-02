// Get Post Function
async function getPost() {
    const response = await fetch(`http://localhost:3000/posts`)
    return response.json()
}

// Create Post Function
async function createPost(post) {
    const response = await fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    return response.json()
}

export { getPost, createPost };