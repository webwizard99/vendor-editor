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
import DungeonBehaviorDisplay from '../../Components/DungeonBehaviorDisplay/DungeonBehaviorDisplay';
import DungeonBehaviorForm from '../../Components/DungeonBehaviorForm/DungeonBehaviorForm';
import AdventurerClassDisplay from '../../Components/AdventurerClassDisplay/AdventurerClassDisplay';
import AdventurerClassForm from '../../Components/AdventurerClassForm/AdventurerClassForm';
import AdventurerDisplay from '../../Components/AdventurerDisplay/AdventurerDisplay';
import AdventurerForm from '../../Components/AdventurerForm/AdventurerForm';
// monster components
import MonsterDropListDisplay from '../../Components/MonsterDropListDisplay/MonsterDropListDisplay';
import MonsterDropListForm from '../../Components/MonsterDropListForm/MonsterDropListForm';
import MonsterBehaviorDisplay from '../../Components/MonsterBehaviorDisplay/MonsterBehaviorDisplay'
import MonsterBehaviorForm from '../../Components/MonsterBehaviorForm/MonsterBehaviorForm';
import MonsterDisplay from '../../Components/MonsterDisplay/MonsterDisplay';

// js utility imports
import formTypes from '../../utilities/formTypes';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_REFRESH } from '../../actions/types';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetail = this.getDetail.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadFormTable = this.loadFormTable.bind(this);
    // this.getPotionDetail = this.getPotionDetail.bind(this);
    // this.getWeaponDetail = this.getWeaponDetail.bind(this);
    // this.getArmorDetail = this.getArmorDetail.bind(this);
    // this.getSupplierDetail = this.getSupplierDetail.bind(this);
    // this.getTownBehaviorDetail = this.getTownBehaviorDetail.bind(this);
    // this.getDungeonBehaviorDetail = this.getDungeonBehaviorDetail.bind(this);
    // this.getAdventurerClassDetail = this.getAdventurerClassDetail.bind(this);
    // this.getAdventurerDetail = this.getAdventurerDetail.bind(this);
    // this.getMonsterDropListDetail = this.getMonsterDropListDetail.bind(this);
    // this.getMonsterBehaviorDetail = this.getMonsterBehaviorDetail.bind(this);
    // this.getMonsterDetail = this.getMonsterDetail.bind(this);
  }

  formTable = {};

  componentDidMount() {
    this.loadFormTable();
  }

  loadFormTable() {
    const forms = Object.values(formTypes);
    let tempTable = {};
    for (let form of forms) {
      tempTable[form] = { display: null, form: null };
    }
    this.formTable = tempTable;
    this.formTable['blank'] = (<div className="BlankForm">detail type unknown</div>);
    this.formTable[formTypes.potion].display = <PotionDisplay />;
    this.formTable[formTypes.potion].form = <PotionForm />;
    this.formTable[formTypes.armor].display = <ArmorDisplay />;
    this.formTable[formTypes.armor].form = <ArmorForm />;
    this.formTable[formTypes.weapon].display = <WeaponDisplay />;
    this.formTable[formTypes.weapon].form = <WeaponForm />;
    this.formTable[formTypes.supplier].display = <SupplierDisplay />;
    this.formTable[formTypes.supplier].form = <SupplierForm />;
    this.formTable[formTypes.town_behavior].display = <TownBehaviorDisplay />;
    this.formTable[formTypes.town_behavior].form = <TownBehaviorForm />;
    this.formTable[formTypes.dungeon_behavior].display = <DungeonBehaviorDisplay />;
    this.formTable[formTypes.dungeon_behavior].form = <DungeonBehaviorForm />;
    this.formTable[formTypes.adventurer_class].display = <AdventurerClassDisplay />;
    this.formTable[formTypes.adventurer_class].form = <AdventurerClassForm />;
    this.formTable[formTypes.adventurer].display = <AdventurerDisplay />;
    this.formTable[formTypes.adventurer].form = <AdventurerForm />;
    this.formTable[formTypes.monster_drop_list].display = <MonsterDropListDisplay />;
    this.formTable[formTypes.monster_drop_list].form = <MonsterDropListForm />;
    this.formTable[formTypes.monster_behavior].display = <MonsterBehaviorDisplay />;
    this.formTable[formTypes.monster_behavior].form = <MonsterBehaviorForm />;
    this.formTable[formTypes.monster].display = <MonsterDisplay />;
    this.formTable[formTypes.monster].form = 'MonsterForm';
  }

  // getPotionDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <PotionForm />
  //   } else {
  //     return <PotionDisplay />
  //   }
  // }

  // getWeaponDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <WeaponForm />
  //   } else {
  //     return <WeaponDisplay />
  //   }
  // }

  // getArmorDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <ArmorForm />
  //   } else {
  //     return <ArmorDisplay />
  //   }
  // }

  // getSupplierDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <SupplierForm />
  //   } else {
  //     return <SupplierDisplay />
  //   }
  // }

  // getTownBehaviorDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <TownBehaviorForm />
  //   } else {
  //     return <TownBehaviorDisplay />
  //   }
  // }

  // getDungeonBehaviorDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <DungeonBehaviorForm />;
  //   } else {
  //     return <DungeonBehaviorDisplay />
  //   }
  // }

  // getAdventurerClassDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <AdventurerClassForm />
  //   } else {
  //     return <AdventurerClassDisplay />
  //   }
  // }

  // getAdventurerDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <AdventurerForm />;
  //   } else {
  //     return <AdventurerDisplay />;
  //   }
  // }

  // getMonsterDropListDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <MonsterDropListForm />;
  //   } else {
  //     return <MonsterDropListDisplay />;
  //   }
  // }

  // getMonsterBehaviorDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return <MonsterBehaviorForm />;
  //   } else {
  //     return <MonsterBehaviorDisplay />;
  //   }
  // }

  // getMonsterDetail() {
  //   if (this.props.targetId === null || this.props.edit) {
  //     return 'MonsterForm';
  //   } else {
  //     return <MonsterDisplay />;
  //   }
  // }

  getDetail() {
    
    if (!this.props.formType) {
      return (<div className="BlankForm">no details to display</div>);
    }
    if (this.props.refresh) {
      this.props.setRefresh(false);
      return '';
    }
    if (this.formTable[this.props.formType] === undefined) {
      return this.formTable['blank'];
    }
    let displayType = '';
    if (this.props.edit || this.props.targetId == null) {
      displayType = 'form';
    } else {
      displayType = 'display';
    }
    return this.formTable[this.props.formType][displayType];

    // switch(this.props.formType) {
    //   case formTypes.potion:
    //     return this.getPotionDetail();
    //   case formTypes.weapon:
    //     return this.getWeaponDetail();
    //   case formTypes.armor:
    //     return this.getArmorDetail();
    //   case formTypes.supplier:
    //     return this.getSupplierDetail();
    //   case formTypes.town_behavior:
    //     return this.getTownBehaviorDetail();
    //   case formTypes.dungeon_behavior:
    //     return this.getDungeonBehaviorDetail();
    //   case formTypes.adventurer_class:
    //     return this.getAdventurerClassDetail();
    //   case formTypes.adventurer:
    //     return this.getAdventurerDetail();
    //   case formTypes.monster_drop_list:
    //     return this.getMonsterDropListDetail();
    //   case formTypes.monster_behavior:
    //     return this.getMonsterBehaviorDetail();
    //   case formTypes.monster:
    //     return this.getMonsterDetail();
    //   default:
    //     return (<div className="BlankForm">detail type unknown</div>)
    // }
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