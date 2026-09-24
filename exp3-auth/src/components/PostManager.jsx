import { useEffect, useState } from "react";
import "./PostManager.css";

const STORAGE_KEY = "securecms_posts";

const defaultPosts = [
  {
    id: 1,
    title: "Welcome to SecureCMS",
    content:
      "This is a sample published post. Admins and editors can manage content while viewers can read it.",
    platform: "Website",
    status: "Published",
    author: "Admin",
    createdAt: new Date().toLocaleDateString(),
  },
];

function PostManager({ userRole }) {
  const role = userRole?.toLowerCase();

  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    platform: "Website",
    status: "Published",
  });

  /* ================================
     LOAD POSTS
  ================================= */

  useEffect(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);

    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error("Could not load posts:", error);
        setPosts(defaultPosts);
      }
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(defaultPosts)
      );

      setPosts(defaultPosts);
    }
  }, []);

  /* ================================
     SAVE POSTS
  ================================= */

  const savePosts = (updatedPosts) => {
    setPosts(updatedPosts);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedPosts)
    );
  };

  /* ================================
     INPUT HANDLER
  ================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================================
     ADD / UPDATE POST
  ================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please enter both title and content.");
      return;
    }

    if (editingId) {
      const updatedPosts = posts.map((post) =>
        post.id === editingId
          ? {
              ...post,
              title: formData.title,
              content: formData.content,
              platform: formData.platform,
              status: formData.status,
            }
          : post
      );

      savePosts(updatedPosts);

      setEditingId(null);
    } else {
      const newPost = {
        id: Date.now(),
        title: formData.title,
        content: formData.content,
        platform: formData.platform,
        status: formData.status,
        author: role === "admin" ? "Admin" : "Editor",
        createdAt: new Date().toLocaleDateString(),
      };

      savePosts([newPost, ...posts]);
    }

    resetForm();
  };

  /* ================================
     RESET FORM
  ================================= */

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      platform: "Website",
      status: "Published",
    });

    setEditingId(null);
    setShowForm(false);
  };

  /* ================================
     EDIT POST
  ================================= */

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
      platform: post.platform,
      status: post.status,
    });

    setEditingId(post.id);
    setShowForm(true);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  /* ================================
     DELETE POST
  ================================= */

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    const updatedPosts = posts.filter(
      (post) => post.id !== id
    );

    savePosts(updatedPosts);
  };

  /* ================================
     PERMISSIONS
  ================================= */

  const canCreate =
    role === "admin" || role === "editor";

  const canEdit =
    role === "admin" || role === "editor";

  const canDelete =
    role === "admin";

  /* ================================
     RENDER
  ================================= */

  return (
    <div className="post-manager">

      {/* HEADER */}

      <div className="post-manager-header">

        <div>
          <span className="post-manager-label">
            CONTENT LIBRARY
          </span>

          <h2>Manage Posts</h2>

          <p>
            {role === "admin"
              ? "Create, edit and manage all content."
              : role === "editor"
              ? "Create and edit content."
              : "Browse published content."
            }
          </p>
        </div>

        {canCreate && (
          <button
            className="add-post-button"
            onClick={() => {
              setEditingId(null);

              setFormData({
                title: "",
                content: "",
                platform: "Website",
                status: "Published",
              });

              setShowForm(!showForm);
            }}
          >
            {showForm ? "✕ Close" : "＋ Add Post"}
          </button>
        )}

      </div>

      {/* FORM */}

      {showForm && canCreate && (
        <div className="post-form-card">

          <div className="form-header">

            <div>
              <h3>
                {editingId
                  ? "Edit Post"
                  : "Create New Post"
                }
              </h3>

              <p>
                {editingId
                  ? "Update the selected content."
                  : "Add a new piece of content to SecureCMS."
                }
              </p>
            </div>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Post Title</label>

              <input
                type="text"
                name="title"
                placeholder="Enter post title..."
                value={formData.title}
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>Content</label>

              <textarea
                name="content"
                placeholder="Write your content here..."
                rows="6"
                value={formData.content}
                onChange={handleChange}
              />

            </div>

            <div className="form-row">

              <div className="form-group">

                <label>Platform</label>

                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  <option value="Website">
                    🌐 Website
                  </option>

                  <option value="Instagram">
                    📸 Instagram
                  </option>

                  <option value="Facebook">
                    📘 Facebook
                  </option>

                  <option value="Twitter">
                    🐦 Twitter
                  </option>

                  <option value="LinkedIn">
                    💼 LinkedIn
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>
                </select>

              </div>

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-post-button"
              >
                {editingId
                  ? "💾 Update Post"
                  : "🚀 Publish Post"
                }
              </button>

            </div>

          </form>

        </div>
      )}

      {/* POSTS */}

      <div className="posts-section">

        <div className="posts-section-header">

          <div>
            <h3>All Posts</h3>

            <span>
              {posts.length}{" "}
              {posts.length === 1
                ? "post"
                : "posts"
              }
            </span>
          </div>

        </div>

        {posts.length === 0 ? (

          <div className="empty-posts">

            <div className="empty-icon">
              📝
            </div>

            <h3>No posts yet</h3>

            <p>
              {canCreate
                ? "Create your first post using the Add Post button."
                : "There are currently no posts available."
              }
            </p>

          </div>

        ) : (

          <div className="posts-grid">

            {posts.map((post) => (

              <article
                className="post-card"
                key={post.id}
              >

                {/* CARD TOP */}

                <div className="post-card-top">

                  <span
                    className={`platform-badge ${post.platform
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {post.platform === "Instagram"
                      ? "📸 Instagram"
                      : post.platform === "Facebook"
                      ? "📘 Facebook"
                      : post.platform === "Twitter"
                      ? "🐦 Twitter"
                      : post.platform === "LinkedIn"
                      ? "💼 LinkedIn"
                      : "🌐 Website"
                    }
                  </span>

                  <span
                    className={`status-badge ${
                      post.status === "Published"
                        ? "published"
                        : "draft"
                    }`}
                  >
                    ● {post.status}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="post-card-content">

                  <h3>
                    {post.title}
                  </h3>

                  <p>
                    {post.content}
                  </p>

                </div>

                {/* FOOTER */}

                <div className="post-card-footer">

                  <div className="post-meta">

                    <span>
                      👤 {post.author}
                    </span>

                    <span>
                      📅 {post.createdAt}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  {(canEdit || canDelete) && (
                    <div className="post-actions">

                      {canEdit && (
                        <button
                          className="edit-button"
                          onClick={() =>
                            handleEdit(post)
                          }
                        >
                          ✏️ Edit
                        </button>
                      )}

                      {canDelete && (
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDelete(post.id)
                          }
                        >
                          🗑️ Delete
                        </button>
                      )}

                    </div>
                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default PostManager;