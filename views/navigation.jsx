var React = require('react');


// class Path extends React.Component {

//     render() {
//         let itemsColor = this.props.colors.map(color => {
//             return <a>{color}.</a>
//         });

//         return (
//             <ul>{itemsColor}</ul>
//         )
//     }
// }

// module.exports = Path;



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
             <h1> Welcome to Pokedex</h1>
            <ul>
            {itemsElements}
            </ul>
          </div>
        );
    }
}



module.exports = HomeNav;