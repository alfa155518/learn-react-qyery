import { useQuery } from "@tanstack/react-query"

export default function App() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['ClientPosts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/posts')
      return response.json()
    }
    // queryFn: () => getPost()
    // queryFn: getPost
  })

  // Get Post Function
  // async function getPost() {
  //   const response = await fetch('http://localhost:3000/posts')
  //   return response.json()
  // }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    alert("Worng")
  }

  console.log(data)

  return (
    <>
      {
        data.map(post => {
          return <div key={post.id}>{post.title}</div>
        })
      }
    </>
  )
}