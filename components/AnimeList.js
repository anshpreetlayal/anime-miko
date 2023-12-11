import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const AnimeList = ({ animeData, onPressItem }) => {
  // Render each anime title as a list item
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressItem(item.id)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={animeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AnimeList;
