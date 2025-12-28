//? 1-Query Options
// useQuery(groupOptions(1))
// useSuspenseQuery(groupOptions(5))
// useQueries({
//     queries: [groupOptions(1), groupOptions(2)],
// })

// ####################################

//? 2-Dependent Queries
//! In First
// status: 'pending'
// isPending: true
// fetchStatus: 'idle'
// As soon as the user is available, the projects query will be enabled and will then transition to:
//! In Second
// status: 'pending'
// isPending: true
// fetchStatus: 'fetching'
// Once we have the projects, it will go to:
//! In Third
// status: 'success'
// isPending: false
// fetchStatus: 'idle'



