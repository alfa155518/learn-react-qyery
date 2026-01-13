export default function PostForm({
    newPostTitle,
    newPostViews,
    setNewPostTitle,
    setNewPostViews,
    handleSubmit,
    isPending,
    isError,
    isSuccess
}) {
    return (
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
            {isError && (
                <div className="error">Error creating post. Please try again.</div>
            )}
            {isSuccess && (
                <div className="success">Post created successfully!</div>
            )}
        </form>
    )
}
