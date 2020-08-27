const usaStates = require('usa-states').UsaStates;

export const getListOfStatesAndTerritoriesOfUSA = () => {
  return new usaStates().states.map((state: any) => ({
    name: state.name,
    abbreviation: state.abbreviation,
  }));
}
