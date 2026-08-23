import { PalmDigitalTwin } from '../types';

export const DIGITAL_TWIN_PALMS: PalmDigitalTwin[] = [
  {
    palmId: 'BH-001',
    name: 'Barhee Block A-04 (Al-Qassim)',
    cultivar: 'Barhee',
    farmName: 'Al-Nakheel Oasis Commercial Farm',
    location: {
      region: 'Al-Qassim Region',
      city: 'Buraydah',
      latitude: 26.3260,
      longitude: 43.9750
    },
    ageYears: 11,
    plantationDate: '2015-03-15',
    currentMaturityStage: 'Khalal',
    maturityConfidence: 0.94,
    daysSinceSpatheOpening: 118,
    pollinationStatus: 'Completed',
    pollinationDate: '2026-03-24',
    pollenSource: 'Al-Fahl Al-Ghannami (High Compatibility Batch G-102)',
    currentTelemetry: {
      soilMoisturePercent: 38.5,
      soilMoistureStatus: 'Optimal',
      airTemperatureC: 41.2,
      relativeHumidityPercent: 18.0,
      solarRadiationWm2: 890,
      vpdKPa: 3.8,
      dailyWaterAppliedLiters: 310,
      penmanMonteithEtcLday: 305,
      lastUpdated: '2026-08-20T17:30:00Z'
    },
    cameraFeed: {
      hasImage: true,
      imageThumbnail: 'barhee_khalal_cluster_bh001',
      bunchColor: 'Bright Golden Yellow (92% Uniform)',
      sugarBrixEstimate: 29.4,
      clusterDefects: ['None observed; intact fruit calyx']
    },
    policyCompliance: {
      saudiGapStatus: 'Compliant',
      mewaArticle12Checked: true,
      pdplConsentLogged: true,
      saudiDatesMarkEligible: true
    },
    simulatedDataNotice: 'Demo / simulated sensor and telemetry data — mapped to ITU-T Y.3172 Digital Twin schema.'
  },
  {
    palmId: 'BH-002',
    name: 'Barhee Block C-12 (Al-Kharj)',
    cultivar: 'Barhee',
    farmName: 'Al-Sahba Modern Agri-Holdings',
    location: {
      region: 'Riyadh Province',
      city: 'Al-Kharj',
      latitude: 24.1500,
      longitude: 47.3100
    },
    ageYears: 8,
    plantationDate: '2018-04-10',
    currentMaturityStage: 'Kimri',
    maturityConfidence: 0.89,
    daysSinceSpatheOpening: 92,
    pollinationStatus: 'Completed',
    pollinationDate: '2026-04-02',
    pollenSource: 'Al-Khushkar Male Selection',
    currentTelemetry: {
      soilMoisturePercent: 29.1,
      soilMoistureStatus: 'Deficit',
      airTemperatureC: 43.8,
      relativeHumidityPercent: 14.2,
      solarRadiationWm2: 940,
      vpdKPa: 4.4,
      dailyWaterAppliedLiters: 220,
      penmanMonteithEtcLday: 345,
      lastUpdated: '2026-08-20T17:15:00Z'
    },
    cameraFeed: {
      hasImage: true,
      imageThumbnail: 'barhee_kimri_cluster_bh002',
      bunchColor: 'Dark Emerald Green (Pre-Color Break)',
      sugarBrixEstimate: 14.8,
      clusterDefects: ['Slight sunburn risk on southern exposure']
    },
    policyCompliance: {
      saudiGapStatus: 'Action Required',
      mewaArticle12Checked: true,
      pdplConsentLogged: true,
      saudiDatesMarkEligible: false
    },
    simulatedDataNotice: 'Demo / simulated sensor and telemetry data — mapped to ITU-T Y.3172 Digital Twin schema.'
  },
  {
    palmId: 'BH-003',
    name: 'Barhee Research Row R-01 (Al-Ahsa)',
    cultivar: 'Barhee',
    farmName: 'Eastern Agricultural Experimental Station',
    location: {
      region: 'Eastern Province',
      city: 'Al-Hofuf',
      latitude: 25.3800,
      longitude: 49.5800
    },
    ageYears: 14,
    plantationDate: '2012-02-20',
    currentMaturityStage: 'Rutab',
    maturityConfidence: 0.91,
    daysSinceSpatheOpening: 135,
    pollinationStatus: 'Completed',
    pollinationDate: '2026-03-18',
    pollenSource: 'Al-Ahsa Certified Male Clone #4',
    currentTelemetry: {
      soilMoisturePercent: 42.0,
      soilMoistureStatus: 'Optimal',
      airTemperatureC: 39.5,
      relativeHumidityPercent: 44.0,
      solarRadiationWm2: 820,
      vpdKPa: 2.6,
      dailyWaterAppliedLiters: 280,
      penmanMonteithEtcLday: 275,
      lastUpdated: '2026-08-20T17:40:00Z'
    },
    cameraFeed: {
      hasImage: true,
      imageThumbnail: 'barhee_rutab_cluster_bh003',
      bunchColor: 'Translucent Amber Tip Softening (35% Rutab)',
      sugarBrixEstimate: 33.1,
      clusterDefects: ['Accelerated softening due to high humidity']
    },
    policyCompliance: {
      saudiGapStatus: 'Compliant',
      mewaArticle12Checked: true,
      pdplConsentLogged: true,
      saudiDatesMarkEligible: true
    },
    simulatedDataNotice: 'Demo / simulated sensor and telemetry data — mapped to ITU-T Y.3172 Digital Twin schema.'
  },
  {
    palmId: 'BH-004',
    name: 'Barhee Phenology Unit S-09 (Sudair)',
    cultivar: 'Barhee',
    farmName: 'Sudair Organic Palms Estate',
    location: {
      region: 'Riyadh Province',
      city: 'Al-Majmaah',
      latitude: 25.9000,
      longitude: 45.3400
    },
    ageYears: 6,
    plantationDate: '2020-03-01',
    currentMaturityStage: 'Hababouk',
    maturityConfidence: 0.96,
    daysSinceSpatheOpening: 3,
    pollinationStatus: 'Optimal Window Active',
    pollinationDate: undefined,
    pollenSource: 'Pending selection (Day 3 of Spathe Opening)',
    currentTelemetry: {
      soilMoisturePercent: 35.0,
      soilMoistureStatus: 'Optimal',
      airTemperatureC: 34.2,
      relativeHumidityPercent: 22.0,
      solarRadiationWm2: 780,
      vpdKPa: 2.9,
      dailyWaterAppliedLiters: 160,
      penmanMonteithEtcLday: 155,
      lastUpdated: '2026-08-20T17:45:00Z'
    },
    cameraFeed: {
      hasImage: true,
      imageThumbnail: 'barhee_spathe_crack_bh004',
      bunchColor: 'Freshly Emerged Female Inflorescence (Receptive)',
      sugarBrixEstimate: 0.0,
      clusterDefects: ['Optimal receptive stage: 3 days since spathe crack']
    },
    policyCompliance: {
      saudiGapStatus: 'Compliant',
      mewaArticle12Checked: true,
      pdplConsentLogged: true,
      saudiDatesMarkEligible: true
    },
    simulatedDataNotice: 'Demo / simulated sensor and telemetry data — mapped to ITU-T Y.3172 Digital Twin schema.'
  }
];
