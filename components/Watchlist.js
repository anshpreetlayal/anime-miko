import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [newAnime, setNewAnime] = useState('');

  const addToWatchlist = () => {
    if (newAnime.trim() !== '') {
      setWatchlist([...watchlist, { id: Date.now(), title: newAnime }]);
      setNewAnime('');
    }
  };

  const removeItem = (id) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <Button title="Remove" onPress={() => removeItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Watchlist</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter anime title"
          onChangeText={setNewAnime}
          value={newAnime}
        />
        <Button title="Add" onPress={addToWatchlist} />
      </View>
      <FlatList
        data={watchlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.emptyText}>No anime in watchlist</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  emptyText: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Watchlist;
