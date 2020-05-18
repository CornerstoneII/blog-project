import React, { useState, useEffect } from "react";
import NotFoundPage from "./notfoundpage";
import ArticleList from "../components/articleslist";
import articleContent from "./article-content";

const ArticlePage = ({ match }) => {
  const name = match.params.name;
  const article = articleContent.find((article) => article.name === name);

  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();

      setArticleInfo(body);
    };
    fetchData();
  }, [name]);

  if (!article) return <NotFoundPage />;

  const otherArticles = articleContent.filter(
    (article) => article.name !== name
  );
  return (
    <>
      <h1>{article.title}</h1>
      <p>This Post has been upvoted {articleInfo.upvotes} times</p>
      {article.content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
      <h3>Related Articles:</h3>
      <ArticleList articles={otherArticles} />
    </>
  );
};

export default ArticlePage;
