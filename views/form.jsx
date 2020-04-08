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
          <span className="error">{this.props.error && this.props.error.id ? this.props.error.id : ""}</span>
          <div className="form-group">
            <label htmlFor="num">Num</label>
            <input type="text" name="num"/>
          </div>
          <span className="error">{this.props.error && this.props.error.num? this.props.error.num: ""}</span>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name"/>
          </div>
          <span className="error">{this.props.error && this.props.error.name? this.props.error.name: ""}</span>
          <div className="form-group">
            <label htmlFor="img">Image</label>
            <input type="text" name="img"/>
          </div>
          <span className="error">{this.props.error && this.props.error.img? this.props.error.img: ""}</span>
          <div className="form-group">
            <label htmlFor="height">height</label>
            <input type="text" name="height"/>
          </div>
          <span className="error">{this.props.error && this.props.error.height? this.props.error.height: ""}</span>
          <div className="form-group">
            <label htmlFor="weight">weight</label>
            <input type="text" name="weight"/>
          </div>
          <span className="error">{this.props.error && this.props.error.weight? this.props.error.weight: ""}</span>
          <button type="submit">Submit</button>
        </form>
      </div>
      </body>
      </html>
    );
  }
}

module.exports = Form;