import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Component for displaying contact details
const ContactDetails = ({ contact }) => {
  return (
    <View style={styles.contactDetailsContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}></View>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      </View>
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);

  const contactData = [
    { id: "1", name: "John Doe", phone: "123456789" },
    { id: "2", name: "Jane Doe", phone: "987654321" },
    // Add more contacts
  ];

  const handleSearch = () => {
    const results = contactData.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.phone.includes(searchQuery)
    );

    setSearchResults(results);
    setShowNoResults(results.length === 0);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowNoResults(false);
  };

  const handleSubmit = () => {
    if (searchResults.length > 0) {
      console.log("Selected Contact:", searchResults[0]);
    } else {
      console.log("No results found.");
      setShowNoResults(true);
    }
  };

  const handleSearchIconPress = () => {
    handleSearch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons
              name="arrow-back"
              size={24}
              color="#555"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Ionicons
            name="search"
            size={24}
            color="#555"
            style={styles.searchIcon}
            onPress={handleSearchIconPress}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by phone"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons
                name="close-circle"
                size={24}
                color="black"
                style={styles.clearIcon}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showNoResults ? (
        <Text>No results found.</Text>
      ) : (
        searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log("Selected Contact:", item);
                }}
                style={styles.resultItem}
              >
                <ContactDetails contact={item} />
              </TouchableOpacity>
            )}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backIcon: {
    marginRight: 10,
    color: "white",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: "white",
  },
  clearIcon: {
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "black",
  },
  contactDetailsContainer: {
    marginTop: 20,
    flexDirection: "row", // Change to row direction
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 10,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactPhone: {
    fontSize: 16,
    color: "#555",
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});

export default SearchScreen;
