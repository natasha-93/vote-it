import React, { useState } from "react";
import Post from "./Post";

type Post = {
  title: string;
  upvotedBy: number[];
  downvotedBy: number[];
};

function App() {
  const [userId, setUserId] = useState(1);
  const [posts, setPosts] = useState<Post[]>([
    {
      title: "First Post",
      upvotedBy: [],
      downvotedBy: [],
    },
  ]);
  return (
    <div>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
      />

      {posts.map((post, index) => {
        const score = post.upvotedBy.length - post.downvotedBy.length;
        return (
          <Post
            key={index}
            title={post.title}
            score={score}
            onUpvote={() => {
              const newPosts = posts.map((post, i) => {
                if (index !== i) return post;

                // Always remove id from downvotes
                const downvotedBy = post.downvotedBy.filter(
                  (id) => id !== userId
                );

                // Has the user already upvoted? Then remove the upvote.
                // Otherwise, add user id to upvotes
                const upvotedBy = post.upvotedBy.includes(userId)
                  ? post.upvotedBy.filter((id) => id !== userId)
                  : [...post.upvotedBy, userId];

                return { ...post, downvotedBy, upvotedBy };
              });

              setPosts(newPosts);
            }}
            onDownvote={() => {
              const newPosts = posts.map((post, i) => {
                if (i !== index) return post;

                // always remove upvote
                const upvotedBy = post.upvotedBy.filter((id) => {
                  return userId !== id;
                });

                // if user already downvoted, remove downvote
                // otherwise downvote
                const downvotedBy = post.downvotedBy.includes(userId)
                  ? post.downvotedBy.filter((id) => {
                      return userId !== id;
                    })
                  : [...post.downvotedBy, userId];

                return { ...post, downvotedBy, upvotedBy };
              });
              setPosts(newPosts);
            }}
          />
        );
      })}
    </div>
  );
}

export default App;
