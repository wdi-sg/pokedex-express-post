var React = require('react');

class Home extends React.Component {

  render() {
    return (

        <form>
            <select name="sortby">
                <option value="none">Sort by</option>
                <option value="name">Name</option>
                <option value="id">Id</option>
                <option value="num">Number</option>
            </select>
            <input type="submit" value="Submit"/>
        </form>
    );

  }


}

module.exports = Home;