import { useQuery } from "@tanstack/react-query"
import { useState } from "react";

export default function App() {

  const [postId, setPostId] = useState(null);

  // Get Post Function
  async function getPost() {
    const response = await fetch('http://localhost:3000/posts')
    return response.json()
  }

  // Get Comments Function
  async function getComments() {
    const response = await fetch('http://localhost:3000/comments')
    return response.json()
  }


  const { data, isLoading } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => await getPost()
  })


  setTimeout(() => {
    setPostId(1);
  }, 3000);


  const { data: commentsData, isPending } = useQuery({
    queryKey: ['ClientComments'],
    queryFn: async () => await getComments(),
    enabled: !!postId,
  })


  if (isLoading) {
    return <div>Loading...</div>
  }


  console.log(commentsData)

  return (
    <>
      {
        data.map(post => {
          return <div key={post.id}>
            <span>
              {post.title}
            </span>
          </div>
        })
      }
      <div>
        {
          isPending ? <div>Loading comments...</div> : commentsData?.map(comment => <p key={comment.id}>{comment.text}</p>)
        }
      </div>
    </>
  )
}

