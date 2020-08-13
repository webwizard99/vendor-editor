import React from 'react';
import './SupplierForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
import CloseFormButton from '../CloseFormButton/CloseFormButton';

import { connect } from 'react-redux';
import { SET_DETAIL_FORM } from '../../actions/types';

// js imports
import itemTypes from '../../utilities/itemTypes';

class SupplierForm extends DisplayForm {
  constructor(props) {
    super(props);

    this.getOfferingOptions = this.getOfferingOptions.bind(this);
  }
  
  getMethod() {
    if (!this.props.edit) {
      return '_post'
    } else {
      return '_put'
    }
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
    return itemTypes.map(itemType => {
      return <option value={itemType}>{itemType}</option>
    })
  }

  getForm() {
    if (!this.props.suppliers) return '';
    const allSuppliers = this.props.suppliers;
    const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
    const newName = thisSupplier.name;
    const offerings = thisSupplier.offerings;
    console.dir(`supplier: ${thisSupplier}`);
    console.log(offerings);
    
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
                maxLength="26" defaultValue={newName}></input>
            </div>
            <div className="offerings-form-area">
              <span className="item-label full-span">Offerings</span>
              <span className="item-label half-span">Type</span>
              <span className="item-label half-span">Markup</span>
              
            </div>
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