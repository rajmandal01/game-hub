import React, { useState } from "react";
import usePosts from "./hooks/usePosts";

export default function Posts() {
  const [userId, setUserId] = useState<number | undefined>();
  const { data: posts, error, isLoading } = usePosts(userId);
  if (isLoading) <p>Loading posts...</p>;
  if (error) <p>{error.message}</p>;

  return (
    <div>
      {
        <select
          className="form-select mb-3"
          onChange={(event) => setUserId(parseInt(event.target.value))}
          value={userId}
        >
          <option value="">Select User</option>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
        </select>
      }
      {posts?.map((post) => (
        <div>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
