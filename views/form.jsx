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
            <div className="input">
              <input type="text" name="id"/>
              <span className="error">{this.props.errors && this.props.errors.id ? this.props.errors.id : ""}</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="num">Num</label>
            <div className="input">
              <input type="text" name="num"/>
              <span className="error">{this.props.errors && this.props.errors.num ? this.props.errors.num : ""}</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input">
              <div className="input">
                <input type="text" name="name"/>
                <span
                  className="error">{this.props.errors && this.props.errors.name ? this.props.errors.name : ""}</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="img">Image</label>
            <div className="input">
              <input type="text" name="img"/>
              <span className="error">{this.props.errors && this.props.errors.img ? this.props.errors.img : ""}</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="height">height</label>
            <div className="input">
              <input type="text" name="height"/>
              <span
                className="error">{this.props.errors && this.props.errors.height ? this.props.errors.height : ""}</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="weight">weight</label>
            <div className="input">
              <input type="text" name="weight"/>
              <span
                className="error">{this.props.errors && this.props.errors.weight ? this.props.errors.weight : ""}</span>
            </div>
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