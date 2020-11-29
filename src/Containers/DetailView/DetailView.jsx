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
import MonsterForm from '../../Components/MonsterForm/MonsterForm';
// dungeon components
import DungeonTileDisplay from '../../Components/DungeonTileDisplay/DungeonTileDisplay';
import DungeonTileForm from '../../Components/DungeonTileForm/DungeonTileForm';

// js utility imports
import formTypes from '../../utilities/formTypes';
import breadcrumb from '../../utilities/breadcrumb';

// redux imports
import { connect } from 'react-redux';
import { SET_DETAIL_REFRESH } from '../../actions/types';

class DetailView extends React.Component {
  constructor(props) {
    super(props);

    this.getDetail = this.getDetail.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.loadFormTable = this.loadFormTable.bind(this);
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
    this.formTable[formTypes.monster].form = <MonsterForm />;
    this.formTable[formTypes.dungeon_tile].display = <DungeonTileDisplay />;
    this.formTable[formTypes.dungeon_tile].form = <DungeonTileForm />;
  }

  
  getDetail() {
    if (this.props.breadcrumbActive && (this.props.breadcrumbName !== this.props.formType)) {
      breadcrumb.clearBreadcrumb();
      breadcrumb.clearBreadcrumbForm();
    }

    if (!this.props.formType) {
      return (<div className="BlankForm">no details to display</div>);
    }
    // set display blank for refresh state to wipe display state
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
    refresh: state.detail.refresh,
    breadcrumbName: state.breadcrumb.name,
    breadcrumbActive: state.breadcrumb.active
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRefresh: (value) => dispatch({ type: SET_DETAIL_REFRESH, value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);