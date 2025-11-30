import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const AddBankScreen = () => {
  // 1. State for form fields
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. Function to handle form submission
  const handleAddBank = async () => {
    // Basic Validation
    if (!bankName || !branchName || !accountHolderName || !accountNumber || !ifscCode) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      // 3. API Call to Backend
      // Note: 10.0.2.2 is the localhost address for Android Emulator
      const response = await axios.post('https://threew-reactnative-assignment.onrender.com/add-bank', {
        bankName,
        branchName,
        accountHolderName,
        accountNumber,
        ifscCode,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Bank Account Added Successfully!');
        // Clear form
        setBankName('');
        setBranchName('');
        setAccountHolderName('');
        setAccountNumber('');
        setIfscCode('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add bank account. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Bank Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={bankName}
        onChangeText={setBankName}
      />
      <TextInput
        style={styles.input}
        placeholder="Branch Name"
        value={branchName}
        onChangeText={setBranchName}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Holder Name"
        value={accountHolderName}
        onChangeText={setAccountHolderName}
      />
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        keyboardType="numeric"
        value={accountNumber}
        onChangeText={setAccountNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="IFSC Code"
        value={ifscCode}
        onChangeText={setIfscCode}
        autoCapitalize="characters"
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleAddBank}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save Bank Details'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddBankScreen;