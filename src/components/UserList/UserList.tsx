import React, { useState } from 'react';
import Modal from '../modals/Modal';
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../store/api/usersApi';
import styles from './UserList.module.css';

export const UserList = () => {
  const { data: users, isLoading, refetch } = useGetUsersQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: null, firstName: '', lastName: '' });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCancelClick = () => {
    setSelectedUser({ id: null, firstName: '', lastName: '' });
    setIsModalOpen(false);
  };

  const handleConfirmUpdate = async (newFirstName, newLastName) => {
    try {
      await updateUser({ id: selectedUser.id, data: { firstName: newFirstName, lastName: newLastName } });
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (isLoading) {
    return <div>Användarlistan laddar...</div>;
  }

  return (
    <div>
      <h2>Användarlista: </h2>
      <table>
        <thead>
          <tr>
            <th className={styles.headertd}>Förnamn </th>
            <th className={styles.headertd}>Efternamn</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td onClick={() => handleDeleteClick(user)}>{user.firstName}</td>
              <td onClick={() => handleDeleteClick(user)}>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button  className={styles.refetchButton} onClick={() => refetch()}>Reload</button>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onCancel={handleCancelClick}
          onConfirm={handleConfirmUpdate}
          onDelete={handleConfirmDelete}
          initialFirstName={selectedUser.firstName}
          initialLastName={selectedUser.lastName}
        />
      )}
    </div>
  );
};


(
	<input
		className={styles.textInput}
	/>
)


