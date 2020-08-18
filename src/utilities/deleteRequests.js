const deleteRequests = (function(){
  return {
    makeRequest: async function(deleteType, deleteId) {
      const deleteRes = await fetch(`/${deleteType}/${deleteId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          return data
        });
      return deleteRes;
    },
    makeRequestSupplier: async function(payload) {
      const {
        route, id, offeringIds
      } = payload;

      let data = {
        id: id,
        offeringIds
      }

      data = JSON.stringify(data);

      const deleteRes = await fetch(`/${route}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: data
      })
        .then(response => response.json())
        .then(data => {
          return data
        });
      return deleteRes;
    }
  }
}());

export default deleteRequests;