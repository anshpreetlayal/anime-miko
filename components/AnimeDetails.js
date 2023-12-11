import React from 'react';
import { View, Text } from 'react-native';

const AnimeDetails = ({ anime }) => {
  return (
    <View>
      <Text>{anime.title}</Text>
      {/* Display other anime details here */}
    </View>
  );
};

export default AnimeDetails;
