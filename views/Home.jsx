import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to Pokedex</h1>
        <form action="/pokemon">
          <select name="sortby">
            <option disabled selected value>Sort by...</option>
            <option value="id">id</option>
            <option value="name">name</option>
            <option value="height">height</option>
            <option value="weight">weight</option>
          </select>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Home;
