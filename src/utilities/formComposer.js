const formComposer = (function(){
  const formToObject = function(formBody) {
    let subBody = {};
    for ( let [ key, value ] of formBody) {
      subBody[key] = value
    }
    return subBody;
  }
  return {
    getObjectFromForm: function(formBody) {
      return formToObject(formBody);
    }
  }
}());

export default formComposer;