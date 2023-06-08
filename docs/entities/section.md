# Section Entity

This code defines a GraphQL schema and resolver functions for managing sections. Let's break down what this code does:

1. The code defines the GraphQL schema using the `gql` function. The schema describes the available types, queries, and enums that can be executed against the server.

2. The `typeDefs` constant defines the schema types. In this case, it defines a `Query` type with four fields: `activeSectionsCount`, `section`, `sectionsByStreet`, and `sections`. It also defines an enum type `DeletedSections` with one value: `YES`. Lastly, it defines a `Section` type with several fields such as `id_tramo`, `id_via`, `alt_izqini`, `alt_derini`, `alt_izqfin`, `alt_derfin`, `altura_derecha`, `altura_izquierda`, `geom`, `fecha_alta`, and `fecha_baja`.

3. The `resolvers` constant defines the resolver functions that are responsible for fetching the data for each field defined in the schema.

4. Under the `Query` field, there are four resolver functions:

    - `activeSectionsCount` returns the total number of active sections by calling the `getActiveSections` function and returning the length of the result.
    - `section` returns a specific section based on the provided `id_tramo` argument. It calls the `getSections` function to retrieve all sections and then finds the section with the matching `id_tramo`.
    - `sectionsByStreet` returns a list of sections for a specific street based on the provided `id_via` argument. It calls the `getSections` function to retrieve all sections and then filters the sections to include only those that have the matching `id_via`.
    - `sections` returns a list of sections. If the `deleted` argument is provided, it calls the `getSections` function to retrieve all sections. Otherwise, it calls the `getActiveSections` function to retrieve only the active sections.

5. Under the `Section` field, there are several resolver functions:
    - `altura_izquierda` formats the `altura_izquierda` field of a section by combining the `alt_izqini` and `alt_izqfin` values.
    - `altura_derecha` formats the `altura_derecha` field of a section by combining the `alt_derini` and `alt_derfin` values.
    - `fecha_alta` formats the `fecha_alta` field of a section by converting it to a JavaScript `Date` object and returning it in a specific format.
    - `fecha_baja` formats the `fecha_baja` field of a section if it exists, otherwise it returns `null`.

Overall, this code provides a GraphQL API for querying section data. Clients can retrieve the count of active sections, fetch specific sections by ID, get a list of sections for a specific street, and get a list of all sections. The resolvers handle the logic for fetching and manipulating the data before returning the results to the client.
