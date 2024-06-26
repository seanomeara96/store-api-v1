import { google } from 'googleapis';

// Initialize Google API client
const oauth2Client = new google.auth.OAuth2({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'YOUR_REDIRECT_URL',
});

// Set the access token
oauth2Client.setCredentials({
  access_token: 'YOUR_ACCESS_TOKEN',
  refresh_token: 'YOUR_REFRESH_TOKEN',
  // Optional: expiry_date
});

// Create a Google My Business client
const myBusinessClient = google.mybusiness({
  version: 'v4',
  auth: oauth2Client,
});

// Fetch reviews for a specific location
async function fetchReviews(locationId: string) {
  try {
    const response = await myBusinessClient.accounts.locations.reviews.list({
      name: `accounts/YOUR_ACCOUNT_ID/locations/${locationId}`,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    return null;
  }
}

// Example usage
const locationId = 'YOUR_LOCATION_ID';
fetchReviews(locationId)
  .then(reviews => {
    console.log('Reviews:', reviews);
  })
  .catch(error => {
    console.error('Error:', error);
  });
