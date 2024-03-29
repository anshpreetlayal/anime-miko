import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';

const Profile = () => {
  const [username, setUsername] = useState('JohnDoe'); // Initial username
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleSave = () => {
    setUsername(newUsername);
    setNewUsername('');
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={require('./profile.jpg')} // to be edited
          style={styles.profileImage}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      {editMode ? (
        <View style={styles.editProfile}>
          <TextInput
            style={styles.input}
            placeholder="Enter new username"
            onChangeText={setNewUsername}
            value={newUsername}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      ) : (
        <View style={styles.editButton}>
          <Button title="Edit Profile" onPress={() => setEditMode(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  editButton: {
    marginTop: 20,
  },
  editProfile: {
    marginTop: 20,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Profile;
