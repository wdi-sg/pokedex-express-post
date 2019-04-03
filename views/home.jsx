var React = require("react");

class Home extends React.Component {
    render() {
const actionAttribute = `/pokemon/${this.props.idKey}/?_method=PUT`

    return (
        <body>
      <form method="POST" action={actionAttribute}>
      id: <input type="text" name="id" value={this.props.dataKey.id}/>
      num: <input type="text" name="num" value={this.props.dataKey.num}/>
      name: <input type="text" name="name" value={this.props.dataKey.name}/>
      img: <input type="text" name="img" value={this.props.dataKey.img}/>
      height: <input type="text" name="height" value={this.props.dataKey.height}/>
      weight: <input type="text" name="weight" value={this.props.dataKey.weight}/>
      <input type="submit" value="Submit"/>
      </form>
      </body>
    );
    }
}

module.exports = Home;