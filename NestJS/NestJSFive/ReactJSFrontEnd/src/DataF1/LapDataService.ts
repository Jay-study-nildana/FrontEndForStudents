// LapDataService.ts
// Service to provide lap data arrays from lapData.ts

import * as lapData from "../DataF1/lapData";

// Type definitions for lap data
export type DriverName = string;
export type LapTime = string;
export type Gap = string;
export type SectorTime = string;
export type Tyre = string;
export type Speed = string;

export interface DriverStanding {
  pos: number;
  name: string;
  nationality: string;
  team: string;
  points: number;
}

export function getDriverStandings(): Promise<DriverStanding[]> {
  return simulateNetwork(lapData.driverStandings);
}


// Simulate network delay
function simulateNetwork<T>(data: T, delay = 800): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

export function getDrivers(): Promise<DriverName[]> {
  return simulateNetwork(lapData.drivers);
}

export function getBestLap(): Promise<LapTime[]> {
  return simulateNetwork(lapData.dummyBestLap);
}

export function getCurrentLap(): Promise<LapTime[]> {
  return simulateNetwork(lapData.dummyCurrentLap);
}

export function getGap(): Promise<Gap[]> {
  return simulateNetwork(lapData.dummyGap);
}

export function getS1(): Promise<SectorTime[]> {
  return simulateNetwork(lapData.dummyS1);
}

export function getS2(): Promise<SectorTime[]> {
  return simulateNetwork(lapData.dummyS2);
}

export function getS3(): Promise<SectorTime[]> {
  return simulateNetwork(lapData.dummyS3);
}

export function getTyre(): Promise<Tyre[]> {
  return simulateNetwork(lapData.dummyTyre);
}

export function getBS1(): Promise<SectorTime[]> {
  return simulateNetwork(lapData.dummyBS1);
}

export function getSPD1(): Promise<Speed[]> {
  return simulateNetwork(lapData.dummySPD1);
}

export function getBS2(): Promise<SectorTime[]> {
  return simulateNetwork(lapData.dummyBS2);
}

export function getSPD2(): Promise<Speed[]> {
  return simulateNetwork(lapData.dummySPD2);
}

export function getBS3(): Promise<SectorTime[]> {
  return simulateNetwork(lapData.dummyBS3);
}

export function getSPD3(): Promise<Speed[]> {
  return simulateNetwork(lapData.dummySPD3);
}

// Add more async getters as needed for other arrays
