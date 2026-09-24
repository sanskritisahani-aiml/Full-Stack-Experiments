export const getPosts = () => {
  const posts = localStorage.getItem("posts");

  if (!posts) {
    return [];
  }

  return JSON.parse(posts);
};

export const savePosts = (posts) => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

export const addPost = (post) => {
  const posts = getPosts();

  const newPost = {
    id: Date.now(),
    title: post.title,
    content: post.content,
    platform: post.platform,
    date: post.date,
    status: post.status,
    author: post.author,
  };

  const updatedPosts = [...posts, newPost];

  savePosts(updatedPosts);

  return newPost;
};

export const updatePost = (id, updatedData) => {
  const posts = getPosts();

  const updatedPosts = posts.map((post) =>
    post.id === id
      ? { ...post, ...updatedData }
      : post
  );

  savePosts(updatedPosts);

  return updatedPosts;
};

export const deletePost = (id) => {
  const posts = getPosts();

  const updatedPosts = posts.filter(
    (post) => post.id !== id
  );

  savePosts(updatedPosts);

  return updatedPosts;
};