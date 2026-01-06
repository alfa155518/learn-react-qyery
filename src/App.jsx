import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { createPost, getComments, getPost, createComment } from "./action/posts"
import "./App.css"



export default function App() {
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostViews, setNewPostViews] = useState("")
  const [newCommentText, setNewCommentText] = useState("")
  const [selectedPostId, setSelectedPostId] = useState(null)
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
      // queryClient.invalidateQueries({
      //   queryKey: ['ClientPosts']
      // })
      queryClient.invalidateQueries({
        queryKey: ['ClientPosts'],
        exact: true,
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['ClientPosts', { type: 'done' }],
      // })
    },
    onError: (error) => {
      alert('Error creating comment: ' + error.message);
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

      <form onSubmit={handleSubmit} className="post-form">
        <h2>Create New Post</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            placeholder="Enter views"
            value={newPostViews}
            onChange={(e) => setNewPostViews(e.target.value)}
            className="form-input"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="submit-btn"
        >
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
        {mutationIsError && (
          <div className="error">Error creating post. Please try again.</div>
        )}
        {isSuccess && (
          <div className="success">Post created successfully!</div>
        )}
      </form>

      <div className="posts-container">
        <h2>Posts ({data?.length || 0})</h2>
        {data?.length === 0 ? (
          <div className="no-posts">No posts available</div>
        ) : (
          <div className="posts-grid">
            {data.map(post => {
              const postComments = getCommentsForPost(post.id)
              return (
                <div key={post.id} className="post-card">
                  <h3 className="post-title">{post.title}</h3>
                  <div className="post-views">{post.views} views</div>
                  <div className="post-comments">
                    <div className="comments-header">
                      <span className="comments-count">{postComments.length} comments</span>
                      <button
                        onClick={() => setSelectedPostId(selectedPostId === post.id ? null : post.id)}
                        className="add-comment-btn"
                      >
                        {selectedPostId === post.id ? 'Cancel' : 'Add Comment'}
                      </button>
                    </div>

                    {selectedPostId === post.id && (
                      <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          className="comment-input"
                        />
                        <button
                          type="submit"
                          disabled={commentMutation.isPending}
                          className="comment-submit-btn"
                        >
                          {commentMutation.isPending ? 'Posting...' : 'Post'}
                        </button>
                      </form>
                    )}

                    {postComments.length > 0 && (
                      <div className="comments-list">
                        {postComments.map(comment => (
                          <div key={comment.id} className="comment-item">
                            <p className="comment-text">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

