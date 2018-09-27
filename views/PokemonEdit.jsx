import React from 'react';

class PokemonEdit extends React.Component {
  render() {
    const path = '/pokemon/' + this.props.id + '?_method=PUT';
    const height = parseFloat(this.props.height).toFixed(2);
    const weight = parseFloat(this.props.weight).toFixed(1);

    return (
      <div>
        <form method="POST" action={path}>
          <label htmlFor="id">Id</label>
          <input type="number" name="id" value={this.props.id} disabled /><br />
          {/* <label htmlFor="num">Num</label>
          <input type="number" name="num" value={this.props.num} /><br /> */}
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={this.props.name} pattern=".{2,}" title="2 characters minimum" required /><br />
          <label htmlFor="img">Image</label>
          <input type="url" name="img" value={this.props.img} required /><br />
          <label htmlFor="height">Height</label>
          <input type="text" name="height" value={height} pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required /> m<br />
          <label htmlFor="weight">Weight</label>
          <input type="text" name="weight" value={weight} pattern="^([0-9])+(\.)*([0-9])*" title="Any number" required /> kg<br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PokemonEdit;
