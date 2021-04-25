var React = require('react');
var ReactDOM = require('react-dom');
var TagsInput = require('../../dist/react-tags-input');

var App = React.createClass({

  getInitialState() {
    return {
      tags: []
    };
  },

  render: function() {
    return (
      <div>
        <TagsInput
          onChange={this._onChange}
          value={this.state.tags}
        />
      </div>
    );
  },

  _onChange(tags) {
    this.setState({tags});
  }

});

ReactDOM.render(<App />, document.getElementById('app'));