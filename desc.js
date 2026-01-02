//? 1-Mutations
// Unlike queries, mutations are typically used to create/update/delete data or perform server side-effects. For this purpose, TanStack Query exports a useMutation hook.


//* IMPORTANT: The mutate function is an asynchronous function, which means you cannot use it directly in an event callback in React 16 and earlier.
// If you need to access the event in onSubmit you need to wrap mutate in another function.


//? 2-Mutation Side Effects
// useMutation comes with some helper options that allow quick and easy side-effects at any stage during the mutation lifecycle.
// These include onSuccess, onError, onSettled, and other callbacks.


//? 3-Resetting Mutation State
// It's sometimes the case that you need to clear the error or data of a mutation request. To do this, you can use the reset function to handle this:

