import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { fetchAnimeList } from '../components/api';

const AnimeDetails = ({ anime }) => {
  return (
    <View>
      <Text>Title: {anime.title}</Text>
      <Text>Genres: {anime.genres.join(', ')}</Text>
      <Text>Episodes: {anime.episodes}</Text>
      <Text>Rating: {anime.rating}</Text>
    </View>
  );
};

const AnimeDetailsScreen = ({ route }) => {
  const [animeDetails, setAnimeDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const animeId = route.params.animeId;
        const animeData = await fetchAnimeList(animeId); 
        setAnimeDetails(animeData); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [route.params.animeId]);

  return (
    <View>
      {animeDetails ? (
        <AnimeDetails anime={animeDetails} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default AnimeDetailsScreen;
