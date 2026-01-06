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

// Get Comments Function
async function getComments() {
    const response = await fetch(`http://localhost:3000/comments`)
    return response.json()
}

// Create Comment Function
async function createComment(comment) {
    const response = await fetch(`http://localhost:3000/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    })
    return response.json()
}

export { getPost, createPost, getComments, createComment };