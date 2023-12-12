import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.loop(
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
    ).start();
  }, [fadeAnim, pulseAnim]);

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
          <Text style={[styles.headerButton, { fontFamily: 'Georgia' }]}>Settings</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={[styles.headerButton, { fontFamily: 'Georgia' }]}>Home</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, navigateToHome, navigateToSettings]);



  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> Step into anime-miko - Your gateway to an extensive collection of anime! </Text>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.Image
          source={require('../assets/cowboybebop.png')}
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
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: 900,
    height: 600,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
   headerButton: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#FFFFFF',
  },
});

export default IntroScreen;