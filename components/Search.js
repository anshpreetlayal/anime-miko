import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${query}&sfw`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // to add API key here
            'Authorization': 'Bearer YOUR_API_KEY',
          },
        }
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }}>
      <Text>{item.title}</Text>
      <Text>{item.genres.map((genre) => genre.name).join(', ')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Search anime..."
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        onSubmitEditing={() => handleSearch(searchQuery)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No results found</Text>}
        />
      )}
    </View>
  );
};



export default Search;
