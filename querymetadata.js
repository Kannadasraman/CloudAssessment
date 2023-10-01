// Import the axios library for making HTTP requests.
const axios = require('axios');

// Function to retrieve Azure instance metadata.
async function fetchAzMetadata(dataKey) {
  // Define the URL for the Azure Metadata Service endpoint.
  const metadataUrl = 'http://169.254.169.254/metadata/instance/compute?api-version=2021-01-01&format=json';

  try {
    // Make an HTTP GET request to the metadata service.
    const response = await axios.get(metadataUrl, {
      // Set the 'Metadata' header to 'true' to request metadata.
      headers: {
        Metadata: 'true',
      },
    });

    // Parse the response JSON into metadata.
    const metadata = response.data;

    // If a specific data key is provided, check and return it.
    if (dataKey) {
      if (metadata[dataKey]) {
        const result = {};
        result[dataKey] = metadata[dataKey];
        return result;
      } else {
        // Return an error message if the key is not found.
        return { error: 'Key not found in metadata' };
      }
    }

    // Return all metadata if no specific key is requested.
    return metadata;
  } catch (error) {
    // Handle any errors that occur during the request.
    return { error: error.message };
  }
}

// Usage examples:

// Get all metadata and print it in a readable JSON format.

// fetchAzMetadata()
//   .then((metadata) => console.log(JSON.stringify(metadata, null, 2)))
//   .catch((error) => console.error(error));

// Get a specific data key individually (e.g., 'compute/location').
fetchAzMetadata('compute/location')
  .then((metadata) => console.log(JSON.stringify(metadata, null, 2)))
  .catch((error) => console.error(error));
