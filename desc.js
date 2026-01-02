//? 1-mutateAsync
// Use mutateAsync instead of mutate to get a promise which will resolve on success or throw on an error. This can for example be used to compose side effects.


// | mutate                 | mutateAsync         |
// | ---------------------  | ------------------- |
// | Doesn't return Promise | Returns Promise     |
// | Relies on callbacks    | Relies on `await`   |
// | Suitable for simple buttons | Suitable for complex logic |
// | No try/catch support   | Supports try/catch  |



//? 2-Mutation Scopes
// Per default, all mutations run in parallel - even if you invoke .mutate() of the same mutation multiple times. Mutations can be given a scope with an id to avoid that. All mutations with the same scope.id will run in serial

//* Example:
// const updateName = useMutation({
//     mutationFn: updateUserName,
//     scope: { id: 'user' }
// })

// const updateEmail = useMutation({
//     mutationFn: updateUserEmail,
//     scope: { id: 'user' }
// })