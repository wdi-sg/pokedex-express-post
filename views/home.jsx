var React = require('react');

class Home extends React.Component {
    render() {
        return (
            <div>
            <h1>Welcome to the Online Pokedex</h1>
            <form method="GET" action="">
                <label for="sort-by-name">Sort By</label>
                <select name="sortby">
                    <option value="name">Name</option>
                    <option value="height">Height</option>
                    <option value="weight">Weight</option>
                </select><input type="submit"/></form>
        </div>);
    }
}

module.exports = Home;
