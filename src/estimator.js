// estimate currently infected
function estimateInfected({ reportedCases, numberInfected }) {
  return reportedCases * numberInfected;
}

// normalise duration in days
function normaliseDurationInDays({ periodType, timeToElapse }) {
  switch (periodType) {
    case 'days':
      return timeToElapse;
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 30;
    default:
      return timeToElapse;
  }
}

// estimate infections by requested time
function estimateInfectionsByRequestedTime({
  currentlyInfected,
  durationInDays
}) {
  return currentlyInfected * (2 ** Math.trunc(durationInDays / 3));
}

// estimate severe cases by requested time
function estimateSevereCasesByRequestedTime(infectionsByRequestedTime) {
  return Math.trunc(infectionsByRequestedTime * 0.15);
}

// estimate total available beds for severe positive cases
function estimateAvailableBedsForSevereCases({
  totalHospitalBeds,
  severeCasesByRequestedTime
}) {
  const totalAvailableHospitalBeds = totalHospitalBeds * 0.35;
  return Math.trunc(totalAvailableHospitalBeds - severeCasesByRequestedTime);
}

// estimate cases
function estimateCases(data, numberInfected) {
  const {
    reportedCases, periodType, timeToElapse, totalHospitalBeds
  } = data;

  const durationInDays = normaliseDurationInDays({ periodType, timeToElapse });

  // challenge 1 codes
  const currentlyInfected = estimateInfected({ reportedCases, numberInfected });
  const infectionsByRequestedTime = estimateInfectionsByRequestedTime({
    currentlyInfected,
    durationInDays
  });

  // challenge 2 codes
  const severeCasesByRequestedTime = estimateSevereCasesByRequestedTime(
    infectionsByRequestedTime
  );
  const hospitalBedsByRequestedTime = estimateAvailableBedsForSevereCases({
    totalHospitalBeds,
    severeCasesByRequestedTime
  });

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime
  };
}

const covid19ImpactEstimator = (data) => {
  const impactInfected = 10;
  const severeImpactInfected = 50;

  return {
    data,
    impact: estimateCases(data, impactInfected),
    severeImpact: estimateCases(data, severeImpactInfected)
  };
};

export default covid19ImpactEstimator;
