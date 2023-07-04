import React from "react";

const Page = () => {
  return (
    <div>
      <h1>Jest</h1>
      <p className="blue" data-testid="paragraphy-blue">
        This is a paragraphy
      </p>
      <label htmlFor="randomText">Enter Random Text:</label>
      <input id="randomText" />
      <input placeholder="Search" />
      <button disabled={true}>Click Me</button>
    </div>
  );
};

export default Page;
