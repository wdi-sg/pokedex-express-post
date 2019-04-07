var React = require('react');

class Delete extends React.Component {

  render() {
    let actionAttribute = `/pokemon/${this.props.idKey}?_method=DELETE`
    console.log("Printing out this.props.respondKey: "+this.props.respondKey);
    console.log("Printing out this.props.idKey: "+this.props.idKey);
    return(
      <form method = "DELETE" action = {'/pokemon'}>
        
      </form>

    )
  }
}

module.exports = Delete;
