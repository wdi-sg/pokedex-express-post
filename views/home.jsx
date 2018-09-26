const React = require('react');

class Home extends React.Component {
  render() {
    return (
      <div>
        <form action="/" method="GET">
          <label htmlFor="sortby">Sort by: </label>
          <select name="sortby">
            <option value={this.props[0]}>{this.props[0]}</option>
            <option value={this.props[1]}>{this.props[1]}</option>
            <option value={this.props[2]}>{this.props[2]}</option>
            <option value={this.props[3]}>{this.props[3]}</option>
            <option value={this.props[4]}>{this.props[4]}</option>
            <option value={this.props[5]}>{this.props[5]}</option>
            <option value={this.props[6]}>{this.props[6]}</option>
            <option value={this.props[7]}>{this.props[7]}</option>
            <option value={this.props[8]}>{this.props[8]}</option>
            <option value={this.props[9]}>{this.props[9]}</option>
            <option value={this.props[10]}>{this.props[10]}</option>
          </select>
          <input type="submit" />
        </form>
      </div>
    );
  };
}

module.exports = Home;
