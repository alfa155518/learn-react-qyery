import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPost, updatePost, deletePost } from "../action/posts"

export function useCreatePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ClientPosts'],
            })
        },
        onError: (error) => {
            alert('Error creating post: ' + error.message);
        },
    })
}

export function useUpdatePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, post }) => updatePost(id, post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ClientPosts'],
            })
        },
        onError: (error) => {
            alert('Error updating post: ' + error.message);
        },
    })
}

export function useDeletePost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ClientPosts'],
            })
        },
        onError: (error) => {
            alert('Error deleting post: ' + error.message);
        },
    })
}
