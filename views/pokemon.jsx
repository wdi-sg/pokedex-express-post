var React = require('react');
class Pokemon extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>

           <h1> {this.props.name}</h1>
           <h2><a href={"/pokemon/" + this.props.id + "/edit"}>Edit This Pokemon</a></h2>
           <ul>
                <li>ID number: {this.props.id}</li>
                <li>Num: {this.props.num}</li>
                <li>Height: {this.props.height}</li>
                <li>Weight:{this.props.weight}</li>
           </ul>
           <img src={this.props.img}/>



          </div>
        </body>
      </html>
    );
  }
}

module.exports = Pokemon;