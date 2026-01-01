import { useQuery } from "@tanstack/react-query"



export default function App() {

  const placeholderPosts = [
    { "id": "1", "title": "placeholderPosts title", "views": 100 },
    { "id": "2", "title": "placeholderPosts another title", "views": 200 },
  ]

  // Get Post Function
  async function getPost() {
    const response = await fetch(`http://localhost:3000/posts`)
    return response.json()
  }


  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => await getPost(),
    placeholderData: placeholderPosts
  })



  if (isLoading) {
    return <div>Loading...</div>
  }

  // To Ensure it is placeholder data
  // if (isPlaceholderData) {
  //   return <div>Loading Placeholder Data...</div>
  // }

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
      </div>
    </>
  )
}

