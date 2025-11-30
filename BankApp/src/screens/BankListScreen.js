import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const BankListScreen = ({ navigation }) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://threew-reactnative-assignment.onrender.com/banks');
      setBanks(response.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBanks();
    }, [])
  );

  // Function to handle Delete
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to remove this bank?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await axios.delete(`https://threew-reactnative-assignment.onrender.com/delete-bank/${id}`);
              fetchBanks(); // Refresh list after delete
            } catch (error) {
              Alert.alert("Error", "Could not delete bank.");
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.bankName}>{item.bankName}</Text>
        <Text>Branch: {item.branchName}</Text>
        <Text>Holder: {item.accountHolderName}</Text>
        <Text>Acct: {item.accountNumber}</Text>
        <Text>IFSC: {item.ifscCode}</Text>
      </View>
      
      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={styles.editBtn} 
          onPress={() => navigation.navigate('EditBank', { bank: item })}
        >
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.deleteBtn} 
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 3 },
  cardContent: { marginBottom: 10 },
  bankName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#777' },
  fab: { position: 'absolute', width: 60, height: 60, alignItems: 'center', justifyContent: 'center', right: 30, bottom: 30, backgroundColor: '#007BFF', borderRadius: 30, elevation: 8 },
  fabText: { fontSize: 30, color: 'white', fontWeight: 'bold' },
  
  // New Styles for Buttons
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  editBtn: { backgroundColor: '#FFC107', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, marginRight: 10 },
  deleteBtn: { backgroundColor: '#DC3545', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});

export default BankListScreen;