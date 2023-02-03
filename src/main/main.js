const { calculateDistancesBetweenNetworkStationsAndDevice,
    calculateSpeedsOfNetworkStationsWithRespectToDevice,
    findBestNetworkStationForDevice
} = require('./suitableNetworkStationForDevice.js');

const devices = [
    [100, 100],
    [15, 10],
    [18, 18],
    [13, 13],
    [25, 99]
];

const suitableNetworkStationForDevice = () => {
    for (let i = 0; i < devices.length; i++) {
        const distanceBetweenNetworkStationsAndDevice = calculateDistancesBetweenNetworkStationsAndDevice(devices[i][0], devices[i][1]);
        const speedOfNetworkStationsWithRespectToDevice = calculateSpeedsOfNetworkStationsWithRespectToDevice(distanceBetweenNetworkStationsAndDevice)
        findBestNetworkStationForDevice(devices[i][0], devices[i][1], speedOfNetworkStationsWithRespectToDevice)
    };
    return findBestNetworkStationForDevice
}

suitableNetworkStationForDevice()