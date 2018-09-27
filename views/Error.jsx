import React from 'react';

class Error extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous" />
        </head>
        <body>
          <div className="alert alert-warning text-center" role="alert">
            {this.props.message}
          </div>
        </body>
      </html>
    );
  }
}

export default Error;
