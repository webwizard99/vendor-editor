import React from 'react';
import './SupplierList.css';

import ExpandableList from '../ExpandableList/ExpandableList';
import NewButton from '../NewButton/NewButton';

// redux imports
import { connect } from 'react-redux';

class SupplierList extends ExpandableList {
  constructor(props) {
    super(props);

    this.displayContents = this.displayContents.bind(this);
    this.getNewButton = this.getNewButton.bind(this);
  }

  getTitle() {
    return 'Suppliers';
  }

  getNewButton() {
    return (
      <div className="NewSupplierButton">
        <NewButton />
      </div>
    )
  }

  displayContents() {
    if (!this.props.suppliers) {
      return '';
    } else {
      const newSuppliers = this.props.suppliers;
      return (
        <div className="detailList">
          { newSuppliers.map(supplier => {
            let supplierClass = "ListDetail";
            if (this.props.form === 'supplier' && this.props.targetId === supplier.id) {
              supplierClass += " activeItem";
            }
            return (
              <p>
                <span className={supplierClass}
                >{supplier.name}</span>
              </p>
            )
          })}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    suppliers: state.suppliers.suppliers,
    form: state.detail.type,
    targetId: state.detail.targetId
  }
}

export default connect(mapStateToProps)(SupplierList);