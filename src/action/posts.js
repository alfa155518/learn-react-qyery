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

<<<<<<< E:\learn-react-query\src\action\posts.js
export { getPost, createPost, getComments, createComment };
=======
// Update Post Function
async function updatePost(id, post) {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
    return response.json()
}

// Delete Post Function
async function deletePost(id) {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
    })
    return response.json()
}

// Update Comment Function
async function updateComment(id, comment) {
    const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment)
    })
    return response.json()
}

// Delete Comment Function
async function deleteComment(id) {
    const response = await fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE'
    })
    return response.json()
}

export { getPost, createPost, updatePost, deletePost, getComments, createComment, updateComment, deleteComment };
>>>>>>> c:\Users\PC\.windsurf\worktrees\learn-react-query\learn-react-query-881784d5\src\action\posts.js
