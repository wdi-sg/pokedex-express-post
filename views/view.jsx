var React = require('react');

class View extends React.Component {
  render() {

    return (
        <html>
<head>
  <meta charset="UTF-8"/>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
  <link rel="stylesheet" type="text/css" href="/viewstyle.css"/>
</head>
<body>
   <h1>{this.props.pokemonKey.name} <span>#{this.props.pokemonKey.num}</span></h1>
      <div class="container">


        <div class="bulbasaur">
          <img id="eachImage" src={this.props.pokemonKey.img}/>
      </div>

      <div class="content">

          <p>Bulbasaur can be seen napping in bright sunlight.</p>
          <p>There is a seed on its back. By soaking up the sun's</p>
          <p>rays, the seed grows progressively larger.</p>

          <div class="rectangle">

                <span class="attribute">Height<div>{this.props.pokemonKey.height}</div> </span>

                <span class="attribute">Weight<div>{this.props.pokemonKey.weight}</div></span>

                <span class="attribute">Candy<div>{this.props.pokemonKey.candy}</div></span>

                <span class="attribute">Average Spawns<div>{this.props.pokemonKey.avg_spawns}</div></span>

        </div>
            <a href={`/`} class="btn btn-danger">Home</a>
        </div>
    </div>

</body>
</html>

    );

  }
}

module.exports = View;