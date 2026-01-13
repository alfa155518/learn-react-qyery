// Get Post Function
async function getPost() {
    try {
        const response = await fetch(`http://localhost:3000/posts`)
        if (!response.ok) {
            throw new Error(`Failed to fetch posts: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error fetching posts:', error)
        throw error
    }
}

// Create Post Function
async function createPost(post) {
    try {
        const response = await fetch(`http://localhost:3000/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })
        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error creating post:', error)
        throw error
    }
}

// Get Comments Function
async function getComments() {
    try {
        const response = await fetch(`http://localhost:3000/comments`)
        if (!response.ok) {
            throw new Error(`Failed to fetch comments: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error fetching comments:', error)
        throw error
    }
}

// Create Comment Function
async function createComment(comment) {
    try {
        const response = await fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment)
        })
        if (!response.ok) {
            throw new Error(`Failed to create comment: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error creating comment:', error)
        throw error
    }
}

// Update Post Function
async function updatePost(id, post) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        })
        if (!response.ok) {
            throw new Error(`Failed to update post: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error updating post:', error)
        throw error
    }
}

// Delete Post Function
async function deletePost(id) {
    try {
        const response = await fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`Failed to delete post: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error deleting post:', error)
        throw error
    }
}

// Update Comment Function
async function updateComment(id, comment) {
    try {
        // First get the existing comment to preserve its data
        const getResponse = await fetch(`http://localhost:3000/comments/${id}`)
        if (!getResponse.ok) {
            throw new Error(`Failed to fetch comment: ${getResponse.status}`)
        }
        const existingComment = await getResponse.json()

        // Update only the text field, preserve other fields
        const updatedComment = {
            ...existingComment,
            text: comment.text
        }

        const response = await fetch(`http://localhost:3000/comments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedComment)
        })
        if (!response.ok) {
            throw new Error(`Failed to update comment: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error updating comment:', error)
        throw error
    }
}

// Delete Comment Function
async function deleteComment(id) {
    try {
        const response = await fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error(`Failed to delete comment: ${response.status}`)
        }
        return response.json()
    } catch (error) {
        console.error('Error deleting comment:', error)
        throw error
    }
}

export { getPost, createPost, updatePost, deletePost, getComments, createComment, updateComment, deleteComment };