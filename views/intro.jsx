var React = require('react');
var HomeNav = require('./navigation');

class Home extends React.Component {

render() {

    const commands = [
        "View All Pokemons",
        "Edit Pokemon",
        "Create Pokemon",
        "Delete Pokemon"
      ];

  //         var commands = [
  // {
  //   type:"View All Pokemons",
  //   path:"/pokemon"

  // },
  // {
  //   type:"Edit Pokemon",
  //   path:"/pokemon/:id/edit"
  // },
  // {
  //   type:"Create Pokemon",
  //   path:"/pokemon/new"
  // },
  // {
  //   type:"Delete Pokemon",
  //   path:"/pokemon/:id/delete"
  // }
  // ];

        return (
          <HomeNav items={commands}/>
        );
    }
}

module.exports = Home;