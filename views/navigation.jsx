var React = require('react');


class HomeNav extends React.Component {

    render() {
        let itemsElements = this.props.items.map(item => {
            return (
                <div>
                  <li>{item}</li>
                 </div>
            )
        });
        return (
          <div>
             <h1> Welcome to Pokedex by Tan Wee Kiat</h1>
            <ul>
            {itemsElements}
            </ul>
          </div>
        );
    }
}



module.exports = HomeNav;