const networkStations = [
    [0, 0, 9],
    [20, 20, 6],
    [10, 0, 12],
    [5, 5, 13],
    [99, 25, 2]
];

const calculateDistancesBetweenNetworkStationsAndDevice = (x, y) => {
    const networkStationsWithDistanceBetweenPoints = [[]];
    try {
        if (isNaN(x) || isNaN(y)) {
            throw new Error("Device location must be a number")
        } if (x < 0 || y < 0) {
            throw new Error("Device location cannot be negative")
        } if (typeof x === "boolean" || typeof y === "boolean") {
            throw new Error("Device location cannot be boolean")
        }
        for (let i = 0; i < networkStations.length; i++) {
            const distanceBetweenPoints = Math.sqrt(Math.pow((networkStations[i][0] - x), 2) + Math.pow((networkStations[i][1] - y), 2));
            networkStationsWithDistanceBetweenPoints[i] = ([networkStations[i][0], networkStations[i][1], networkStations[i][2], distanceBetweenPoints]);
        };
        return networkStationsWithDistanceBetweenPoints
    } catch (e) {
        console.error(e)
        return e
    };
};

const calculateSpeedsOfNetworkStationsWithRespectToDevice = (networkStationsWithDistanceBetweenPoints) => {
    const networkStationsWithSpeed = [[]];
    let netWorkSpeed = null
    for (let i = 0; i < networkStations.length; i++) {
        if (networkStationsWithDistanceBetweenPoints[i][3] > networkStationsWithDistanceBetweenPoints[i][2]) {
            netWorkSpeed = 0
        } else {
            netWorkSpeed = Math.pow(networkStationsWithDistanceBetweenPoints[i][2] - networkStationsWithDistanceBetweenPoints[i][3], 2);
        };
        networkStationsWithSpeed[i] = ([networkStationsWithDistanceBetweenPoints[i][0], networkStationsWithDistanceBetweenPoints[i][1], netWorkSpeed]);
    };
    return networkStationsWithSpeed
};

const findBestNetworkStationForDevice = (x, y, networkStationsWithSpeed) => {
    const bestNetworkSpeedForDevice = Math.max.apply(Math, networkStationsWithSpeed.map(i => i[2]));
    const indexOfBestNetworkSpeedForDevice = networkStationsWithSpeed.map(i => i[2]).indexOf(bestNetworkSpeedForDevice);
    const xLocationOfNetworkStation = networkStationsWithSpeed[indexOfBestNetworkSpeedForDevice][0];
    const yLocationOfNetworkStation = networkStationsWithSpeed[indexOfBestNetworkSpeedForDevice][1];
    try {
        if (bestNetworkSpeedForDevice <= 0) {
            throw new Error(`No network station within reach for point ${x},${y}`)
        };
        console.log(`Best network station for point ${x},${y} is ${xLocationOfNetworkStation},${yLocationOfNetworkStation} with speed ${bestNetworkSpeedForDevice}`)
        return `Best network station for point ${x},${y} is ${xLocationOfNetworkStation},${yLocationOfNetworkStation} with speed ${bestNetworkSpeedForDevice}`
    } catch (e) {
        console.error(e)
        return e
    };
};

module.exports = { calculateDistancesBetweenNetworkStationsAndDevice, calculateSpeedsOfNetworkStationsWithRespectToDevice, findBestNetworkStationForDevice }