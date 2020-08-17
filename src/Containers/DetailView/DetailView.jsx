import React from 'react';
import './DetailView.css';

// React component imports
import PotionForm from '../../Components/PotionForm/PotionForm';
import PotionDisplay from '../../Components/PotionDisplay/PotionDisplay';
import WeaponForm from '../../Components/WeaponForm/WeaponForm';
import WeaponDisplay from '../../Components/WeaponDisplay/WeaponDisplay';
import ArmorForm from '../../Components/ArmorForm/ArmorForm';
import ArmorDisplay from '../../Components/ArmorDisplay/ArmorDisplay';
import SupplierForm from '../../Components/SupplierForm/SupplierForm';
import SupplierDisplay from '../../Components/SupplierDisplay/SupplierDisplay';

// redux imports
import { connect } from 'react-redux';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetail = this.getDetail.bind(this);
    this.getPotionDetail = this.getPotionDetail.bind(this);
    this.getWeaponDetail = this.getWeaponDetail.bind(this);
    this.getArmorDetail = this.getArmorDetail.bind(this);
    this.getSupplierDetail = this.getSupplierDetail.bind(this);
  }

  getPotionDetail() {
    if (this.props.targetId === null || this.props.edit) {
      if (this.props.targetId === null) {
        return <PotionForm />
      } else {
        return <PotionForm />
      }
      
    } else {
      return <PotionDisplay />
    }
  }

  getWeaponDetail() {
    if (this.props.targetId === null || this.props.edit) {
      if (this.props.targetId === null) {
        return <WeaponForm />
      } else {
        return <WeaponForm />
      }
      
    } else {
      return <WeaponDisplay />
    }
  }

  getArmorDetail() {
    if (this.props.targetId === null || this.props.edit) {
      if (this.props.targetId === null) {
        return <ArmorForm />
      } else {
        return <ArmorForm />
      }
      
    } else {
      return <ArmorDisplay />
    }
  }

  getSupplierDetail() {
    if (this.props.targetId === null || this.props.edit) {
      if (this.props.targetId === null) {
        return <SupplierForm />
      } else {
        return <SupplierForm />
      }
      
    } else {
      return <SupplierDisplay />
    }
  }

  getDetail() {
    if (!this.props.formType) {
      return (<div className="BlankForm">no details to display</div>);
    }

    switch(this.props.formType) {
      case 'potion':
        return this.getPotionDetail();
      case 'weapon':
        return this.getWeaponDetail();
      case 'armor':
        return this.getArmorDetail();
      case 'supplier':
        return this.getSupplierDetail();
      default:
        return (<div className="BlankForm">detail type unknown</div>)
    }
  }
  
  render() {
    return (
      <div className="DetailView">
        {this.getDetail()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formType: state.detail.type,
    targetId: state.detail.targetId,
    edit: state.detail.edit
  }
}

export default connect(mapStateToProps)(DetailView);