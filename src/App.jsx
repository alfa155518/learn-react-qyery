import { useQuery } from "@tanstack/react-query"


export default function App() {


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


  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => await getPost(),
    // refetchOnWindowFocus: false,
    retry: 5
  })



  const { data: commentsData, refetch } = useQuery({
    queryKey: ['ClientComments'],
    queryFn: async () => await getComments(),
    // Disabling/Pausing Queries
    enabled: false
  })


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>Ther is Error...</div>
  }



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
          isFetching ? <div>Loading comments...</div> : commentsData?.map(comment => <p key={comment.id}>{comment.text}</p>)
        }
        {/* Show When use Disabling/Pausing Queries*/}
        <button onClick={() => refetch()}>Refetch</button>
      </div>
    </>
  )
}

