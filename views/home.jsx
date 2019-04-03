var React = require('react');

class Home extends React.Component {

  render() {

    let message = <h1>welcome!</h1>;

    if( this.props.name.length > 5 ){
      message = <h6>welcome! What a long name you have!</h6>;
    }

    const myPeopleArray = this.props.people;

    const people = myPeopleArray.map( person => {
      return <li>** {person}</li>
    });

    people.push(<li>STUFF</li>);

    let imageSource = "https://media1.tenor.com/images/88ef9ac3daebdb9e244bfc35fc8a5740/tenor.gif?itemid=5279221";


      return (
        <html>
            <body>
              <p>
                    <img src={imageSource}  />
              </p>
              <div>
                <div>banana: {message} : {this.props.name}</div>
              </div>
              <ul>
                {people}
              </ul>
            </body>
        </html>
    );

  }


}

module.exports = Home;