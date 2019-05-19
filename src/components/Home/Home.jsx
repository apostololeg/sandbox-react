import React from 'react'

function Home() {
  return <div className="Home">
    <h1>Welcome Home!</h1>
    <h3>This project run on</h3>
    <ul>
      <li>ES6 / Babel</li>
      <li>
        Webpack v4
        <ul>
          <li>favicons-webpack-plugin</li>
          <li>component-directory-webpack-plugin</li>
        </ul>
      </li>
      <li>Stylus</li>
      <li>PostCSS (autoprefixer)</li>
      <li>
        React ^16.4
        <ul>
          <li><a href="https://reactjs.org/docs/context.html">Context</a> instead store-managers</li>
        </ul>
      </li>
      <li>
        <a href="https://reach.tech/router/">Reach Router</a>
        <ul>
          <li>example of auth routing</li>
        </ul>
      </li>
      <li>Lazy loading components (<a href="https://github.com/jamiebuilds/react-loadable">react-loadable</a>)</li>
      <li>Font <a href="https://fonts.google.com/specimen/Play">Play</a></li>
      <li>ESLint</li>
    </ul>
  </div>
}

export default Home
