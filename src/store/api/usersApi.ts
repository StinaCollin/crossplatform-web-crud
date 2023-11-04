import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../firebase-config';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
case 'GET':
	const snapshot = await getDocs(collection(db, url));
	const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
	return { data: fetchedData };

    case 'POST':
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };

    case 'PUT':
      const { id, data } = body;
      await setDoc(doc(collection(db, 'users'), id), data);
      return { data: { id, ...data } };

    case 'DELETE':
      console.log('Dokument-ID:', body.id);
      await deleteDoc(doc(collection(db, 'users'), body.id));
      return { data: { success: true } };

    default:
      throw new Error(`Unhandled method ${method}`);
  }
};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: firebaseBaseQuery,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: '',
        url: 'users',
        method: 'POST',
        body: user
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        baseUrl: '',
        url: 'users',
        method: 'GET',
        body: {},
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        baseUrl: '',
        url: 'users',
        method: 'DELETE',
        body: { id },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        baseUrl: '',
        url: 'users',
        method: 'PUT',
        body: { id, data },
      }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApi;
