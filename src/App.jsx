import { useQuery, useMutation } from "@tanstack/react-query"
import { useState } from "react"
import "./App.css"
import { createPost, getPost } from "./action/posts"



export default function App() {
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostViews, setNewPostViews] = useState("")

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => await getPost(),
  })

  const { mutateAsync, isPending, isError: mutationIsError, isSuccess, reset } = useMutation({
    mutationFn: createPost,
  })



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPostTitle.trim() && newPostViews.trim()) {
      try {
        await mutateAsync({
          title: newPostTitle,
          views: parseInt(newPostViews)
        });
        refetch();
        setNewPostTitle("")
        setNewPostViews("")
        reset();
      } catch (error) {
        alert('Mutation failed: ' + error.message);
      }
    }
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
            {data.map(post => (
              <div key={post.id} className="post-card">
                <h3 className="post-title">{post.title}</h3>
                <div className="post-views">{post.views} views</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

