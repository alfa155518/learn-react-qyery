import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

// API imports
import { getPost, getComments } from "./action/posts"

// Hook imports
import { useCreatePost, useUpdatePost, useDeletePost } from "./hooks/usePostMutations"
import { useCreateComment, useUpdateComment, useDeleteComment } from "./hooks/useCommentMutations"
import { usePostActions } from "./hooks/usePostActions"

// Component imports
import PostForm from "./components/PostForm"
import PostCard from "./components/PostCard"
import PostsContainer from "./components/PostsContainer"

// Styles
import "./App.css"



export default function App() {
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostViews, setNewPostViews] = useState("")

  const postActions = usePostActions()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => await getPost(),
  })

  const { data: commentData } = useQuery({
    queryKey: ['ClientComments'],
    queryFn: async () => await getComments(),
  })

  const createPostMutation = useCreatePost()
  const commentMutation = useCreateComment()
  const updatePostMutation = useUpdatePost()
  const deletePostMutation = useDeletePost()
  const updateCommentMutation = useUpdateComment()
  const deleteCommentMutation = useDeleteComment()



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPostTitle.trim() && newPostViews.trim()) {
      createPostMutation.mutate({
        title: newPostTitle,
        views: parseInt(newPostViews)
      })
      setNewPostTitle("")
      setNewPostViews("")
    }
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (postActions.newCommentText.trim() && postActions.selectedPostId) {
      commentMutation.mutate({
        text: postActions.newCommentText,
        postId: postActions.selectedPostId
      })
      postActions.setNewCommentText("")
      postActions.setSelectedPostId(null)
    }
  }

  const handleEditPost = (post) => {
    postActions.handleEditPost(post)
  }

  const handleUpdatePost = (e) => {
    e.preventDefault()
    if (postActions.editPostTitle.trim() && postActions.editPostViews.trim() && postActions.editingPostId) {
      updatePostMutation.mutate({
        id: postActions.editingPostId,
        post: {
          title: postActions.editPostTitle,
          views: parseInt(postActions.editPostViews)
        }
      })
      postActions.resetEditPost()
    }
  }

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePostMutation.mutate(postId);
    }
  }

  const handleEditComment = (comment) => {
    postActions.handleEditComment(comment)
  }

  const handleUpdateComment = (e) => {
    e.preventDefault()
    if (postActions.editCommentText.trim() && postActions.editingCommentId) {
      updateCommentMutation.mutate({
        id: postActions.editingCommentId,
        comment: {
          text: postActions.editCommentText
        }
      })
      postActions.resetEditComment()
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
        isPending={createPostMutation.isPending}
        isError={createPostMutation.isError}
        isSuccess={createPostMutation.isSuccess}
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
              postActions={postActions}
              updatePostMutation={updatePostMutation}
              deletePostMutation={deletePostMutation}
              updateCommentMutation={updateCommentMutation}
              deleteCommentMutation={deleteCommentMutation}
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

