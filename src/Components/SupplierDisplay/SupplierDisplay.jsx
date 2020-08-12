import React from 'react';
import './SupplierDisplay.css';

import DisplayStatic from '../DisplayStatic/DisplayStatic';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_FORM, SET_DIALOG } from '../../actions/types';

// js utility imports

class SupplierDisplay extends DisplayStatic {
  getDeleteButton() {
    return (
      <div className="DeleteSupplierButton">
        <DeleteButton />
      </div>
    )
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
          <div className="display-group">
            {/* left blank for spacing */}
          </div>
          <div className="display-group offerings-display">
            <span className="display-label full-span">Offerings</span>
            <span className="display-label half-span left-half">Type</span>
            <span className="display-label half-span right-half">Markup</span>
            { offerings.map(offering => {
              return (
                <div className="inner-span">
                  <span className="display-label half-span left-half">
                    {offering.type}
                  </span>
                  <span className="display-label half-span right-half">
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
    setDialog: (payload) => dispatch({ type: SET_DIALOG, payload: payload })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierDisplay);