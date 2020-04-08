var React = require('react');

class Profile extends React.Component {
  render() {
    const allKeys = ['id', 'img', 'height', 'weight']
    const name = this.props.name;
    // let profile = "";

    // allKeys.forEach((key)=>{
    //     // console.log(key);
    //     // console.log(this.props[key]);
    //     if (this.props[key] !== undefined){
    //         let desc = key[0].toUpperCase()+key.slice(1);
    //         // console.log(desc);
    //         profile += desc+ ": " + this.props[key] + "<br/>"
    //     } else {
    //     };
    // });

    const profile = allKeys.map((key)=>{
        if (this.props[key] !== undefined){
            if (key !== "img") {
                let desc = key[0].toUpperCase()+key.slice(1);
                // console.log(desc);
                return <p>{desc}: {this.props[key]}</p>;
            } else {
                return <img src={this.props[key]}></img>
            }
        };
    });

    return (

          <div>
            <h1>{name}</h1>
            {profile}

          </div>

    );
  }
}

module.exports = Profile;