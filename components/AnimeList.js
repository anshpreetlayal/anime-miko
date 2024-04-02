import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AnimeList = ({ animeData, onPressItem, onFavoritePress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressItem(item.id)} style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <TouchableOpacity
        onPress={() => onFavoritePress(item.id)}
        style={styles.favoriteButton}
      >
        <Text style={styles.favoriteText}>Favorite</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={animeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  favoriteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AnimeList;
