let React = require('react');

class Home extends React.Component {
    render() {
        let id = this.props.id;
        let name = this.props.name;
        let img = this.props.img;
        let height = this.props.height;
        let weight = this.props.weight;
        let actionString = '/pokemon/' + id + '?_method=PUT'
        return (
            <div>
                <h1>Hello</h1>
                <form method="POST" action={actionString}>
                <div className="pokemon-attribute">
                {name}<input type="text" name="name" id="input-id"/>
                {img}<input type="text" name="img" id="input-id"/>
                {height}<input type="text" name="height" id="input-id"/>
                {weight}<input type="text" name="weight" id="input-id"/>
                </div>
                <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}
module.exports = Home;