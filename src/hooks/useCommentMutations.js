import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment, updateComment, deleteComment } from "../action/posts"

export function useCreateComment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ClientComments'],
            })
        },
        onError: (error) => {
            alert('Error creating comment: ' + error.message);
        },
    })
}

export function useUpdateComment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, comment }) => updateComment(id, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ClientComments'],
            })
        },
        onError: (error) => {
            alert('Error updating comment: ' + error.message);
        },
    })
}

export function useDeleteComment() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['ClientComments'],
            })
        },
        onError: (error) => {
            alert('Error deleting comment: ' + error.message);
        },
    })
}
