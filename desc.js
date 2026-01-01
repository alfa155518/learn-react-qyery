//? 1-refetchOnWindowFocus
// If a user leaves your application and returns and the query data is stale, TanStack Query automatically requests fresh data for you in the background. You can disable this globally or per-query .

//! Example:
// refetchOnWindowFocus: false,
// defaultOptions: {
//     queries: {
//         refetchOnWindowFocus: false, // default: true
//     },
// },


//? 2-Disabling/Pausing Queries


//? 3-retry
// When a useQuery query fails(the query function throws an error), TanStack Query will automatically retry the query if that query's request has not reached the max number of consecutive retries (defaults to 3)

//*1 Setting retry = false will disable retries.
//*2 Setting retry = 6 will retry failing requests 6 times before showing the final error thrown by the function.
//*3 Setting retry = true will infinitely retry failing requests.
//*4 Setting retry = (failureCount, error) => ... allows for custom logic based on why the request failed.

//? 4-retryDelay
// By default, retries in TanStack Query do not happen immediately after a request fails.As is standard, a back - off delay is gradually applied to each retry attempt.

// The default retryDelay is set to double(starting at 1000ms) with each attempt
