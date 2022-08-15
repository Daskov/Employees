import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, postsAPI } from "../constants";
import axios from "axios";

export const createUserAsync = createAsyncThunk(
  "userSlice/createUserAsync",
  async ({ userEmail, userPassword, post, position, admin }) => {
    try {
      await axios.post(API, {
        userEmail,
        userPassword,
        post,
        position,
        admin,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUsersAsync = createAsyncThunk(
  "userSlice/fetchUsersAsync",
  async () => {
    try {
      const { data } = await axios.get(API);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "userSlice/deleteUserAsync",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${API}/${id}`);
      dispatch(fetchUsersAsync());
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUserToEdit = createAsyncThunk(
  "userSlice/fetchUserToEdit",
  async (id) => {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const saveEditedUser = createAsyncThunk(
  "userSlice/saveEditedPost",
  async (editedUser, { dispatch }) => {
    try {
      await axios.put(`${API}/${editedUser.id}`, editedUser);
      dispatch(fetchUserToEdit(editedUser.id));
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPostsAsync = createAsyncThunk(
  "userSlice/fetchPostsAsync",
  async () => {
    try {
      const { data } = await axios.get(postsAPI);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  users: [],
  popUp: false,
  posts: [],
  postToEdit: null,
  isAdmin: false,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setPopUp: (state, { payload }) => {
      state.popUp = payload;
    },
    setIsAdmin: (state, { payload }) => {
      state.isAdmin = payload;
    },
    setIsAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
  },
  extraReducers: {
    [createUserAsync.fulfilled]: (state) => {
      state.popUp = true;
    },
    [fetchUsersAsync.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },
    [deleteUserAsync.fulfilled]: (state) => {
      state.popUp = true;
    },
    [fetchUserToEdit.fulfilled]: (state, { payload }) => {
      state.postToEdit = payload;
    },
    [saveEditedUser.fulfilled]: (state) => {
      state.popUp = true;
    },
    [fetchPostsAsync.fulfilled]: (state, { payload }) => {
      state.posts = payload;
    },
  },
});

export const { setPopUp, setIsAdmin, setIsAuth } = userSlice.actions;

export default userSlice.reducer;
