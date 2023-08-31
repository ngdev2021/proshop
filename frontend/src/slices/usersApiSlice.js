import { USERS_URL } from '../constants';
import { apiSlice} from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({ 
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,

            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        // updateUser: builder.mutation({
        //     query: (data, id) => ({
        //         url: `${USERS_URL}/${id}/updateuser`,
        //         method: 'PUT',
        //         body: data,
        //     }),
        // }),
        createUsers: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/createuser`,
                method: 'POST',
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: ({pageNumber}) => ({
                url: `${USERS_URL}`,
                method: 'GET',
                params: {pageNumber},
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        // updateUser: builder.mutation({
        //     query: ({ id, data }) => ({
        //         url: `${USERS_URL}/${id}`,
        //         method: 'PUT',
        //         body: data,
        //     }),
        // }),
        getUserDetails: builder.query({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: ( data ) => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),

    }),

});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useDeleteUserMutation, useProfileMutation, useGetUserByIdQuery, useGetUsersQuery, useCreateUsersMutation, useGetUserDetailsQuery } = usersApiSlice;
