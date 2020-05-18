import React from "react";

const upvotesSection = ({ articleName, upvotes, setArticleInfo }) => {
  const upvoteArticle = async () => {
    const result = await fetch(`/api/articles/${articleName}/upvote`, {
      method: "post",
    });

    const body = await result.json();
    setArticleInfo(body);
  };
  return (
    <div id="upvotes-section">
      <button onClick={() => upvoteArticle()}>Add Upvotes</button>
      <p>This Post has been upvoted {upvotes} times</p>
    </div>
  );
};

export default upvotesSection;
