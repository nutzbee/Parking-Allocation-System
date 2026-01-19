import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { calculateParkingFee } from './parkingFees';

const UnparkingScreen = ({ navigation, route }) => {
  const [hoursParked, setHoursParked] = useState('');
  const { selectedParkingType, selectedSlot } = route?.params || {};

  const calculateAndDisplayFee = () => {
    if (isNaN(hoursParked) || hoursParked === '') {
      Alert.alert('Error', 'Please enter a valid number of hours parked.');
      return;
    }

    const parkingTime = parseFloat(hoursParked);

    let timeDisplay;
    if (parkingTime < 1) {
      timeDisplay = `Less than an hour.`;
    } else {
      const hours = Math.floor(parkingTime);
      const minutes = Math.round((parkingTime % 1) * 60);
      timeDisplay = `${hours} hour${hours !== 1 ? 's' : ''}`;
      if (minutes > 0)
        timeDisplay += ` ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    const fee = calculateParkingFee(parkingTime, selectedParkingType);
    alert(`Parking Time: ${timeDisplay}\nParking Fee: ${fee} pesos`);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Parking',
        },
      ],
    })
  };

  useEffect(() => {
    const timeNow = Date.now();
    const diffMs = timeNow - selectedSlot.timeStart;
    const _hoursParked = Math.floor(diffMs / (1000 * 60 * 60));
    setHoursParked(_hoursParked);
  }, [selectedSlot.timeStart]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Number of Hours Parked</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={hoursParked || 'Less than an hour'}
        disabled
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
    borderRadius: 10,
    padding: 10,
    width: '80%',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'gray'
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
