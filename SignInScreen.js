import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  const validatePhoneNumber = () => {
    // Remove non-digit characters for validation
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    // Simple validation logic
    const phoneRegex = /^[0-9]{10}$/;
    if (phoneRegex.test(digitsOnly)) {
      Alert.alert('Valid phone number', '', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } else {
      Alert.alert('Invalid phone number');
    }
  };

  const handleInputChange = (input) => {
    // Remove non-digit characters for raw phone number state
    const digitsOnly = input.replace(/\D/g, '');
    setPhoneNumber(digitsOnly);

    // Format input if it has exactly 10 digits
    let formattedInput = digitsOnly;
    if (digitsOnly.length === 10) {
      formattedInput = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    setFormattedPhoneNumber(formattedInput);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text>Nhập số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại của bạn"
        value={formattedPhoneNumber}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <Button title="Tiếp tục" onPress={validatePhoneNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    width: '80%', // Adjust width as needed
  },
});

export default SignInScreen;
