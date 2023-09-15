# React Native Parking App

This React Native application implements a parking allocation system for a hypothetical parking complex. The application simulates a parking system for different types of vehicles, considering various constraints and pricing structures.

## Features
- **Parking Allocation**: Vehicles are allocated to the nearest available parking slot based on their size and parking type.
- **Real-Time Parking Hours**: The application records parking hours in real-time and displays the parking time in minutes or hours (decimal representation).
- **Parking Fee Calculation**: Calculates parking fees based on the parking time, parking slot size, and defined pricing structure.

## Key Files
- **`App.js`**: The main entry point of the React Native application.
- **`Navigation.js`**: Configures navigation using React Navigation.
- **`parkingData.js`**: Contains mock data for parking slots and entry points.
- **`parkingFees.js`**: Defines the pricing structure and calculates parking fees.
- **`ParkingScreen.js`**: Implements vehicle parking functionality and nearest slot allocation.
- **`UnparkingScreen.js`**: Handles the calculation of parking time and displays parking fee.

## Usage
- The application simulates a parking system where vehicles are allocated to the nearest available parking slot based on their size and parking type.
- Users can select their vehicle size to park their vehicle and calculate the parking fee when leaving the parking area.
