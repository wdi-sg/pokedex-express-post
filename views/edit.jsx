var React = require('react');
// var List = require('./list.jsx');

class Edit extends React.Component {
  render() {


    return (
      <html>
        <body>
          <div>


            <h1>It's working!</h1>
            <h1>Input ID:{this.props.id}</h1>
            <form method="POST" name="sort" action={"/pokemon/"+this.props.id+"?_method=PUT"}>
            <input type="text" name="id" value={this.props.id}></input><br />
            <input type="text" name="num" value={this.props.num}></input><br />
            <input type="text" name="name" value={this.props.name}></input><br />
            <input type="text" name="img" value={this.props.img}></input><br />
            <input type="text" name="height" value={this.props.height}></input><br />
            <input type="text" name="weight" value={this.props.weight}></input><br />
            <input type="submit" value="Submit"></input>
            </form>
          </div>


        </body>
      </html>
    );
  }
}
// ?_method=PUT
module.exports = Edit;