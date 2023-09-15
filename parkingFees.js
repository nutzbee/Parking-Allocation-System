export const calculateParkingFee = (hours, slotSize) => {
  const initialRate = 40;
  const exceedingRate = {
    'SP': 20,
    'MP': 60,
    'LP': 100,
  };

  let fee = initialRate;

  if (hours > 3) {
    fee += exceedingRate[slotSize] * (hours - 3);
  }

  if (hours >= 24) {
    fee += 5000 * Math.floor(hours / 24);
  }

  fee = Math.ceil(fee);

  return fee;
};