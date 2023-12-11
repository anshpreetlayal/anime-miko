import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AnimeList from '../components/AnimeList';
import { fetchAnimeList } from '../components/api'; // Corrected import path

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAnimeList();
        setAnimeData(data); // Modify this based on XML parsing
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
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
