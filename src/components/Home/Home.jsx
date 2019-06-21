import React, { useEffect } from 'react'
import { setTitle } from 'store/page'

function Home() {
  useEffect(() => setTitle(''));

  return (
    <h1>Home!</h1>
  );
}

export default Home;
