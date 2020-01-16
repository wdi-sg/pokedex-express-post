var React = require('react');

class Edit extends React.Component {
render() {
/* const price = this.props.price;
const tax = this.props.tax;
console.log(this.props.price, this.props.tax)
let taxMessage;
if (tax !== undefined) {
taxMessage = <h1>Tax is {tax}</h1>*/

//THIS SHOULD BE HOW THE URL ABOUT SHOULD LOOK LIKE
let id = this.props.name.id
let actionURL = "/pokemon/"+id+"?_method=put"

return (
<html>

<body>
  <div>
    <h1>The Pokemon is: { this.props.name.name}</h1>
  </div>

  <div>
    <h3>Height: { this.props.name.height}</h3>
    <h3>Weight: { this.props.name.weight}</h3>


  </div>



  <div>
    <img src={ this.props.name.img } />
  </div>

  <div>
    <h4>
      <form method="POST" action={actionURL}><input name="id" type="text" value={
          this.props.name.id} /><br /><input name="number" type="text" value={
          this.props.name.num} /><br /><input name="id" type="text" value={
          this.props.name.name} /><br /><input name="id" type="text" value={
          this.props.name.img} /><br /><input name="id" type="text" value={
          this.props.name.height} /><br /><input name="id" type="text" value={
          this.props.name.weight} /><input type="submit" value="Edit this" /></form>
    </h4>
  </div>


</body>

</html>
);
}
}

module.exports = Edit;