const levelsManager = (function(){
  const levels = [];

  return {
    loadLevels(levelarr) {
      for (let level of levelarr) {
        levels.push(level);
      }
      levels.sort((level1, level2) => {
        if (level1 > level2) {
          return 1;
        } else if (level2 > level1) {
          return -1;
        } else {
          return 0;
        };
      })
      console.log(levels);
    },
    getLowestNewLevel() {
      let lowestLevel = 1;
      for (let level of levels) {
        if (level === lowestLevel) {
          lowestLevel++;
        }
      }
      console.log(lowestLevel);
      return lowestLevel;
    }
  }
}());

export default levelsManager;