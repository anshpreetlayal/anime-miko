import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FavoriteButton = ({ isFavorite, onPress }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handlePress = () => {
    setFavorite(!favorite);
    onPress(!favorite);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={styles.text}>{favorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default FavoriteButton;
