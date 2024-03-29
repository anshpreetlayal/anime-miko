import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { animeData, userHistory } from './data'; // Import mock data

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Simulate recommendation logic based on user history
    const recommendedAnime = getRecommendedAnime(userHistory);
    setRecommendations(recommendedAnime);
  }, []);

  const getRecommendedAnime = (history) => {
    // Simple recommendation logic based on user history
    const viewedAnimeIds = history.map((item) => item.animeId);
    const recommendedAnime = animeData.filter(
      (anime) => !viewedAnimeIds.includes(anime.id)
    );
    return recommendedAnime;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }}>
      <Text>{item.title}</Text>
      <Text>{item.genre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
        Recommended Anime
      </Text>
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Recommendation;
