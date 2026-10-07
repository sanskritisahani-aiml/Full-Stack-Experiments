import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    // Add a new post
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },

    // Delete a post
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== action.payload
      );
    },

    // Update/Edit a post
    updatePost: (state, action) => {
      const { id, content } = action.payload;

      const post = state.posts.find(
        (post) => post.id === id
      );

      if (post) {
        post.content = content;
      }
    },
  },
});

export const {
  addPost,
  deletePost,
  updatePost,
} = postSlice.actions;

export default postSlice.reducer;