var React = require('react');

class Pokemon extends React.Component {
  render() {

    const editLink = `/pokemon/${this.props.pokemon.id}/edit`;

    return (


        <html lang="en">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            <title>Submit new pokemon</title>
        </head>
        <body>
            <div className="container">
                <div className="display-4">
                     {this.props.pokemon.name} <span className="text-muted"> #{this.props.pokemon.num}</span>
                </div>
                <div style={{width:'200px;'}}>
                <img src={this.props.pokemon.img} className="img-fluid"/>
                </div>
                <dl className="row">
                    <dt className="col-sm-2">
                        Height:
                    </dt>
                    <dd className="col-sm-10">
                        {this.props.pokemon.height}
                    </dd>
                    <dt className="col-sm-2">
                        Weight:
                    </dt>
                    <dd className="col-sm-10">
                        {this.props.pokemon.weight}
                    </dd>
                    <dt className="col-sm-2">
                        Candy:
                    </dt>
                    <dd className="col-sm-10">
                        {this.props.pokemon.candy}
                    </dd>
                </dl>
                <a href={editLink}>
                  <button class="btn btn-primary">Click to edit {this.props.pokemon.name}</button>
                </a>
            </div>
        </body>
        </html>
    );
  }
}


module.exports = Pokemon;
