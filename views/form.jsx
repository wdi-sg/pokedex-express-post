const React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
      <head>
        <title>Pokemon stuff</title>
        <link rel="stylesheet" href="/styles/styles.css"/>
      </head>
      <body>
      <div>
        <form method="POST" action="/pokemon" class="form">
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input type="text" name="id"/>
          </div>
          <div className="form-group">
            <label htmlFor="num">Num</label>
            <input type="text" name="num"/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name"/>
          </div>
          <div className="form-group">
            <label htmlFor="img">Image</label>
            <input type="text" name="img"/>
          </div>
          <div className="form-group">
            <label htmlFor="height">height</label>
            <input type="text" name="height"/>
          </div>
          <div className="form-group">
            <label htmlFor="weight">weight</label>
            <input type="text" name="weight"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      </body>
      </html>
    );
  }
}

module.exports = Form;