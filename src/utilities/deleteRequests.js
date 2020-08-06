const deleteRequests = (function(){
  return {
    makeRequest: async function(deleteType, deleteId) {
      const deleteRes = await fetch(`/${deleteType}/${deleteId}`, {
        method: 'DELETE'
      });
      return deleteRes;
    }
  }
}());

export default deleteRequests;