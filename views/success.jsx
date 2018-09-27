const React = require('react');

class Success extends React.Component {
  render() {
  	let pokemonId = this.props.id;
let actionUrl = '/pokemon/'+pokemonId+'?_method=PUT'
		console.log(this.props.id)
    return (
      <div>
      	<h1>Successfully Edited Pokemon</h1>
            <form method="POST" action={actionUrl}>
      		<p>id</p>
      		<input name="id" value={this.props.id}/>
      		<p>name</p>
      		<input name="name" value={this.props.name}/>
      		<p>height</p>
      		<input name="height" value={this.props.height}/>
      		<input type="submit" />
      	</form>
      </div>
    );
  }
}

module.exports = Success;
