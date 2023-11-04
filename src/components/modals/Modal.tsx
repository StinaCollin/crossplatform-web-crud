import React, { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onCancel, onConfirm, onDelete, initialFirstName, initialLastName }) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Last Name"
        />
        <button onClick={() => onConfirm(firstName, lastName)}>Save Changes</button>
        <button onClick={onDelete}>Delete User</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default Modal;