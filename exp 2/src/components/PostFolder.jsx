function PostForm({
  text,
  setText,
  platform,
  setPlatform,
  date,
  setDate,
  status,
  setStatus,
  handleAdd,
  editingId,
}) {
  return (
    <>
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
    </>
  );
}

export default PostForm;