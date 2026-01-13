import React from "react"

export default function PostCard({
    post,
    comments,
    onEditPost,
    onDeletePost,
    onAddComment,
    onEditComment,
    onDeleteComment,
    postActions,
    updatePostMutation,
    deletePostMutation,
    updateCommentMutation,
    deleteCommentMutation,
    handleUpdatePost,
    handleUpdateComment,
    handleCommentSubmit
}) {
    return (
        <div className="post-card">
            {postActions.editingPostId === post.id ? (
                <form onSubmit={handleUpdatePost} className="edit-post-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Enter post title"
                            value={postActions.editPostTitle}
                            onChange={(e) => postActions.setEditPostTitle(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Enter views"
                            value={postActions.editPostViews}
                            onChange={(e) => postActions.setEditPostViews(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="edit-buttons">
                        <button
                            type="submit"
                            disabled={updatePostMutation.isPending}
                            className="save-btn"
                        >
                            {updatePostMutation.isPending ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={() => postActions.setEditingPostId(null)}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="post-header">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="post-actions">
                            <button
                                onClick={() => onEditPost(post)}
                                className="edit-btn"
                                title="Edit post"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onDeletePost(post.id)}
                                disabled={deletePostMutation.isPending}
                                className="delete-btn"
                                title="Delete post"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                    <div className="post-views">{post.views} views</div>
                </>
            )}

            <div className="post-comments">
                <div className="comments-header">
                    <span className="comments-count">{comments.length} comments</span>
                    <button
                        onClick={() => postActions.setSelectedPostId(postActions.selectedPostId === post.id ? null : post.id)}
                        className="add-comment-btn"
                    >
                        {postActions.selectedPostId === post.id ? 'Cancel' : 'Add Comment'}
                    </button>
                </div>

                {postActions.selectedPostId === post.id && (
                    <form onSubmit={handleCommentSubmit} className="comment-form">
                        <input
                            type="text"
                            placeholder="Write a comment..."
                            value={postActions.newCommentText}
                            onChange={(e) => postActions.setNewCommentText(e.target.value)}
                            className="comment-input"
                        />
                        <button
                            type="submit"
                            disabled={onAddComment.isPending}
                            className="comment-submit-btn"
                        >
                            {onAddComment.isPending ? 'Posting...' : 'Post'}
                        </button>
                    </form>
                )}

                {comments.length > 0 && (
                    <div className="comments-list">
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                postActions={postActions}
                                onEditComment={onEditComment}
                                onDeleteComment={onDeleteComment}
                                updateCommentMutation={updateCommentMutation}
                                deleteCommentMutation={deleteCommentMutation}
                                handleUpdateComment={handleUpdateComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function CommentItem({
    comment,
    postActions,
    onEditComment,
    onDeleteComment,
    updateCommentMutation,
    deleteCommentMutation,
    handleUpdateComment
}) {
    return (
        <div className="comment-item">
            {postActions.editingCommentId === comment.id ? (
                <form onSubmit={handleUpdateComment} className="edit-comment-form">
                    <input
                        type="text"
                        placeholder="Edit comment..."
                        value={postActions.editCommentText}
                        onChange={(e) => postActions.setEditCommentText(e.target.value)}
                        className="comment-input"
                    />
                    <div className="edit-buttons">
                        <button
                            type="submit"
                            disabled={updateCommentMutation.isPending}
                            className="save-btn"
                        >
                            {updateCommentMutation.isPending ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={() => postActions.setEditingCommentId(null)}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="comment-content">
                    <p className="comment-text">{comment.text}</p>
                    <div className="comment-actions">
                        <button
                            onClick={() => onEditComment(comment)}
                            className="edit-btn"
                            title="Edit comment"
                        >
                            ✏️
                        </button>
                        <button
                            onClick={() => onDeleteComment(comment.id)}
                            disabled={deleteCommentMutation.isPending}
                            className="delete-btn"
                            title="Delete comment"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
