import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const API_URL = 'https://api.jikan.moe/v4/anime?q=&sfw';

const AnimeDetailsScreen = ({ route }) => {
  const [animeDetails, setAnimeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const animeId = route.params.animeId;
    fetchAnimeDetails(animeId);

    async function fetchAnimeDetails(animeId) {
      try {
        const response = await fetch(`${API_URL}/${animeId}`); 
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAnimeDetails(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    }
  }, [route.params.animeId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={styles.errorText}>Failed to fetch data. Please try again later.</Text>
      ) : animeDetails ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image source={{ uri: animeDetails.images.jpg.image_url }} style={styles.image} />
          <Text style={styles.title}>{animeDetails.title}</Text>
          <Text style={styles.info}>Episodes: {animeDetails.episodes}</Text>
          <Text style={styles.info}>Type: {animeDetails.type}</Text>
          <Text style={styles.info}>Status: {animeDetails.status}</Text>
          <Text style={styles.info}>Rating: {animeDetails.rating}</Text>
          <Text style={styles.info}>Synopsis: {animeDetails.synopsis}</Text>
        </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
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
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AnimeDetailsScreen;
