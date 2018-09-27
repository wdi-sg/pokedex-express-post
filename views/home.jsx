var React = require('react');

class Home extends React.Component {
    render() {

        let inputType = 'button';
        let formAction = '/pokemon';
        let selectName = 'sortby';
        let valueName = 'name';
        let valueId = 'id';
        let valueHeight = 'height';
        let valueWeight = 'weight';
        let submitInput = 'submit';

        return (
          <div>
            <h1>Hello. Good morning! How would you like to sort the pokemons: </h1>
            <form action={formAction}>
                <select name={selectName}>
                <option value={valueName}>Name</option>
                <option value={valueId}>Id</option>
                <option value={valueHeight}>Height</option>
                <option value={valueWeight}>Weight</option>
                </select>
                <br/>
                <input type={submitInput}/>
            </form>
          </div>
        );
    }
}

module.exports = Home;