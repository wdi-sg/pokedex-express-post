const React = require('react');
class Pokemon extends React.Component {
  render() {

    let typeDiv;
    let typeList

    let types = this.props.type;

    if (types) {
      typeList = types.map( (type)=> {
        return (
          <a href={`/type/${type}`}><button className="btn btn-primary" style={{margin: "5px"}}>{type}</button></a>
        )});
      typeDiv = <p>{typeList}</p>
    }

    return (
      <html lang="en" dir="ltr">
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/></head>

        <body style={{fontFamily: "sans-serif", textAlign: "center"}}>
            <img src={this.props.img}/>
            <h1>{this.props.name}</h1>
            <p>ID: {this.props.id}</p>
            <p>Weight: {this.props.weight}</p>
            <p>Height: {this.props.height}</p>
            {typeDiv}

            <div>
                <a href="/">Back to Home</a>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;
