import { queryOptions, useQueries, useQuery, useSuspenseQuery } from "@tanstack/react-query"

export default function App() {

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['ClientPosts'],
  //   queryFn: async () => await getPost()
  // })

  function groups(id) {
    return queryOptions({
      queryKey: [id],
      queryFn: async () => await getPost()
    })
  }

  function groupsComments() {
    return queryOptions({
      queryKey: ["comments"],
      queryFn: async () => await getComments()
    })
  }

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

  const { data, isLoading } = useQuery(groups(1))

  const suspenseData = useSuspenseQuery(groups(5))

  const queriesData = useQueries({
    queries: [groups(1), groupsComments()],
  })

  console.log(queriesData[1].data)
  console.log(suspenseData.data)

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (isError) {
  //   alert("Worng")
  // }

  // console.log(data)

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