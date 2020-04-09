// estimate currently infected
function estimateInfected({ reportedCases, numberInfected }) {
  return reportedCases * numberInfected;
}

// normalise duration in days
function normaliseDurationInDays({ periodType, timeToElapse }) {
  switch (periodType) {
    case 'weeks':
      return timeToElapse * 7;
    case 'months':
      return timeToElapse * 31;
    default:
      return timeToElapse;
  }
}

// estimate infections by requested time
function estimateInfectionsByRequestedTime({
  currentlyInfected,
  durationInDays
}) {
  const infectionsDoublePeriodInDays = 3;
  return Math.floor(
    currentlyInfected * (2 ** durationInDays / infectionsDoublePeriodInDays)
  );
}

// estimate cases
function estimateCases(data, numberInfected) {
  const { reportedCases, periodType, timeToElapse } = data;

  const durationInDays = normaliseDurationInDays({ periodType, timeToElapse });

  // challenge 1 codes
  const currentlyInfected = estimateInfected({ reportedCases, numberInfected });
  const infectionsByRequestedTime = estimateInfectionsByRequestedTime({
    currentlyInfected,
    durationInDays
  });

  return {
    currentlyInfected,
    infectionsByRequestedTime
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
