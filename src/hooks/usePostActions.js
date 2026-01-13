import { useState } from "react"

export function usePostActions() {
    const [editingPostId, setEditingPostId] = useState(null)
    const [editingCommentId, setEditingCommentId] = useState(null)
    const [editPostTitle, setEditPostTitle] = useState("")
    const [editPostViews, setEditPostViews] = useState("")
    const [editCommentText, setEditCommentText] = useState("")
    const [selectedPostId, setSelectedPostId] = useState(null)
    const [newCommentText, setNewCommentText] = useState("")

    const handleEditPost = (post) => {
        setEditingPostId(post.id)
        setEditPostTitle(post.title)
        setEditPostViews(post.views.toString())
    }

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.id)
        setEditCommentText(comment.text)
    }

    const resetEditPost = () => {
        setEditingPostId(null)
        setEditPostTitle("")
        setEditPostViews("")
    }

    const resetEditComment = () => {
        setEditingCommentId(null)
        setEditCommentText("")
    }

    return {
        // State
        editingPostId,
        editingCommentId,
        editPostTitle,
        editPostViews,
        editCommentText,
        selectedPostId,
        newCommentText,

        // Setters
        setEditPostTitle,
        setEditPostViews,
        setEditCommentText,
        setSelectedPostId,
        setNewCommentText,
        setEditingCommentId,

        // Actions
        handleEditPost,
        handleEditComment,
        resetEditPost,
        resetEditComment
    }
}
