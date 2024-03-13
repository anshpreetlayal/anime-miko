import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
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
      Alert.alert('Error', 'Failed to fetch anime data. Please try again later.');
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : animeData.length === 0 ? (
        <Text style={styles.noDataText}>No anime data available.</Text>
      ) : (
        <AnimeList animeData={animeData} onPressItem={handlePressItem} />
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
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default HomeScreen;