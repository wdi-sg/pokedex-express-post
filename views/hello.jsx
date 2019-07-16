var React = require('react');

var Layout = require('./layout');

class Hello extends React.Component {
    render(){
        return (<Layout>
            <div>
                <h1>INside HElllo</h1>
            </div>
        </Layout>
        );
    }
}

module.exports = Hello;