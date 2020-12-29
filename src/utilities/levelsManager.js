const levelsManager = (function(){
  const levels = [];

  return {
    loadLevels(levelarr) {
      for (let level of levelarr) {
        levels.push(level);
        levels.filter((level1, level2) => {
          return level1 > level2;
        })
      }
    },
    getLowestNewLevel() {
      let lowestLevel = 1;
      for (let level of levels) {
        if (level === lowestLevel) {
          lowestLevel++;
        }
      }
      return lowestLevel;
    }
  }
}());

export default levelsManager;