import React from 'react';
import './SupplierDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { fetchSuppliers } from '../../actions'
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports
import deleteRequests from '../../utilities/deleteRequests';

class SupplierDisplay extends DisplayStatic {
  constructor(props) {
    super(props);

    this.deleteSupplier = this.deleteSupplier.bind(this);
  }

  getDeleteButton() {
    const thisRef = this;
    window.dialogRef = thisRef;
    return (
      <div className="DeleteSupplierButton"
        onClick={() => this.props.setDialog({
          active: true,
          text: 'Delete Supplier and Offerings from Database?'
        })}>
        <DeleteButton />
      </div>
    )
  }

  *deleteSupplier() {
    yield deleteRequests.makeRequest('supplier', this.props.displayId);
  }

  handleYes() {
    let deleteSupplier = this.deleteSupplier();
    deleteSupplier.next().value.then(() => {
      this.props.fetchSuppliers();
      this.props.setDialog({ active: false, text: '' });
      this.props.setDisplayForm({ form: false, edit: false, displayId: null });
    });
  }

  getDisplay() {
    if (!this.props.suppliers) return '';
    const allSuppliers = this.props.suppliers;
    const thisSupplier = allSuppliers.find(supplier => supplier.id === this.props.displayId);
    const name = thisSupplier.name;
    const offerings = thisSupplier.offerings;

    return (
      <div className="SupplierDisplay">
        <div className="heading-bar">
          <h2 className="display-heading">{name}</h2>
          <div className="SupplierEditButton" onClick={() => this.props.setDisplayForm({ form: 'supplier', edit: true, targetId: thisSupplier.id })}>
            <EditButton />
          </div>
        </div>

        <div className="display-fields-area">
          <div className="display-group">
            <span className="display-label">Name</span>
            <span className="display-text">{name}</span>
          </div>
          <div className="display-group-blank">
          </div>
          <div className="offerings-display">
            <span className="display-label full-span">Offerings</span>
            <span className="display-label pad half-span">Type</span>
            <span className="display-label pad half-span">Markup</span>
            { offerings.map(offering => {
              return (
                <div className="inner-span">
                  <span className="display-text half-span left-half">
                    {offering.type}
                  </span>
                  <span className="display-text half-span right-half">
                    {offering.markup}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    suppliers: state.suppliers.suppliers,
    displayId: state.detail.targetId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setDisplayForm: (payload) => dispatch({ type: SET_DETAIL_FORM, payload: payload }),
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload }),
    fetchSuppliers: () => dispatch(fetchSuppliers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDisplay);