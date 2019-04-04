var React = require('react');

class Cards extends React.Component {

    render() {

        return (
            <div class="col-3-xs">
                <div class="card-group">
                    <div class="card m-1" style={{width: '12rem', height: '18rem'}}>
                        <a href="/pokemon/1/edit"> <img src={this.props.img} style={{width: '100%'}} class="card-img-top p-2" alt="..."/></a>
                            <div class="card-body">
                                <p class="card-text text-center m-0"># {this.props.num}</p>
                                <h5 class="card-title text-center">{this.props.card}</h5>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}



module.exports = Cards;