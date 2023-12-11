import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import AnimeList from '../components/AnimeList';
import { fetchAnimeList } from '../components/api';

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
    navigation.navigate('Details', { animeId });
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <AnimeList animeData={animeData} onPressItem={handlePressItem} />
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
