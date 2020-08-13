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
    const itemArr = Object.values(itemTypes);
    return itemArr.map(itemType => {
      return <option value={itemType}>{itemType}</option>
    })
  }

  getForm() {
    if (!this.props.suppliers) return '';
    const allSuppliers = this.props.suppliers;
    const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
    const newName = thisSupplier.name;
    const offerings = thisSupplier.offerings;
    console.dir(thisSupplier);
    console.dir(offerings);
    console.log(`offerings type: ${typeof offerings}`);
    
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
            <div className="input-group-blank">
            </div>
            <div className="offerings-form-area offerings-group">
              <span className="item-label full-span">Offerings</span>
              <span className="item-label pad half-span">Type</span>
              <span className="item-label pad half-span">Markup</span>
              {offerings.map(offering => {
                return (
                  <div className="inner-span">
                    <div className="half-span left-half">
                      {/* <label className="item-label" htmlFor={`offering-${offering.id}-type`}>
                        Type
                      </label> */}
                      <select className="offering-select" name={`offering-${offering.id}-type`} id={`offering-${offering.id}-type`} defaultValue={offering.type}>
                        {this.getOfferingOptions()}
                      </select>
                    </div>
                    <div className="half-span right-half">
                      {/* <label className="item-label" htmlFor={`markup-${offering.id}-type`}>
                        Markup
                      </label> */}
                      <input className="input-number" type="number" name={`markup-${offering.id}-type`} id={`markup-${offering.id}-type`} defaultValue={offering.markup}>
                      </input>
                    </div>
                  </div>
                )
              })}
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