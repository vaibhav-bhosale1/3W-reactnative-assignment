import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const EditBankScreen = ({ route, navigation }) => {
  // Get the bank details passed from the List Screen
  const { bank } = route.params;

  const [bankName, setBankName] = useState(bank.bankName);
  const [branchName, setBranchName] = useState(bank.branchName);
  const [accountHolderName, setAccountHolderName] = useState(bank.accountHolderName);
  const [accountNumber, setAccountNumber] = useState(bank.accountNumber);
  const [ifscCode, setIfscCode] = useState(bank.ifscCode);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!bankName || !branchName || !accountHolderName || !accountNumber || !ifscCode) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      // API Call to Update
      await axios.put(`https://threew-reactnative-assignment.onrender.com/update-bank/${bank._id}`, {
        bankName,
        branchName,
        accountHolderName,
        accountNumber,
        ifscCode,
      });

      Alert.alert('Success', 'Bank Updated!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Bank Details</Text>

      <TextInput style={styles.input} value={bankName} onChangeText={setBankName} placeholder="Bank Name" />
      <TextInput style={styles.input} value={branchName} onChangeText={setBranchName} placeholder="Branch Name" />
      <TextInput style={styles.input} value={accountHolderName} onChangeText={setAccountHolderName} placeholder="Holder Name" />
      <TextInput style={styles.input} value={accountNumber} onChangeText={setAccountNumber} keyboardType="numeric" placeholder="Account Number" />
      <TextInput style={styles.input} value={ifscCode} onChangeText={setIfscCode} placeholder="IFSC" />

      <TouchableOpacity style={styles.button} onPress={handleUpdate} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update Bank'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default EditBankScreen;