const { calculateDistancesBetweenNetworkStationsAndDevice,
    calculateSpeedsOfNetworkStationsWithRespectToDevice,
    findBestNetworkStationForDevice } = require("../main/suitableNetworkStationForDevice.cjs");

describe("Distance between network station and device", () => {
    test.each([
        [0, 0, [
            [0, 0, 9, 0],
            [20, 20, 6, 28.284271247461902],
            [10, 0, 12, 10],
            [5, 5, 13, 7.0710678118654755],
            [99, 25, 2, 102.1077861869505]
        ]],
        [100, 100, [
            [0, 0, 9, 141.4213562373095],
            [20, 20, 6, 113.13708498984761],
            [10, 0, 12, 134.5362404707371],
            [5, 5, 13, 134.35028842544403],
            [99, 25, 2, 75.0066663703967]
        ]],
        [15, 10, [
            [0, 0, 9, 18.027756377319946],
            [20, 20, 6, 11.180339887498949],
            [10, 0, 12, 11.180339887498949],
            [5, 5, 13, 11.180339887498949],
            [99, 25, 2, 85.32877591996736]
        ]],
        [18, 18, [
            [0, 0, 9, 25.45584412271571],
            [20, 20, 6, 2.8284271247461903],
            [10, 0, 12, 19.697715603592208],
            [5, 5, 13, 18.384776310850235],
            [99, 25, 2, 81.30190649671138]
        ]],
        [13, 13, [
            [0, 0, 9, 18.384776310850235],
            [20, 20, 6, 9.899494936611665],
            [10, 0, 12, 13.341664064126334],
            [5, 5, 13, 11.313708498984761],
            [99, 25, 2, 86.83317338436964]
        ]],
        [25, 99, [
            [0, 0, 9, 102.1077861869505],
            [20, 20, 6, 79.1580697086532],
            [10, 0, 12, 100.12991560967181],
            [5, 5, 13, 96.1041102138717],
            [99, 25, 2, 104.65180361560904]
        ]]
    ])("Should be able to provide distance between the network stations and the device. Device location that is being tested is: (%i, %i)", (x, y, expected) => {
        expect(calculateDistancesBetweenNetworkStationsAndDevice(x, y)).toStrictEqual(expected);
    });
});

describe("Speed between network station and device", () => {
    test.each([
        [0, 0, [
            [0, 0, 81],
            [20, 20, 0],
            [10, 0, 4],
            [5, 5, 35.152236891497644],
            [99, 25, 0]
        ]],
        [100, 100, [
            [0, 0, 0],
            [20, 20, 0],
            [10, 0, 0],
            [5, 5, 0],
            [99, 25, 0]
        ]],
        [15, 10, [
            [0, 0, 0],
            [20, 20, 0],
            [10, 0, 0.6718427000252355],
            [5, 5, 3.3111629250273373],
            [99, 25, 0]
        ]],
        [18, 18, [
            [0, 0, 0],
            [20, 20, 10.058874503045718],
            [10, 0, 0],
            [5, 5, 0],
            [99, 25, 0]
        ]],
        [13, 13, [
            [0, 0, 0],
            [20, 20, 0],
            [10, 0, 0],
            [5, 5, 2.843579026396227],
            [99, 25, 0]
        ]],
        [25, 99, [
            [0, 0, 0],
            [20, 20, 0],
            [10, 0, 0],
            [5, 5, 0],
            [99, 25, 0]
        ]]
    ])("Should be able to provide network stations speed. Device location that is being tested is: (%i, %i)", (x, y, expected) => {
        expect(calculateSpeedsOfNetworkStationsWithRespectToDevice(calculateDistancesBetweenNetworkStationsAndDevice(x, y))).toStrictEqual(expected);
    });
});

describe("Find the best network station for the device", () => {
    test.each([
        [0, 0, "Best network station for point 0,0 is 0,0 with speed 81"],
        [100, 100, new Error("No network station within reach for point 100,100")],
        [15, 10, "Best network station for point 15,10 is 5,5 with speed 3.3111629250273373"],
        [18, 18, "Best network station for point 18,18 is 20,20 with speed 10.058874503045718"],
        [13, 13, "Best network station for point 13,13 is 5,5 with speed 2.843579026396227"],
        [25, 99, new Error("No network station within reach for point 25,99")]
    ])("Should be able to find the best network station for the device. Device location that is being tested is: (%i, %i)", (x, y, expected) => {
        expect(findBestNetworkStationForDevice(x, y, calculateSpeedsOfNetworkStationsWithRespectToDevice(calculateDistancesBetweenNetworkStationsAndDevice(x, y)))).toStrictEqual(expected);
    });
});

describe("No network station for device", () => {
    test("Should throw error message when the device is not within the reach of network station", () => {
        const x = 10000
        const y = 10000
        const distances = calculateDistancesBetweenNetworkStationsAndDevice(x, y);
        const speeds = calculateSpeedsOfNetworkStationsWithRespectToDevice(distances)
        const reach = findBestNetworkStationForDevice(x, y, speeds)
        expect(reach).toStrictEqual(new Error(`No network station within reach for point ${x},${y}`));
    });
});

describe("Device location is not a number", () => {
    test("Should throw error message when device location is not a number", () => {
        expect(calculateDistancesBetweenNetworkStationsAndDevice(NaN, NaN)).toStrictEqual(new Error("Device location must be a number"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(NaN, 1)).toStrictEqual(new Error("Device location must be a number"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(1, NaN)).toStrictEqual(new Error("Device location must be a number"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(undefined, undefined)).toStrictEqual(new Error("Device location must be a number"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(undefined, 1)).toStrictEqual(new Error("Device location must be a number"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(1, undefined)).toStrictEqual(new Error("Device location must be a number"));
    });
});

describe("Device location has a negative number", () => {
    test("Should throw error message when device location is negative", () => {
        expect(calculateDistancesBetweenNetworkStationsAndDevice(-1, -1)).toStrictEqual(new Error("Device location cannot be negative"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(-1, 1)).toStrictEqual(new Error("Device location cannot be negative"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(1, -1)).toStrictEqual(new Error("Device location cannot be negative"));
    });
});

describe("Device location has a boolean value", () => {
    test("Should throw error message when device location is boolean", () => {
        expect(calculateDistancesBetweenNetworkStationsAndDevice(true, true)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(false, false)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(true, false)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(false, true)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(0, true)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(true, 0)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(0, false)).toStrictEqual(new Error("Device location cannot be boolean"));
        expect(calculateDistancesBetweenNetworkStationsAndDevice(false, 0)).toStrictEqual(new Error("Device location cannot be boolean"));
    });
});