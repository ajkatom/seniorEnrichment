import React from "react";
import Chance from "chance";
const canch = new Chance();

const Home = () => {
  return (
    <div className="container" id="home">
      <h1>WELLCOME TO THE COLLEGE REGISTRY</h1>
      <p>{chance.paragraph({ sentences: 35 })}</p>
    </div>
  );
};

export default Home;
