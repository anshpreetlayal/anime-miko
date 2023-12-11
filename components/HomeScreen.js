import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AnimeList from '../components/AnimeList';
import { fetchAnimeList } from './api';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    // Fetch anime data using API
    fetchAnimeList()
      .then((data) => {
        setAnimeData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handlePressItem = (animeId) => {
    // Navigate to Details screen with animeId
    navigation.navigate('Details', { animeId });
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <AnimeList animeData={animeData} onPressItem={handlePressItem} />
      )}
    </View>
  );
};

export default HomeScreen;