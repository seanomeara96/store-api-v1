// Dependencies: axios@^0.27.2
import axios from "axios";

const googlePlacesApiKey = process.env.PLACES_API_KEY; // Replace with your actual API key

const fetchGoogleReviews = async (): Promise<GoogleReview[]> => {
  try {
    const placeId = "ChIJMSFFIiqmZ0gRdFAFJPsCBAw";
    const reviewsUrl = `https://maps.googleapis.com/maps/api/place/details/json&place_id=${placeId}&fields=reviews&key=${googlePlacesApiKey}`;

    const reviewsResponse = await axios.get(reviewsUrl);
    
    const reviewsData = reviewsResponse.data;
    console.log("reviewsResponse", reviewsResponse.data)

    if (
      reviewsData.status === "OK" &&
      reviewsData.result &&
      reviewsData.result.reviews
    ) {
      return reviewsData.result.reviews
    } else {
      throw new Error("Failed to fetch reviews");
    }
  } catch (error) {
    throw error;
  }
};

interface GoogleReview {
  rating: number;
  text: string;
  authorName: string;
  timeCreated: Date;
}

(async () => {
  try {
    const reviews = await fetchGoogleReviews();
    console.log("Reviews:", reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
})();
