# Section service

This code provides utility functions for fetching and manipulating section data. Let's examine each function:

1. `getSections` is an asynchronous function that makes a GET request to the API endpoint `/sections` using Axios. It retrieves the section data and returns it as an array of sections. If an error occurs during the request, it throws an error with a message indicating the failure.

2. `getActiveSections` is an asynchronous function that calls `getSections` to retrieve all sections. It then calls `addStreetsToSections` to add the corresponding streets to each section. The function filters the sections to include only the active ones, which are sections without a `fecha_baja` (end date). It returns an array of active sections with their associated streets.

3. `addStreetsToSections` is an asynchronous function that takes an array of sections as input. It makes a GET request to the API endpoint `/streets` using Axios to retrieve all streets. It then iterates over each section and finds the street that matches the section's `id_via`. The matching street is assigned to the `id_via` property of the section. The function returns an array of sections with their corresponding streets. If an error occurs during the process, it throws an error with a message indicating the failure.

These utility functions provide the necessary functionality to fetch sections, add streets to sections, and retrieve active sections with their associated streets. They handle the communication with the API endpoints and perform the necessary data transformations before returning the results or throwing appropriate error messages in case of failures.
