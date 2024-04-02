import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
  const images = [
    require('../assets/cowboybebop.png'),
    require('../assets/bsd.jpg'),
    require('../assets/chainsawman.jpg'),
    require('../assets/ds.jpg'),
    require('../assets/hxh.jpg'),
    require('../assets/jjk.jpg'),
    require('../assets/nana.jpg'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/anime?q=&sfw');
        if (!response.ok) {
          throw new Error('Failed to fetch anime data');
        }
        const data = await response.json();
        setAnimeData(data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();

    const slideshowTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      fadeInAnimation.stop();
      pulseAnimation.stop();
      clearInterval(slideshowTimer);
    };
  }, [fadeAnim, pulseAnim, images.length]);

  const navigateToHome = () => {
    navigation.navigate('HomeScreen');
  };

  const navigateToSettings = () => {
    navigation.navigate('SettingsScreen');
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={navigateToSettings}>
          <Text style={styles.headerButton}>Settings</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.headerButton}>Home</Text>
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
      headerTitleAlign: 'center',
      headerTitle: () => (
        <Text style={[styles.headerText, { color: 'pink' }]}>anime-miko</Text>
      ),
    });
  }, [navigation, navigateToHome, navigateToSettings]);

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
      <View style={styles.animeContainer}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <AnimeList animeData={animeData} onPressItem={() => navigateToHome()} />
        )}
      </View>
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
    color: '#333',
  },
  headerButton: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: '#FFFF',
    fontWeight: 'bold',
  },
  animeContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
  },
});

export default IntroScreen;
