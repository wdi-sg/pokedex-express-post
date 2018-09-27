import React from 'react';

class PokemonNew extends React.Component {
  render() {
    return (
      <div>
        <h1>Create A New Pokemon</h1>
        <form method="POST" action='/pokemon'>
          <label htmlFor="id">Id</label>
          <input type="number" name="id" required /><br />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" pattern=".{2,}" title="2 characters minimum" required /><br />
          <label htmlFor="img">Image</label>
          <input type="url" name="img" required /><br />
          <label htmlFor="height">Height</label>
          <input type="text" name="height" pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required /> m<br />
          <label htmlFor="weight">Weight</label>
          <input type="text" name="weight" pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required /> kg<br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PokemonNew;
