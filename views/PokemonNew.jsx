import React from 'react';

class PokemonNew extends React.Component {
  render() {
    return (
      <div>
        <h1>Create A New Pokemon</h1>
        <form method="POST" action='/pokemon'>
          <label htmlFor="id">Id</label>
          <input type="number" name="id" /><br />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" /><br />
          <label htmlFor="img">Image</label>
          <input type="url" name="img" /><br />
          <label htmlFor="height">Height</label>
          <input type="text" name="height" /> m<br />
          <label htmlFor="weight">Weight</label>
          <input type="text" name="weight" /> kg<br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PokemonNew;
