export default function PostsContainer({ posts, commentData, children }) {
    return (
        <div className="posts-container">
            <h2>Posts ({posts?.length || 0})</h2>
            {posts?.length === 0 ? (
                <div className="no-posts">No posts available</div>
            ) : (
                <div className="posts-grid">
                    {children}
                </div>
            )}
        </div>
    )
}
