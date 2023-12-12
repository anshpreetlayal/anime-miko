import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AnimeList from '../components/AnimeList';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchAnimeList();
      setAnimeData(data); 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePressItem = (screenName, animeId) => {
    if (screenName === 'Details') {
      navigation.navigate(screenName, { animeId });
    } else if (screenName === 'Settings') {
      navigation.navigate(screenName);
    }
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={navigateToSettings} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Settings</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <AnimeList animeData={animeData} onPressItem={handlePressItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default HomeScreen;