var React = require('react');

class Delete extends React.Component {

  render() {

    const googleItems = this.props.googleItems.map( oneItem => {
      return <li>{oneItem.product.title}</li>
    });

    return (
      <div>
        <ul>
        {googleItems}
        </ul>
      </div>
    );
  }
}

module.exports = Delete;