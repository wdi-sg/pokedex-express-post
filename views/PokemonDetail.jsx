import React from 'react';

class PokemonDetail extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </head>
        <body>
          <div className="container text-center">
            <h1>{this.props.name}</h1>
            <img src={this.props.img} alt={this.props.name} />
            <h2>ID</h2>
            <p>{this.props.id}</p>
            <h2>Height</h2>
            <p>{this.props.height}</p>
            <h2>Weight</h2>
            <p>{this.props.weight}</p>
          </div>
        </body>
      </html>
    );
  }
}

export default PokemonDetail;
