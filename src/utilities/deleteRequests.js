const deleteRequests = (function(){
  return {
    makeRequest: function(deleteType, deleteId) {
      console.log(deleteId);
      const deleteRes = fetch(`/${deleteType}/${deleteId}`, {
        method: 'DELETE'
      });
      return deleteRes;
    }
  }
}());

export default deleteRequests;