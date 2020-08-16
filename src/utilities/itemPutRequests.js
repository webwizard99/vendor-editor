const itemPutRequests = (function(){
  return {
    makeRequest: async function(putRoute, putBody) {
      let subBody = {};
      for ( let [ key, value ] of postBody) {
        subBody[key] = value
      }

      subBody = JSON.stringify(subBody)

      const postRes = fetch(`/${postRoute}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: subBody
      });

      return putRes;
    }
  }
}());