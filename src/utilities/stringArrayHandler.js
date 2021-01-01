const stringArrayHandler = (function(){
  const stringToArray = (string) => {
    // validate and convert offering ids
    let returnVal = string;
    if (typeof string === 'string' && string !== '') {
      if (!string.includes(',')) {
        returnVal = [Number.parseInt(string)];
      } else {
        returnVal = string.split(',');
      }
    }
    return returnVal
  }

  return {
    getArrayFromString: function(string) {
      return stringToArray(string);
    }
  }
}())

export default stringArrayHandler;