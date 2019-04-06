var React = require('react');

var Layout = require('./layout');

class Edit extends React.Component {
  render() {

    let actionAttribute = `/pokemon/${this.props.idKey}?_method=PUT`;

    return (
         <html>
            <head>
                <meta charset="UTF-8"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="/editstyle.css"/>
                <title>Pokedex:Edit</title>
            </head>

        <body>
        <div class="container">
        <h1>EDIT pokemon</h1><br/>
        <form method="POST" action={actionAttribute}>
        Edit num:<input type="text" name="num" value={this.props.recordKey.num}/><br/><br/>
        Edit name:<input type="text" name="name" value={this.props.recordKey.name}/><br/><br/>
        Edit img:<input type="text" name="img" value={this.props.recordKey.img}/><br/><br/>
        Edit height:<input type="text" name="height" value={this.props.recordKey.height}/><br/><br/>
        Edit weight:<input type="text" name="weight" value={this.props.recordKey.weight}/><br/><br/>
        Edit candy:<input type="text" name="candy" value={this.props.recordKey.candy}/><br/><br/>
        Edit candy_count:<input type="text" name="candy_count" value={this.props.recordKey.candy_count}/><br/><br/>
        Edit egg:<input type="text" name="egg" value={this.props.recordKey.egg}/><br/><br/>
        Edit avg_spawns:<input type="text" name="avg_spawns" value={this.props.recordKey.avg_spawns}/><br/><br/>
        Edit spawn_time:<input type="text" name="spawn_time" value={this.props.recordKey.spawn_time}/><br/><br/>
        <input type="submit" class="btn btn-primary" value="Confirm"/>&nbsp;&nbsp;&nbsp;&nbsp;
        <a href={`/`} class="btn btn-danger">Back</a>
        </form>
        </div>
        </body>
        </html>
    );
//     return (
//         <Layout>




// <form>

// <div class="container">

//   <div class="form-row">

//     <div class="col-2">
//       <label for="validationServer01">First name</label>
//       <input type="text" class="form-control is-valid" id="validationServer01" placeholder="First name" value="Mark" required/>
//       <div class="valid-feedback">
//         Looks good!
//       </div>
//     </div>

//     <div class="col-2">
//       <label for="validationServer02">Last name</label>
//       <input type="text" class="form-control is-valid" id="validationServer02" placeholder="Last name" value="Otto" required/>
//       <div class="valid-feedback">
//         Looks good!
//       </div>
//     </div>

//     <div class="col-2">
//       <label for="validationServerUsername">Username</label>
//       <div class="input-group">
//         <div class="input-group-prepend">
//           <span class="input-group-text" id="inputGroupPrepend3">@</span>
//         </div>
//         <input type="text" class="form-control is-invalid" id="validationServerUsername" placeholder="Username" aria-describedby="inputGroupPrepend3" required/>
//         <div class="invalid-feedback">
//           Please choose a username.
//         </div>
//       </div>
//     </div>

//   </div>


//   <div class="form-row">

//     <div class="col-2">
//       <label for="validationServer03">City</label>
//       <input type="text" class="form-control is-invalid" id="validationServer03" placeholder="City" required/>
//       <div class="invalid-feedback">
//         Please provide a valid city.
//       </div>
//     </div>

//     <div class="col-2">
//       <label for="validationServer04">State</label>
//       <input type="text" class="form-control is-invalid" id="validationServer04" placeholder="State" required/>
//       <div class="invalid-feedback">
//         Please provide a valid state.
//       </div>
//     </div>

//     <div class="col-2">
//       <label for="validationServer05">Zip</label>
//       <input type="text" class="form-control is-invalid" id="validationServer05" placeholder="Zip" required/>
//       <div class="invalid-feedback">
//         Please provide a valid zip.
//       </div>
//     </div>

//   </div>

//   <div class="form-group">
//     <div class="form-check">
//       <input class="form-check-input is-invalid" type="checkbox" value="" id="invalidCheck3" required/>
//       <label class="form-check-label" for="invalidCheck3">
//         Agree to terms and conditions
//       </label>
//       <div class="invalid-feedback">
//         You must agree before submitting.
//       </div>
//     </div>
//   </div>
//   <button class="btn btn-primary" type="submit">Submit form</button>

//   </div>

// </form>

// </Layout>
//     );
  }
}

module.exports = Edit;