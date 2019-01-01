const React = require('react');

class Sorting extends React.Component {

    render() {

        let list = this.props.list.map((element) => {

            return <li>{element.name}</li>
        });

        return(

            <div>
                <h1>Pokemon Sorted By {this.props.sortingorder}</h1>
                <ul>
                    {list}
                </ul>
            </div>

    )};
};

module.exports = Sorting;