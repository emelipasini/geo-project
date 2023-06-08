# Street Service

This code provides utility functions for fetching and manipulating street data. Let's go through what each function does:

1. `fetchStreets` is an asynchronous function that makes a GET request to the API endpoint `/streets` using Axios. It retrieves the data and returns it as an array of streets. If an error occurs during the request, it throws an error with a message indicating the failure.

2. `getStreets` is an asynchronous function that calls `fetchStreets` to retrieve the streets. It then calls `addSectionsToStreets` to add the corresponding sections to each street. The function returns the streets with their associated sections. If an error occurs during the process, it throws an error with a message indicating the failure.

3. `getActiveStreets` is an asynchronous function that calls `getStreets` to retrieve all streets with their sections. It then filters the streets to include only the active ones, which are streets without a `fecha_baja` (end date). The function returns an array of active streets with their sections.

4. `addSectionsToStreets` is an asynchronous function that takes an array of streets as input. It makes a GET request to the API endpoint `/sections` using Axios to retrieve all sections. It then iterates over each street and filters the sections to find the ones that match the street's `id_via`. The matching sections are assigned to the `tramos` property of the street. The function returns an array of streets with their corresponding sections. If an error occurs during the process, it throws an error with a message indicating the failure.

5. `saveNewStreet` is an asynchronous function that takes a name as input. It first calls `fetchStreets` to retrieve the current list of streets. It then determines the maximum `id_via` value from the existing streets and generates a new street object with the provided name, a new `id_via`, the current date as `fecha_alta`, and no `fecha_baja`. The new street object is sent in a POST request to the API endpoint `/streets` using Axios. The function returns the newly created street. If an error occurs during the process, it throws an error with a message indicating the failure.

These utility functions provide the necessary functionality to fetch streets and their sections, add sections to streets, retrieve active streets, and save new streets with the associated data. They handle the communication with the API endpoints and perform the necessary data transformations before returning the results or throwing appropriate error messages in case of failures.
