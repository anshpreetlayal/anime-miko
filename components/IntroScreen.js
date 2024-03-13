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
          <Text style={styles.headerButton}>Settings</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={styles.headerButton}>Home</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, navigateToHome, navigateToSettings]);



export default IntroScreen;
