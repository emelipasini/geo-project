# Street Entity

This code defines a GraphQL schema and resolver functions for managing streets. GraphQL is a query language and runtime that allows clients to request specific data from a server. Let's break down what this code does:

1. The code defines the GraphQL schema using the `gql` function. The schema describes the available types, queries, and mutations that can be executed against the server.

2. The `typeDefs` constant defines the schema types. In this case, it defines a `Query` type with three fields: `activeStreetsCount`, `street`, and `streets`. It also defines a `Mutation` type with one field: `addStreet`. Additionally, it defines an enum type `DeletedStreets` with one value: `YES`. Lastly, it defines a `Street` type with several fields such as `id_via`, `nombre_oficial`, `fecha_alta`, and `fecha_baja`.

3. The `resolvers` constant defines the resolver functions that are responsible for fetching the data for each field defined in the schema.

4. Under the `Query` field, there are three resolver functions:

    - `activeStreetsCount` returns the total number of active streets by calling the `getActiveStreets` function and returning the length of the result.
    - `street` returns a specific street based on the provided `id_via` argument. It calls the `getStreets` function to retrieve all streets and then finds the street with the matching `id_via`.
    - `streets` returns a list of streets. If the `deleted` argument is provided, it calls the `getStreets` function to retrieve all streets. Otherwise, it calls the `getActiveStreets` function to retrieve only the active streets.

5. Under the `Mutation` field, there is one resolver function:

    - `addStreet` adds a new street to the system. It first checks if a street with the same `nombre_oficial` already exists by calling the `getStreets` function and searching for a match. If a match is found, it returns the existing street. Otherwise, it calls the `saveNewStreet` function to save the new street and returns it.

6. Under the `Street` field, there are two resolver functions:
    - `fecha_alta` formats the `fecha_alta` field of a street by converting it to a JavaScript `Date` object and returning it in a specific format.
    - `fecha_baja` formats the `fecha_baja` field of a street if it exists, otherwise it returns `null`.

Overall, this code provides a GraphQL API for querying and mutating street data. Clients can retrieve the count of active streets, fetch specific streets by ID, get a list of streets (either all or only active ones), and add new streets to the system. The resolvers handle the logic for fetching and manipulating the data before returning the results to the client.
