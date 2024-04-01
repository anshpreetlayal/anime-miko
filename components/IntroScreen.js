import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
  const images = [
    require('../assets/cowboybebop.png'),
    require('../assets/'), 
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    fadeInAnimation.start();
    pulseAnimation.start();

    const slideshowTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the interval as needed

    return () => {
      fadeInAnimation.stop();
      pulseAnimation.stop();
      clearInterval(slideshowTimer);
    };
  }, [fadeAnim, pulseAnim, images.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Step into anime-miko - Your gateway to an extensive collection of anime!
      </Text>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.Image
          source={images[currentImageIndex]}
          style={[styles.image, { transform: [{ scale: pulseAnim }] }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default IntroScreen;
