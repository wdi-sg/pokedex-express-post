var React = require('react');

class New extends React.Component {
  render() {
    let actionURL = '/pokemon'
    return (
        <html>
    <head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
    </head>
    <body>
      <div class="container">
        <form method="POST" action={actionURL}>
          <h1>Create your own Pokemon</h1>
          <p>Id</p>
          <input type="text" name="id"/>
          <p>Name</p>
          <input type="text" name="name" minlength="2" required />
          <p>Weight</p>
          <input type="text" name="weight"/>
          <p>Height</p>
          <input type="text" name="height"/>
          <br/>
          <input type='submit' value='Submit'/>
        </form>
      </div></body></html>
    );
  }
}

module.exports = New;