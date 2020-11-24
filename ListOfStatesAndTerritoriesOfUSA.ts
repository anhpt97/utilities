const usaStates = require('usa-states').UsaStates;

export const getListOfStatesAndTerritoriesOfUSA = () => {
  return new usaStates().states.map(
    ({ name, abbreviation }) => ({ name, abbreviation }),
  );
};
