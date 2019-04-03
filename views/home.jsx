var React = require('react');

// const methodOverride = require('method-override');
// app.use(methodOverride('_method'));

class Home extends React.Component {
    render() {
        // this.props = {[]}
        // const obj = this.props.arr.map( info => {
        //   return <li>{person["name"]}</li>
        // });
        var actionLink = `/pokemon/${this.props.id}?_method=PUT`;
        return (
            <form action= {actionLink} method="POST">
                Name: <input type="text" name="name"        placeholder={this.props.name} /><br/>
                Img Link: <input type="text" name="img"         placeholder={this.props.img} /><br/>
                Height: <input type="text" name="height"      placeholder={this.props.height} /><br/>
                Weight: <input type="text" name="weight"      placeholder={this.props.weight} /><br/>
                Candy: <input type="text" name="candy"       placeholder={this.props.candy} /><br/>
                Candy Count: <input type="text" name="candy_count" placeholder={this.props.candy_count} /><br/>
                Egg: <input type="text" name="egg"         placeholder={this.props.egg} /><br/>
                Average Spawns: <input type="text" name="avg_spawns"  placeholder={this.props.avg_spawns} /><br/>
                Spawn Time: <input type="text" name="spawn_time"  placeholder={this.props.spawn_time} /><br/>
                <input type="submit" value="Edit" />
            </form>
        );
    }
}

module.exports = Home;