import React from 'react';
import './SupplierForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';
import DeleteOfferingButton from '../DeleteOfferingButton/DeleteOfferingButton';
import AddOfferingButton from '../AddOfferingButton/AddOfferingButton';

import { connect } from 'react-redux';
import { fetchSuppliers } from '../../actions';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import itemTypes from '../../utilities/itemTypes';
import itemPostRequest from '../../utilities/itemPostRequests';
import itemPutRequest from '../../utilities/itemPutRequests';

class SupplierForm extends DisplayForm {
  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    }

    this.initializeFields = this.initializeFields.bind(this);
    this.getOfferingOptions = this.getOfferingOptions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFormOffering = this.addFormOffering.bind(this);
    this.deleteOffering = this.deleteOffering.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSupplier = this.updateSupplier.bind(this);
  }

  componentDidMount() {
    this.initializeFields();
  }

  initializeFields() {
    if (this.props.edit && !this.props.suppliers) return;
    let newName = '';
    let offerings = [];
    if (this.props.edit) {
      const allSuppliers = this.props.suppliers;
      const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
      newName = thisSupplier.name;
      offerings = thisSupplier.offerings;
    }
   

    let initialState = {};

    initialState['name'] = newName;
    let presentIds = [];
    if (offerings.length > 0) {
      for (const offering of offerings) {
        initialState[`offering-${offering.id}-type`] = offering.type;
        initialState[`offering-${offering.id}-markup`] = offering.markup;
        presentIds.push(offering.id);
      }
    }
    initialState.presentIds = presentIds;
    initialState.existingIdCount = offerings.length;
    initialState.deletedIds = [];
    initialState.newOfferingIndex = 0;
    initialState.newOfferingKeys = [];
    initialState.initialized = true;
    this.setState(initialState);
  }

  handleCloseButton(e) {
    e.preventDefault();
    if (this.props.edit === false) {
      this.props.setDisplayForm({ form: false, targetId: null, edit: false });
    } else {
      this.props.setDisplayForm({ form: 'supplier', targetId: this.props.displayId, edit: false});
    }
  }

  getOfferingOptions() {
    const itemArr = Object.values(itemTypes);
    return itemArr.map(itemType => {
      return <option value={itemType}>{itemType}</option>
    })
  }

  addFormOffering() {
    // limit offerings to 5
    const totalCount = this.state.newOfferingKeys.length + this.state.existingIdCount;
    if (totalCount >= 5) return;

    let updatedState = {};
    let newOfferingIndex = this.state.newOfferingIndex;
    updatedState[`new-offering-${newOfferingIndex}-type`] = 1;
    updatedState[`new-offering-${newOfferingIndex}-markup`] = 100;
    let newOfferingKeys = this.state.newOfferingKeys;
    newOfferingKeys.push(newOfferingIndex);
    updatedState.newOfferingKeys = newOfferingKeys;
    newOfferingIndex += 1;
    updatedState.newOfferingIndex = newOfferingIndex;
    this.setState(updatedState);
    
  }

  deleteOffering(payload) {
    const { existing, offeringId } = payload
    let updatedState = {};
    if (existing) {
      let newDeleted = this.state.deletedIds;
      let newCount = this.state.existingIdCount;
      newDeleted.push(offeringId);
      newCount -= 1;
      updatedState.deletedIds = newDeleted;
      updatedState.existingIdCount = newCount;
    } else {
      let newOfferingKeys = this.state.newOfferingKeys;
      const offeringIndex = newOfferingKeys.indexOf(offeringId);
      if (offeringIndex < 0 || (offeringIndex !== 0 && !offeringIndex)) return;
      newOfferingKeys.splice(offeringIndex, 1);
      updatedState.newOfferingKeys = newOfferingKeys;
    }

    this.setState(updatedState);
  }

  handleChange(e) {
    const eleName = e.target.getAttribute('name');
    let stateUpdate = {};
    stateUpdate[eleName] = e.target.value
    this.setState(stateUpdate);
  }

  *updateSupplier(data) {
    if (this.props.edit) {
      yield itemPutRequest.makeRequest('supplier', data);
    } else {
      yield itemPostRequest.makeRequest('supplier', data);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    let updateSupplier = this.updateSupplier(data);
    updateSupplier.next().value.then(() => {
      this.props.fetchSuppliers();
      if (this.props.edit) {
        this.props.setDisplayForm({ form: 'supplier', targetId: this.props.displayId, edit: false });
      } else {
        this.props.setDisplayForm({ form: null, targetId: null, edit: false });
      }
    })
  }

  getForm() {
    if (!this.state.initialized) return '';
    
    let offerings = [];
    if (this.props.edit) {
      const allSuppliers = this.props.suppliers;
      const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
      offerings = thisSupplier.offerings;
    }
    
    let newHeading = 'New Supplier';
    if (this.props.edit) {
      newHeading = this.state.name;
    }
    let newId = null;
    if (this.props.edit) {
      newId = this.props.displayId;
    }
    const newOfferingKeys = this.state.newOfferingKeys;
    
    return (
      <div className="SupplierForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">{newHeading}</h2>
          <div className="close-supplier-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/supplier'}
          className="input-fields-area"
          id="SupplierPostForm"
          method="POST"
          onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="supplier name"
                maxLength="26" onChange={this.handleChange} value={this.state.name}></input>
            </div>
            <div className="input-group-blank">
            </div>
            <div className="offerings-group">
              <span className="item-label form-full-span">Offerings</span>
              <span className="item-label form-pad form-half-span">Type</span>
              <span className="item-label form-pad form-half-span">Markup</span>
              {offerings.length <= 0 ? '' : offerings.map(offering => {
                let deletedMap = this.state.deletedIds;
                if (deletedMap.length > 0 && deletedMap.includes(offering.id)) {
                  return ''
                }
                return (
                  <div className="form-inner-span">
                    <div className="form-half-span form-left-half">
                      <select className="offering-select" 
                        name={`offering-${offering.id}-type`} 
                        id={`offering-${offering.id}-type`} 
                        onChange={this.handleChange} 
                        value={this.state[`offering-${offering.id}-type`]}>
                        {this.getOfferingOptions()}
                      </select>
                    </div>
                    <div className="form-half-span form-right-half">
                      <input className="input-number" 
                        type="number" 
                        name={`offering-${offering.id}-markup`} 
                        id={`offering-${offering.id}-markup`} 
                        onChange={this.handleChange} 
                        value={this.state[`offering-${offering.id}-markup`]}>
                      </input>
                      <span className="offeringDelete"
                        onClick={() => this.deleteOffering({ existing: true, offeringId: offering.id })}
                      >
                        <DeleteOfferingButton />
                      </span>
                    </div>
                  </div>
                )
              })}
            {newOfferingKeys.length <= 0 ? '' : newOfferingKeys.map(index => {
              return (
                <div className="form-inner-span">
                  <div className="form-half-span form-left-half">
                    <select className="offering-select"
                      name={`new-offering-${index}-type`}
                      id={`new-offering-${index}-type`}
                      onChange={this.handleChange}
                      value={this.state[`new-offering-${index}-type`]}>
                        {this.getOfferingOptions()}
                    </select>
                  </div>
                  <div className="form-half-span form-right-half">
                    <input className="input-number"
                      type="number"
                      name={`new-offering-${index}-markup`}
                      id={`new-offering-${index}-markup`}
                      onChange={this.handleChange}
                      value={this.state[`new-offering-${index}-markup`]}>
                    </input>
                    <span className="offeringDelete"
                      onClick={() => this.deleteOffering({ existing: false, offeringId: index })}
                    >
                      <DeleteOfferingButton />
                    </span>
                  </div>
                </div>
              )
            })}
            <div className="offeringAdd form-full-span form-center-content"
              onClick={this.addFormOffering}
            >
              <AddOfferingButton />
            </div>
          </div>
          <div className="supplier-group-blank">
          </div>
          <input type="hidden" name="existingIds" value={this.state.presentIds} />
          <input type="hidden" name="deletedIds" value={this.state.deletedIds} />
          <input type="hidden" name="newIndexes" value={this.state.newOfferingKeys} />
          <input type="hidden" name="newOfferingsCount" value={this.state.newOfferingsCount} />
          <input type="hidden" name="id" value={newId} />
          <input type="submit" value={this.props.edit ? 'Update Supplier' : 'Create Supplier' } className="button create-button"></input>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    edit: state.detail.edit,
    suppliers: state.suppliers.suppliers,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    fetchSuppliers: () => dispatch(fetchSuppliers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierForm);