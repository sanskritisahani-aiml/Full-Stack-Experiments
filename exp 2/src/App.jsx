import "./App.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, selectTotalPosts } from "./features/posts/postSelectors";
import {
  addPost,
  deletePost,
  updatePost,
} from "./features/posts/postSlice";

function App() {
  const [text, setText] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Draft");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const posts = useSelector(selectPosts);
  const totalPosts = useSelector(selectTotalPosts);

  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === "" || date === "") {
      alert("Please fill all the fields!");
      return;
    }

    if (editingId !== null) {
      dispatch(
        updatePost({
          id: editingId,
          content: text,
          platform: platform,
          date: date,
          status: status,
        })
      );
      setEditingId(null);
    } else {
      dispatch(
        addPost({
          id: Date.now(),
          content: text,
          platform: platform,
          date: date,
          status: status,
        })
      );
    }

    setText("");
    setPlatform("Instagram");
    setDate("");
    setStatus("Draft");
  };

  return (
    <div className="container">
      <h1>Redux Content  
        Manager</h1>

      <input
        type="text"
        placeholder="Write a post..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <label><strong>Platform</strong></label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option value="Instagram">Instagram</option>
        <option value="Facebook">Facebook</option>
        <option value="Twitter">Twitter</option>
        <option value="LinkedIn">LinkedIn</option>
      </select>

      <br />
      <br />

      <label><strong>Publish Date</strong></label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br />
      <br />

      <label><strong>Status</strong></label>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>

      <br />
      <br />

      <button onClick={handleAdd}>
        {editingId !== null ? "Update Post" : "Add Post"}
      </button>

      <hr />

      <h2>Posts</h2>
      <h3>Total Posts: {totalPosts}</h3>

      <input
        type="text"
        placeholder="🔍 Search Posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts
          .filter((post) =>
            post.content.toLowerCase().includes(search.toLowerCase())
          )
          .map((post) => (
            <div className="post" key={post.id}>
              <p>{post.content}</p>
              <p><strong>Platform:</strong> {post.platform}</p>
              <p><strong>Date:</strong> {post.date}</p>
              <p><strong>Status:</strong> {post.status}</p>

              <button
                onClick={() => {
                  setEditingId(post.id);
                  setText(post.content);
                  setPlatform(post.platform);
                  setDate(post.date);
                  setStatus(post.status);
                }}
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deletePost(post.id))}
              >
                Delete
              </button>
            </div>
          ))
      )}
    </div>
  );
}

export default App;