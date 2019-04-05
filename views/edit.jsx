var React = require('react');

// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));

class Edit extends React.Component {
    render() {
        var actionLink = `/pokemon/${this.props.id}?_method=PUT`;
        return (
            <form action= {actionLink} method="POST">
                Name: <input type="text" name="name"        placeholder={this.props.name} /><br/>
                Img Link: <input type="text" name="img"         placeholder={this.props.img} /><br/>
                Height: <input type="text" name="height"      placeholder={this.props.height} /><br/>
                Weight: <input type="text" name="weight"      placeholder={this.props.weight} /><br/>
                <input type="submit" value="Edit" />
            </form>
        );
    }
}

module.exports = Edit;