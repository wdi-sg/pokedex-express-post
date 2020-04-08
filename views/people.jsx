const React = require("react");

class Home extends React.Component {
    render() {
        const name = "Benjamin";
        let message;

        if (name.length < 5) {
            message = "Welcome " + name;
        } else if (name.length > 5) {
            message = "Wecome " + name + "! What a long name you have";
        }

        let buttonText;

        if (this.props.isLoggedIn === true) {
            buttonText = "Sign Out";
        } else {
            buttonText = "Log In";
        }

        const people = this.props.people.map((person) => {
            return <li>{person}</li>;
        });

        const petsOfSEI = this.props.pets.map((pet) => {
            return (
                <div>
                    <p>Name: {pet.name}</p>
                    <p>Type: {pet.type}</p>
                    <img className="img pet" src={pet.img}></img>
                    <a href={"/pets/" + pet.id}>Link to pet profile</a>
                </div>
            );
        });

        return (
            <div>
                <h1>{message}</h1>
                <button>{buttonText}</button>
                <ul>{people}</ul>
                <h2>Pets of SEI-22</h2>
                {petsOfSEI}
            </div>
        );
    }
}

module.exports = Home;