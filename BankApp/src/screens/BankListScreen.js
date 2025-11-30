import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const BankListScreen = ({ navigation }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch banks
  const fetchBanks = async () => {
    try {
      setLoading(true);
      // Use 10.0.2.2 for Android Emulator
      const response = await axios.get('http://10.0.2.2:5000/banks');
      setBanks(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    } finally {
      setLoading(false);
    }
  };

  // call fetchBanks every time the screen comes into focus (e.g., after adding a new bank)
  useFocusEffect(
    useCallback(() => {
      fetchBanks();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.bankName}>{item.bankName}</Text>
      <Text>Branch: {item.branchName}</Text>
      <Text>Holder: {item.accountHolderName}</Text>
      <Text>Acct: {item.accountNumber}</Text>
      <Text>IFSC: {item.ifscCode}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={banks}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No bank accounts found.</Text>}
        />
      )}

      {/* Floating Action Button to Add Bank */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddBank')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Shadow for Android
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    elevation: 8,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BankListScreen;