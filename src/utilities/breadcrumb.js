import { store } from '../index';
import { SET_DETAIL_FORM, SET_BREADCRUMB, SET_BREADCRUMB_FORMDATA } from '../actions/types'

const breadcrumb = (function(){
  let breadcrumb = null;
  
  const Breadcrumb = function(payload) {
    const {
      displayPayload,
      formData,
      name
    } = payload;
    this.displayPayload = displayPayload;
    this.formData = formData;
    this.name = name;
  }

  Breadcrumb.prototype.dispatchDisplay = function() {
    store.dispatch({ type: SET_DETAIL_FORM, payload: this.displayPayload });
  }

  Breadcrumb.prototype.dispatchFormdata = function() {
    store.dispatch({ type: SET_BREADCRUMB_FORMDATA, formData: this.formData });
  }

  Breadcrumb.prototype.dispatchBreadcrumb = function() {
    const breadcrumbPayload = { payload: { active: true, name: this.name } };
    store.dispatch({ type: SET_BREADCRUMB, payload: breadcrumbPayload });
  }

  const setBreadcrumb = function(newBreadcrumb) {
    breadcrumb = newBreadcrumb;
  }

  const clearBreadcrumbState = function() {
    store.dispatch({ type: SET_BREADCRUMB, payload: { value: false, name: '' }});
    
  }

  const clearBreadcrumbFormdata = function() {
    store.dispatch({ type: SET_BREADCRUMB_FORMDATA, formData: null });
  }

  return {
    setNewBreadcrumb: function(payload) {
      breadcrumb = new Breadcrumb(payload);
      breadcrumb.dispatchFormdata();
      breadcrumb.dispatchBreadcrumb();
    },

    clearBreadcrumb: function() {
      setBreadcrumb(null);
      clearBreadcrumbState();  
    },

    revertToBreadcrumb: function() {
      clearBreadcrumbState();
      breadcrumb.dispatchDisplay();
    },

    clearBreadcrumbForm: function() {
      clearBreadcrumbFormdata();
    }
  }
}());

export default breadcrumb;