import React from 'react';

export default function Post({ id, author, title, content }) {
  return (
    <div>
      #{id}
      {author.name || author.email}
      <h1>{title}</h1>
      {content}
    </div>
  );
}
