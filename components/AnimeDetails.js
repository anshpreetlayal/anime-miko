import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';

const API_URL = 'https://api.jikan.moe/v4/anime?q=&sfw';

const AnimeDetailsScreen = ({ route }) => {
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const animeId = route.params.animeId;
    fetchAnimeDetails(animeId);

    async function fetchAnimeDetails(animeId) {
      try {
        const response = await fetch(`${API_URL}/${animeId}`); 
        const data = await response.json();
        setAnimeDetails(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  }, [route.params.animeId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : animeDetails ? (
        <ScrollView>
          <Image source={{ uri: animeDetails.images.jpg.image_url }} style={styles.image} />
          <Text style={styles.title}>{animeDetails.title}</Text>
          <Text style={styles.info}>Episodes: {animeDetails.episodes}</Text>
          <Text style={styles.info}>Type: {animeDetails.type}</Text>
          <Text style={styles.info}>Status: {animeDetails.status}</Text>
          <Text style={styles.info}>Rating: {animeDetails.rating}</Text>
          <Text style={styles.info}>Synopsis: {animeDetails.synopsis}</Text>
=        </ScrollView>
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AnimeDetailsScreen;
