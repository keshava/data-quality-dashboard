var React = require('react');
var Store = require('../../stores/Store');

var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var HeaderPanel = require('../panels/Header.react.js');
var FooterPanel = require('../panels/Footer.react.js');
var SourceChart = require('../charts/SourceChart.react.js');
var SourceOverview = require('../SourceOverview.react.js');
var SourceActions = require('../SourceActions.react.js');
var SourceReport = require('../SourceReport.react.js');


function getStateFromStores(lookup) {
    var _source =  Store.get('sources', lookup);
    return {
        instance: Store.query('instance'),
        publisher: Store.get('publishers', _source.publisher_id),
        source: Store.get('sources', lookup),
        results: Store.query('results', {'source_id': lookup})
    };
}

var Source = React.createClass({

    getInitialState: function() {
        return getStateFromStores(this.props.lookup);
    },

    componentDidMount: function() {
        Store.addChangeListener(this._onChange);
    },

    render: function() {
        return (
            <div>
                <HeaderPanel instance={this.state.instance} />
                <section id="main" className="container">
                    <Row>
                        <Col md={12}>
                            <h2>Overview</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <SourceOverview results={this.state.results} />
                        </Col>
                        <Col md={6}>
                            <SourceChart results={this.state.results} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2>Actions</h2>
                        </Col>
                        <Col md={12}>
                            <SourceActions />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <h2>Report</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <SourceReport source={this.state.source} />
                        </Col>
                    </Row>
                </section>
                <FooterPanel instance={this.props.instance} />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores(this.props.lookup));
    }

});


module.exports = Source;