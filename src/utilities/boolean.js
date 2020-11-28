const boolean = (function(){
  return {
    displayBooloean: function(boolVal) {
      if (boolVal) {
        return 'true'
      } else {
        return 'false'
      }
    }
  }
}());

export default boolean;