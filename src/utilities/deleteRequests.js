const deleteRequests = (function(){
  return {
    makeRequest: function(deleteType, deleteId) {
      console.log(deteId);
      const deleteRes = fetch(`/${deleteType}/${deleteId}`, {
        method: 'DELETE'
      });
      return deleteRes;
    }
  }
}());

export default deleteRequests;