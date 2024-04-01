import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Alert } from 'react-native';
import AnimeList from '../components/AnimeList';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/anime?q=&sfw');
      if (!response.ok) {
        throw new Error('Failed to fetch anime data');
      }
      const data = await response.json();
      setAnimeData(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch anime data. Please try again later.');
    }
  };

  const handlePressItem = (animeId) => {
    navigation.navigate('AnimeDetailsScreen', { animeId });
  };

  const handleFavoritePress = (animeId) => {
    console.log('Added to favorites:', animeId);
    //  logic here to add the anime with ID animeId to the favorites list
    //use state or AsyncStorage to store the favorites list
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : animeData.length === 0 ? (
        <Text style={styles.noDataText}>No anime data available.</Text>
      ) : (
        <AnimeList
          animeData={animeData}
          onPressItem={handlePressItem}
          onFavoritePress={handleFavoritePress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;
