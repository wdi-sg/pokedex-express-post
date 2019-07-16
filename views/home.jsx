var React = require('react');

class Home extends React.Component {

    render() {

        const people = this.props.pokeArr.map(poke => {
            return <li>{poke}</li>
        });

        return (

            <div>
            <form action="/" method="GET">
            <select name="sortby">
            <option value = "name">
            Sort pokemon by name
            </option>
            <option value = "id">
            Sort pokemon by id
            </option>
            <option value = "weight">
            Sort pokemon by weight"
            </option>
            </select>
            <input type='submit'/>
            </form>
        <ul>
        {people}
        </ul>
      </div>
        );
    }
}

module.exports = Home;