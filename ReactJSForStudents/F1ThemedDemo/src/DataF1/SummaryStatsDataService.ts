import * as LapDataService from "./LapDataService";

// Utility to parse lap time string (e.g., "1:39.625") to seconds
function lapTimeToSeconds(lap: string): number | null {
  if (!lap || typeof lap !== "string" || lap === "PIT" || lap === "-")
    return null;
  const parts = lap.split(":");
  if (parts.length !== 2) return null;
  const [min, sec] = parts;
  const s = parseFloat(sec);
  if (isNaN(s)) return null;
  return parseInt(min) * 60 + s;
}

// 1. Fastest best lap (value and driver)
export async function getFastestBestLap() {
  const [drivers, bestLaps] = await Promise.all([
    LapDataService.getDrivers(),
    LapDataService.getBestLap(),
  ]);
  let minIdx = -1;
  let minVal = Infinity;
  bestLaps.forEach((lap, i) => {
    const sec = lapTimeToSeconds(lap);
    if (sec !== null && sec < minVal) {
      minVal = sec;
      minIdx = i;
    }
  });
  return minIdx >= 0
    ? { driver: drivers[minIdx], lap: bestLaps[minIdx], seconds: minVal }
    : null;
}

// 2. Average best lap time (in seconds)
export async function getAverageBestLap() {
  const bestLaps = await LapDataService.getBestLap();
  const valid = bestLaps
    .map(lapTimeToSeconds)
    .filter((x) => x !== null) as number[];
  if (!valid.length) return null;
  const avg = valid.reduce((a, b) => a + b, 0) / valid.length;
  return avg;
}

// 3. Tyre usage count (object: tyre -> count)
export async function getTyreUsageCount() {
  const tyres = await LapDataService.getTyre();
  const counts: Record<string, number> = {};
  tyres.forEach((t) => {
    counts[t] = (counts[t] || 0) + 1;
  });
  return counts;
}

// 4. Driver with largest gap
export async function getLargestGap() {
  const [drivers, gaps] = await Promise.all([
    LapDataService.getDrivers(),
    LapDataService.getGap(),
  ]);
  let maxIdx = -1;
  let maxVal = -Infinity;
  gaps.forEach((gap, i) => {
    const val = parseFloat((gap || "").replace("+", ""));
    if (!isNaN(val) && val > maxVal) {
      maxVal = val;
      maxIdx = i;
    }
  });
  return maxIdx >= 0
    ? { driver: drivers[maxIdx], gap: gaps[maxIdx], value: maxVal }
    : null;
}

// 5. Sector leaders (driver with best S1, S2, S3)
export async function getSectorLeaders() {
  const [drivers, s1, s2, s3] = await Promise.all([
    LapDataService.getDrivers(),
    LapDataService.getS1(),
    LapDataService.getS2(),
    LapDataService.getS3(),
  ]);
  function minIdx(arr: string[]) {
    let idx = -1,
      min = Infinity;
    arr.forEach((v, i) => {
      const n = parseFloat(v);
      if (!isNaN(n) && n < min) {
        min = n;
        idx = i;
      }
    });
    return idx;
  }
  return {
    S1:
      minIdx(s1) >= 0
        ? { driver: drivers[minIdx(s1)], value: s1[minIdx(s1)] }
        : null,
    S2:
      minIdx(s2) >= 0
        ? { driver: drivers[minIdx(s2)], value: s2[minIdx(s2)] }
        : null,
    S3:
      minIdx(s3) >= 0
        ? { driver: drivers[minIdx(s3)], value: s3[minIdx(s3)] }
        : null,
  };
}

// 6. All drivers with their best lap and tyre (array of objects)
export async function getDriverLapTyreSummary() {
  const [drivers, bestLaps, tyres] = await Promise.all([
    LapDataService.getDrivers(),
    LapDataService.getBestLap(),
    LapDataService.getTyre(),
  ]);
  return drivers.map((driver, i) => ({
    driver,
    bestLap: bestLaps[i] || "-",
    tyre: tyres[i] || "-",
  }));
}

// 7. Summary object: all stats above
export async function getFullSummary() {
  const [fastest, avgLap, tyreUsage, largestGap, sectorLeaders, driverLapTyre] =
    await Promise.all([
      getFastestBestLap(),
      getAverageBestLap(),
      getTyreUsageCount(),
      getLargestGap(),
      getSectorLeaders(),
      getDriverLapTyreSummary(),
    ]);
  return {
    fastest,
    avgLap,
    tyreUsage,
    largestGap,
    sectorLeaders,
    driverLapTyre,
  };
}
