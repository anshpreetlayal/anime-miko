import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
} from 'react-native';

const SettingsScreen = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    if (!usernameOrEmail || !password) {
      setError('Please enter both username/email and password.');
      return;
    }
    setError('Login successful!');
    setUsernameOrEmail('');
    setPassword('');
    setModalVisible(true);
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
  
    navigation.navigate('HomeScreen'); 
  };

  return (
    <View style={darkTheme ? styles.darkContainer : styles.lightContainer}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Log In" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.optionContainer}>
        <Text>Dark Theme</Text>
        <Switch value={darkTheme} onValueChange={toggleTheme} />
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Log in successful!</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.link}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  lightContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  title: {
    fontSize: 30, 
    marginBottom: 20, 
    color: '#3F51B5', 
  },
  input: {
    height: 60, 
    borderColor: '#9E9E9E', 
    borderWidth: 4,
    marginBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#E0E0E0',
  },
  error: {
    color: '#FF1744', 
    marginBottom: 16, 
  },
  link: {
    color: '#2196F3', 
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18, 
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30, 
    paddingHorizontal: 60, 
    width: '100%',
  },
});

export default SettingsScreen;