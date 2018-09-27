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
          <input type="number" name="id" value={this.props.id} /><br />
          <label htmlFor="num">Num</label>
          <input type="number" name="num" value={this.props.num} /><br />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={this.props.name} /><br />
          <label htmlFor="img">Image</label>
          <input type="url" name="img" value={this.props.img} /><br />
          <label htmlFor="height">Height</label>
          <input type="number" name="height" value={height} /> m<br />
          <label htmlFor="weight">Weight</label>
          <input type="number" name="weight" value={weight} /> kg<br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PokemonEdit;
