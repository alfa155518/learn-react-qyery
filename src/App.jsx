import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { createPost, getComments, getPost, createComment, updatePost, deletePost, updateComment, deleteComment } from "./action/posts"
import PostForm from "./components/PostForm"
import PostCard from "./components/PostCard"
import PostsContainer from "./components/PostsContainer"
import "./App.css"



export default function App() {
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostViews, setNewPostViews] = useState("")
  const [newCommentText, setNewCommentText] = useState("")
  const [selectedPostId, setSelectedPostId] = useState(null)
  const [editingPostId, setEditingPostId] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null)
  const [editPostTitle, setEditPostTitle] = useState("")
  const [editPostViews, setEditPostViews] = useState("")
  const [editCommentText, setEditCommentText] = useState("")
  const queryClient = useQueryClient()




  // queryClient.invalidateQueries()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => await getPost(),
  })

  const { data: commentData } = useQuery({
    queryKey: ['ClientPosts', { type: 'done' }],
    queryFn: async () => await getComments(),
  })


  const { mutate, isPending, isError: mutationIsError, isSuccess, reset } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setNewPostTitle("")
      setNewPostViews("")
      reset();

    },
  })


  const commentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setNewCommentText("")
      setSelectedPostId(null)
      queryClient.invalidateQueries({
        queryKey: ['ClientPosts'],
        exact: true,
      })
    },
    onError: (error) => {
      alert('Error creating comment: ' + error.message);
    },
  })

  const updatePostMutation = useMutation({
    mutationFn: ({ id, post }) => updatePost(id, post),
    onSuccess: () => {
      setEditingPostId(null)
      setEditPostTitle("")
      setEditPostViews("")
      queryClient.invalidateQueries({
        queryKey: ['ClientPosts'],
        exact: true,
      })
    },
    onError: (error) => {
      alert('Error updating post: ' + error.message);
    },
  })

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ClientPosts'],
        exact: true,
      })
    },
    onError: (error) => {
      alert('Error deleting post: ' + error.message);
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, comment }) => updateComment(id, comment),
    onSuccess: () => {
      setEditingCommentId(null)
      setEditCommentText("")
      queryClient.invalidateQueries({
        queryKey: ['ClientPosts'],
        exact: true,
      })
    },
    onError: (error) => {
      alert('Error updating comment: ' + error.message);
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ClientPosts'],
        exact: true,
      })
    },
    onError: (error) => {
      alert('Error deleting comment: ' + error.message);
    },
  })



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPostTitle.trim() && newPostViews.trim()) {
      mutate({
        title: newPostTitle,
        views: parseInt(newPostViews)
      });
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (newCommentText.trim() && selectedPostId) {
      commentMutation.mutate({
        text: newCommentText,
        postId: selectedPostId
      });
    }
  }

  const handleEditPost = (post) => {
    setEditingPostId(post.id)
    setEditPostTitle(post.title)
    setEditPostViews(post.views.toString())
  }

  const handleUpdatePost = (e) => {
    e.preventDefault()
    if (editPostTitle.trim() && editPostViews.trim() && editingPostId) {
      updatePostMutation.mutate({
        id: editingPostId,
        post: {
          title: editPostTitle,
          views: parseInt(editPostViews)
        }
      });
    }
  }

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  }

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id)
    setEditCommentText(comment.text)
  }

  const handleUpdateComment = (e) => {
    e.preventDefault()
    if (editCommentText.trim() && editingCommentId) {
      updateCommentMutation.mutate({
        id: editingCommentId,
        comment: {
          text: editCommentText
        }
      });
    }
  }

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteCommentMutation.mutate(commentId);
    }
  }

  const getCommentsForPost = (postId) => {
    return commentData?.filter(comment => comment.postId === postId) || []
  }


  if (isLoading) {
    return <div className="loading">Loading posts...</div>
  }

  if (isError) {
    return <div className="error">There is an error loading posts. Please try again later.</div>
  }

  return (
    <div className="app">
      <h1>React Query Course</h1>

      <PostForm
        newPostTitle={newPostTitle}
        newPostViews={newPostViews}
        setNewPostTitle={setNewPostTitle}
        setNewPostViews={setNewPostViews}
        handleSubmit={handleSubmit}
        isPending={isPending}
        isError={mutationIsError}
        isSuccess={isSuccess}
      />

      <PostsContainer posts={data} commentData={commentData}>
        {data?.map(post => {
          const postComments = getCommentsForPost(post.id)
          return (
            <PostCard
              key={post.id}
              post={post}
              comments={postComments}
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              onAddComment={commentMutation}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              editingPostId={editingPostId}
              editingCommentId={editingCommentId}
              editPostTitle={editPostTitle}
              editPostViews={editPostViews}
              editCommentText={editCommentText}
              setEditPostTitle={setEditPostTitle}
              setEditPostViews={setEditPostViews}
              setEditCommentText={setEditCommentText}
<<<<<<< E:\learn-react-query\src\App.jsx
=======
              setEditingPostId={setEditingPostId}
              setEditingCommentId={setEditingCommentId}
>>>>>>> c:\Users\PC\.windsurf\worktrees\learn-react-query\learn-react-query-881784d5\src\App.jsx
              updatePostMutation={updatePostMutation}
              deletePostMutation={deletePostMutation}
              updateCommentMutation={updateCommentMutation}
              deleteCommentMutation={deleteCommentMutation}
              selectedPostId={selectedPostId}
              setSelectedPostId={setSelectedPostId}
              newCommentText={newCommentText}
              setNewCommentText={setNewCommentText}
              handleUpdatePost={handleUpdatePost}
              handleUpdateComment={handleUpdateComment}
              handleCommentSubmit={handleCommentSubmit}
            />
          )
        })}
      </PostsContainer>
    </div>
  )
}

