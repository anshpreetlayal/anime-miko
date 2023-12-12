import React, { useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, PanResponder, Animated } from 'react-native';

const AnimeList = ({ animeData, onPressItem }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
    },
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressItem(item.id)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'skyblue',
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      />

      <FlatList
        data={animeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default AnimeList;
