var React = require('react');

class Edit extends React.Component {
render() {
/* const price = this.props.price;
const tax = this.props.tax;
console.log(this.props.price, this.props.tax)
let taxMessage;
if (tax !== undefined) {
taxMessage = <h1>Tax is {tax}</h1>*/

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
      <form method="POST" action="/putrequest?_method=put"><input name="id" type="text" value={
          this.props.name.id} /><input type="submit" value="Edit this" /><br /><input name="number" type="text" value={
          this.props.name.num} /><input type="submit" value="Edit this" /><br /><input name="id" type="text" value={
          this.props.name.name} /><input type="submit" value="Edit this" /><br /><input name="id" type="text" value={
          this.props.name.img} /><input type="submit" value="Edit this" /><br /><input name="id" type="text" value={
          this.props.name.height} /><input type="submit" value="Edit this" /><br /><input name="id" type="text" value={
          this.props.name.weight} /><input type="submit" value="Edit this" /></form>
    </h4>
  </div>


</body>

</html>
);
}
}

module.exports = Edit;