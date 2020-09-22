import React from 'react';
import './DetailView.css';

// React component imports
// item components
import PotionForm from '../../Components/PotionForm/PotionForm';
import PotionDisplay from '../../Components/PotionDisplay/PotionDisplay';
import WeaponForm from '../../Components/WeaponForm/WeaponForm';
import WeaponDisplay from '../../Components/WeaponDisplay/WeaponDisplay';
import ArmorForm from '../../Components/ArmorForm/ArmorForm';
import ArmorDisplay from '../../Components/ArmorDisplay/ArmorDisplay';
import SupplierForm from '../../Components/SupplierForm/SupplierForm';
import SupplierDisplay from '../../Components/SupplierDisplay/SupplierDisplay';
// npc components
import TownBehaviorDisplay from '../../Components/TownBehaviorDisplay/TownBehaviorDisplay';
import TownBehaviorForm from '../../Components/TownBehaviorForm/TownBehaviorForm';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_REFRESH } from '../../actions/types';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetail = this.getDetail.bind(this);
    this.getPotionDetail = this.getPotionDetail.bind(this);
    this.getWeaponDetail = this.getWeaponDetail.bind(this);
    this.getArmorDetail = this.getArmorDetail.bind(this);
    this.getSupplierDetail = this.getSupplierDetail.bind(this);
    this.getTownBehaviorDetail = this.getTownBehaviorDetail.bind(this);
  }

  getPotionDetail() {
    if (this.props.targetId === null || this.props.edit) {
      return <PotionForm />
    } else {
      return <PotionDisplay />
    }
  }

  getWeaponDetail() {
    if (this.props.targetId === null || this.props.edit) {
      return <WeaponForm />
    } else {
      return <WeaponDisplay />
    }
  }

  getArmorDetail() {
    if (this.props.targetId === null || this.props.edit) {
      return <ArmorForm />
    } else {
      return <ArmorDisplay />
    }
  }

  getSupplierDetail() {
    if (this.props.targetId === null || this.props.edit) {
      return <SupplierForm />
    } else {
      return <SupplierDisplay />
    }
  }

  getTownBehaviorDetail() {
    if (this.props.targetId === null || this.props.edit) {
      return <TownBehaviorForm />
    } else {
      return <TownBehaviorDisplay />
    }
  }

  getDetail() {
    if (!this.props.formType) {
      return (<div className="BlankForm">no details to display</div>);
    }
    if (this.props.refresh) {
      this.props.setRefresh(false);
      return '';
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
      case 'town_behavior':
        return this.getTownBehaviorDetail();
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
    edit: state.detail.edit,
    refresh: state.detail.refresh
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);