var React = require('react');

class New extends React.Component {
  render() {

    const allKeys = ['id', 'img', 'height', 'weight']
    const name = this.props.name;
    const profile = allKeys.map((key)=>{

        if (this.props[key] !== undefined){
            if (key !== "img") {
                let desc = key[0].toUpperCase()+key.slice(1);
                return <p>{desc}: {this.props[key]}</p>;
            } else {
                return <img src={this.props[key]} className="img-pokemon"></img>
            }
        };

    });

    return (

          <div>
            <h1>{name}</h1>
            {profile}
            <br/>
            <a href="/pokemon">Back to Pokemon List page</a>


          </div>

    );
  }
}

module.exports = New;