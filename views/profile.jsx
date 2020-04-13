var React = require('react');

class Profile extends React.Component {
  render() {

    const allKeys = ['id', 'img', 'height', 'weight']
    const name = this.props.name;
    const profile = allKeys.map((key)=>{

        if (this.props[key] !== undefined){
            if (key !== "img") {
                let desc = key[0].toUpperCase()+key.slice(1);
                return <li key={this.props.id}>{desc}: {this.props[key]}</li>;
            } else {
                return <li key={this.props.id}><img src={this.props[key]} className="img-pokemon"></img></li>
            }
        }
    });

    return (
        <body>
          <div>
            <h1>{name}</h1>

            <ul>{profile}</ul>
            <br/>
            <a href="/pokemon">Back to Pokemon List page</a>
          </div>
        </body>

    );
  }
}

module.exports = Profile;