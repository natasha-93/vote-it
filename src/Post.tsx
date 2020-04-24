import React from "react";

type PostProps = {
  title: string;
  score: number;
  onUpvote: () => void;
  onDownvote: () => void;
};

export default function Post(props: PostProps) {
  const { score, title, onDownvote, onUpvote } = props;
  return (
    <div>
      <h4>{title}</h4>
      <button
        onClick={() => {
          onDownvote();
        }}
      >
        -
      </button>
      <p>{score}</p>
      <button
        onClick={() => {
          onUpvote();
        }}
      >
        +
      </button>
    </div>
  );
}
