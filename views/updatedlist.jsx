const React = require('react');

class Updatedlist extends React.Component {

    render() {
        console.log(this.props.newlist);

        let list = this.props.newlist.map((element) => { return <li>{element.name}</li>});

        return (

            <div>
                <h1>List Of Pokemon:</h1>
                <ul>
                  {list}
                </ul>
            </div>


    )};
};



module.exports = Updatedlist;