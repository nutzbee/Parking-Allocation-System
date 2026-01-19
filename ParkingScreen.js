import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { parkingSlots, generateEntryPoint, entryPoints } from './parkingData';

const defaultModalState = {
  unparking: false,
  parking: false,
};

const defaultHeading = {
  parking: 'Select Your Vehicle Size',
  unparking: 'Ready to Unpark?',
};

const ParkingScreen = ({ navigation }) => {
  const [selectedSlot, setSelectedSlot] = useState({
    id: 0,
    size: 0,
    distances: [],
  });
  const [availableSlot, setAvailableSlot] = useState({
    id: 0,
    size: 0,
    distances: [],
  });
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedParkingType, setSelectedParkingType] = useState(null);
  const [selectedEntryPoint, setSelectedEntryPoint] = useState(null);
  const [isModalVisible, setModalVisible] = useState(defaultModalState);

  const toggleModal = (toggleVal) => {
    setModalVisible({
      ...isModalVisible,
      [toggleVal]: !isModalVisible[toggleVal],
    });
  };

  const parkVehicle = (vehicleSize, parkingType) => {
    const randomEntryPoint = generateEntryPoint();

    setSelectedSize(vehicleSize);
    setSelectedParkingType(parkingType);
    setSelectedEntryPoint(randomEntryPoint);

    const availableSlots = parkingSlots().filter(
      (slot) => slot.size === parkingType && slot.available
    );
    const nearestSlot = availableSlots.reduce((closest, current) => {
      const distanceToEntry =
        current.distances[entryPoints.indexOf(randomEntryPoint)];
      const closestDistance =
        closest.distances[entryPoints.indexOf(randomEntryPoint)];
      return distanceToEntry < closestDistance ? current : closest;
    });

    setAvailableSlot(nearestSlot);

    if (selectedSlot.id !== 0) return toggleModal('unparking');

    toggleModal('parking');
  };

  return (
    <View style={styles.container}>
      {selectedSlot.id ? (
        <Text style={[styles.heading, { textAlign: 'center' }]}>
          You are currently parked at{'\n'}{selectedSlot.size} ({selectedSlot.id})
        </Text>
      ) : <></>}
      <Text style={styles.heading}>
        {defaultHeading[selectedSlot.id ? 'unparking' : 'parking']}
      </Text>

      {!selectedSlot.id ? (
        <>
          <TouchableOpacity
            style={[
              styles.button,
              selectedSize === 'S' && styles.selectedButton,
            ]}
            onPress={() => parkVehicle('S', 'SP')}>
            <Text style={styles.buttonText}>Small</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedSize === 'M' && styles.selectedButton,
            ]}
            onPress={() => parkVehicle('M', 'MP')}>
            <Text style={styles.buttonText}>Medium</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              selectedSize === 'L' && styles.selectedButton,
            ]}
            onPress={() => parkVehicle('L', 'LP')}>
            <Text style={styles.buttonText}>Large</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.button, selectedSize === 'S' && styles.selectedButton]}
          onPress={() => {
            toggleModal('unparking');
          }}>
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
      )}

      {/* Proceed to park modal */}
      <Modal isVisible={isModalVisible.parking} style={styles.modal}>
        <View style={styles.modalContent}>
          {selectedSize && selectedParkingType && (
            <View style={styles.selectedInfo}>
              <Text>{`Gate Entrance: ${selectedEntryPoint}`}</Text>
              <Text>{`Selected Vehicle Size: ${selectedSize}`}</Text>
              <Text>{`Parking Type: ${selectedParkingType}`}</Text>
              <Text>{`Distance from Entry Point ${selectedEntryPoint}: ${
                availableSlot.distances[entryPoints.indexOf(selectedEntryPoint)]
              } units`}</Text>
            </View>
          )}

          {availableSlot && (
            <Text
              style={
                styles.slotInfo
              }>{`Parking space available slot in ${availableSlot.id} (${availableSlot.size})`}</Text>
          )}

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              const hoursConf = 60 * 60 * 6000;
              const timeStart = new Date().getTime();
              // console.log('timeStart', timeStart)
              setSelectedSlot({
                ...availableSlot,
                timeStart,
              });
              navigation.navigate('Unparking', {
                selectedSlot: {
                  ...selectedSlot,
                  timeStart,
                },
                selectedSize,
                selectedParkingType,
              });
              toggleModal('parking');
            }}>
            <Text style={styles.modalButtonText}>Confirm Parking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => toggleModal('parking')}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Unparking Modal */}
      <Modal isVisible={isModalVisible.unparking} style={styles.modal}>
        <View style={styles.modalContent}>
          {selectedSize && selectedParkingType && (
            <View style={styles.selectedInfo}>
              <Text>{`Vehicle Size: ${selectedSize}`}</Text>
              <Text>{`Parking Type: ${selectedParkingType}`}</Text>
            </View>
          )}

          {selectedSlot && (
            <Text
              style={
                styles.slotInfo
              }>{`Parked in ${selectedSlot.id} (${selectedSlot.size})`}</Text>
          )}

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              navigation.navigate('Unparking', {
                selectedSlot,
                selectedSize,
                selectedParkingType,
              });
              toggleModal('unparking');
            }}>
            <Text style={styles.modalButtonText}>Proceed to Unpark</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => toggleModal('unparking')}>
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
