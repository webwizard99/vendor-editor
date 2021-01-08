const levelsManager = (function(){
  const levels = [];

  return {
    loadLevels(levelarr) {
      for (let level of levelarr) {
        levels.push(level);
      }
      levels.filter((level1, level2) => {
        return level1.number > level2.number;
      })
      console.log(levels);
    },
    getLowestNewLevel() {
      let lowestLevel = 1;
      for (let level of levels) {
        if (level.number === lowestLevel) {
          lowestLevel++;
        }
      }
      console.log(lowestLevel);
      return lowestLevel;
    }
  }
}());

export default levelsManager;