import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { parkingSlots, entryPoints } from './parkingData';

const ParkingScreen = ({ navigation }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedParkingType, setSelectedParkingType] = useState(null);
  const [selectedEntryPoint] = useState('A');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const parkVehicle = (vehicleSize, parkingType) => {
    setSelectedSize(vehicleSize);
    setSelectedParkingType(parkingType);

    const availableSlots = parkingSlots.filter(slot => slot.size === parkingType);
    const nearestSlot = availableSlots.reduce((closest, current) => {
      const distanceToEntry = current.distances[entryPoints.indexOf(selectedEntryPoint)];
      const closestDistance = closest.distances[entryPoints.indexOf(selectedEntryPoint)];
      return distanceToEntry < closestDistance ? current : closest;
    });

    setSelectedSlot(nearestSlot);
    toggleModal();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('willBlur', () => {
      setModalVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Your Vehicle Size</Text>

      <TouchableOpacity 
        style={[styles.button, selectedSize === 'S' && styles.selectedButton]}
        onPress={() => parkVehicle('S', 'SP')}
      >
        <Text style={styles.buttonText}>Small</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, selectedSize === 'M' && styles.selectedButton]}
        onPress={() => parkVehicle('M', 'MP')}
      >
        <Text style={styles.buttonText}>Medium</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, selectedSize === 'L' && styles.selectedButton]}
        onPress={() => parkVehicle('L', 'LP')}
      >
        <Text style={styles.buttonText}>Large</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} style={styles.modal}>
        <View style={styles.modalContent}>
          {selectedSize && selectedParkingType && (
            <View style={styles.selectedInfo}>
              <Text>{`Selected Vehicle Size: ${selectedSize}`}</Text>
              <Text>{`Parking Type: ${selectedParkingType}`}</Text>
              <Text>{`Distance from Entry Point ${selectedEntryPoint}: ${selectedSlot.distances[entryPoints.indexOf(selectedEntryPoint)]} units`}</Text>
            </View>
          )}

          {selectedSlot && (
            <Text style={styles.slotInfo}>{`Parked in Slot ${selectedSlot.id} (${selectedSlot.size})`}</Text>
          )}

          <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('Unparking', { selectedSlot, selectedSize, selectedParkingType })}>
            <Text style={styles.modalButtonText}>Proceed to Unpark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedInfo: {
    marginBottom: 20,
  },
  slotInfo: {
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ParkingScreen;