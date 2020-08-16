import React from 'react';
import './SupplierForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';
import DeleteOfferingButton from '../DeleteOfferingButton/DeleteOfferingButton';

import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import itemTypes from '../../utilities/itemTypes';

class SupplierForm extends DisplayForm {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.initializeFields = this.initializeFields.bind(this);
    this.getOfferingOptions = this.getOfferingOptions.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addFormOffering = this.addFormOffering.bind(this);
    this.deleteOffering = this.deleteOffering.bind(this);
  }

  componentDidMount() {
    this.initializeFields();
  }

  initializeFields() {
    if (!this.props.suppliers) return;
    const allSuppliers = this.props.suppliers;
    const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
    const newName = thisSupplier.name;
    const offerings = thisSupplier.offerings;

    let initialState = {};

    initialState['name'] = newName;
    let presentIds = [];
    for (const offering of offerings) {
      initialState[`offering-${offering.id}-type`] = offering.id;
      initialState[`markup-${offering.id}-type`] = offering.markup;
      presentIds.push(offering.id);
    }
    initialState.presentIds = presentIds;
    initialState.existingIdCount = offerings.length;
    initialState.deletedIds = [];
    initialState.newOfferingsCount = 0;
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

  }

  deleteOffering(offeringId) {
    console.log(`delete ${offeringId}`);
  }

  handleChange(e) {
    const eleName = e.target.getAttribute('name');
    let stateUpdate = {};
    stateUpdate[eleName] = e.target.value
    this.setState(stateUpdate);
  }

  getForm() {
    if (!this.state.name) return '';
    const allSuppliers = this.props.suppliers;
    const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
    const newName = thisSupplier.name;
    const offerings = thisSupplier.offerings;
    
    return (
      <div className="SupplierForm">
        <div className="form-heading-bar">
          <h2 className="form-heading">{newName}</h2>
          <div className="close-supplier-btn" onClick={this.handleCloseButton}>
            <CloseFormButton />
          </div>
        </div>

        <form action={'/suppliers'}
          className="input-fields-area"
          id="SupplierPostForm"
          method="POST">
            <div className="input-group">
              <label className="item-label" htmlFor="name">Name</label>
              <input type="text" name="name" id="name" className="input-text" placeholder="weapon name"
                maxLength="26" onChange={this.handleChange} value={this.state.name}></input>
            </div>
            <div className="input-group-blank">
            </div>
            <div className="offerings-group">
              <span className="item-label form-full-span">Offerings</span>
              <span className="item-label form-pad form-half-span">Type</span>
              <span className="item-label form-pad form-half-span">Markup</span>
              {offerings.map(offering => {
                return (
                  <div className="form-inner-span">
                    <div className="form-half-span form-left-half">
                      {/* <label className="item-label" htmlFor={`offering-${offering.id}-type`}>
                        Type
                      </label> */}
                      <select className="offering-select" 
                        name={`offering-${offering.id}-type`} 
                        id={`offering-${offering.id}-type`} 
                        onChange={this.handleChange} 
                        value={this.state[`offering-${offering.id}-type`]}>
                        {this.getOfferingOptions()}
                      </select>
                    </div>
                    <div className="form-half-span form-right-half">
                      {/* <label className="item-label" htmlFor={`markup-${offering.id}-type`}>
                        Markup
                      </label> */}
                      <input className="input-number" 
                        type="number" 
                        name={`markup-${offering.id}-type`} 
                        id={`markup-${offering.id}-type`} 
                        onChange={this.handleChange} 
                        value={this.state[`markup-${offering.id}-type`]}>
                      </input>
                      <div className="offeringDelete"
                        onClick={() => this.deleteOffering(offering.id)}
                      >
                        <DeleteOfferingButton />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          <input type="hidden" name="existingIds" value={this.state.presentIds} />
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
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierForm);