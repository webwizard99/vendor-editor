const itemPostRequests = (function() {
  return {
    makeRequest: async function(postRoute, postBody) {
      let subBody = {};
      for ( let [ key, value ] of postBody) {
        subBody[key] = value
      }

      subBody = JSON.stringify(subBody)

      let postRes;
      fetch(`/${postRoute}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: subBody
      }).then(res => res.json())
        .then(data => postRes = data);

      console.log(postRes);
      return postRes;
    }
  }
}());

export default itemPostRequests;