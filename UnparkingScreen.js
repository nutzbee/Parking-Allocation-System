import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { calculateParkingFee } from './parkingFees';

const UnparkingScreen = ({ navigation }) => {
  const [hoursParked, setHoursParked] = useState('');
  const { selectedParkingType } = navigation.state.params;

  const calculateAndDisplayFee = () => {
    if (isNaN(hoursParked) || hoursParked === '') {
      Alert.alert('Error', 'Please enter a valid number of hours parked.');
      return;
    }

    const parkingTime = parseFloat(hoursParked);

    let timeDisplay;
    if (parkingTime < 1) {
      timeDisplay = `${Math.round(parkingTime * 60)} minutes`;
    } else {
      const hours = Math.floor(parkingTime);
      const minutes = Math.round((parkingTime % 1) * 60);
      timeDisplay = `${hours} hour${hours !== 1 ? 's' : ''}`;
      if (minutes > 0) timeDisplay += ` ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    const fee = calculateParkingFee(parkingTime, selectedParkingType);
    alert(`Parking Time: ${timeDisplay}\nParking Fee: ${fee} pesos`);
    navigation.navigate('Parking');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Number of Hours Parked</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setHoursParked(text.replace(/[^0-9.]/g, ''))}
        keyboardType="numeric"
        value={hoursParked}
      />
      <TouchableOpacity style={styles.button} onPress={calculateAndDisplayFee}>
        <Text style={styles.buttonText}>Calculate Fee</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default UnparkingScreen;