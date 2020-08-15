const itemPostRequests = (function() {
  return {
    makeRequest: async function(postRoute, postBody) {
      let subBody = {};
      for ( let [ key, value ] of postBody) {
        subBody[key] = value
      }

      subBody = JSON.stringify(subBody)

      const postRes = fetch(`/${postRoute}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: subBody
      });

      return postRes;
    }
  }
}());

export default itemPostRequests;