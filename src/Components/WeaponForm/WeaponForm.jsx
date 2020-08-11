import React from 'react';
import './WeaponForm.css';

import DisplayForm from '../DisplayForm/DisplayForm';
// import CloseFormButton from '../CloseFormButton/CloseFormButton';

class WeaponForm extends DisplayForm {
  getForm() {
    return (
      <div className="WeaponForm">
        WeaponForm
      </div>
    )
  }
}

export default WeaponForm;