//? 1-Query Invalidation
// Make query invalid when mutation is successful
// ! EX:
// queryClient.invalidateQueries() Invalidate every query in the cache
// queryKey: ['todos', { page: 1 }], // queries below will be invalidated
// queryKey: ['todos', { type: 'done' }], // queries below will be invalidated
// queryClient.invalidateQueries({
//     queryKey: ['todos'],
//     exact: true,
// })  //  only invalidate todos queries that don't have any more variables or subkeys

