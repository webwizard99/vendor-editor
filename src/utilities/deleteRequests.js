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

      console.log(deleteRes);
      return deleteRes;
    }
  }
}());

export default deleteRequests;