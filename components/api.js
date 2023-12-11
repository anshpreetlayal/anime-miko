const API_URL = 'https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=';

export const fetchAnimeList = async () => {
  try {
    // Make an API call to fetch anime data using fetch API
    const response = await fetch(`${API_URL}4658`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch anime list');
    }

    // Parse the response as needed (depends on XML parsing)
    const data = await response.text(); // Modify this based on XML parsing

    return data;
  } catch (error) {
    throw new Error('Error fetching anime list');
  }
};
