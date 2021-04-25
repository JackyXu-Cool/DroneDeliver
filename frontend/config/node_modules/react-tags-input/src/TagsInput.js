import React from 'react'
import assign from 'object-assign';
import classNames from 'classnames';

const TagsInput = React.createClass({

  propTypes: {
    addKeys: React.PropTypes.array,
    addOnBlur: React.PropTypes.bool,

    /**
     * When `true`, the same tag can be added multiple times.
     *
     * defaults to `false`
     */
    allowDuplicates: React.PropTypes.bool,

    className: React.PropTypes.string,
    inputProps: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    removeKeys: React.PropTypes.array,
    renderInput: React.PropTypes.func,
    renderTag: React.PropTypes.func,
    renderLayout: React.PropTypes.func,
    tagProps: React.PropTypes.object,
    value: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      addKeys: [
        9, // TAB
        13 // ENTER
      ],
      allowDuplicates: false,
      removeKeys: [
        8 // BACKSPACE
      ],
      renderInput: defaultRenderInput,
      renderTag: defaultRenderTag,
      renderLayout: defaultRenderLayout,
      value: []
    };
  },

  getInitialState() {
    return {
      tags: ''
    };
  },

  render() {
    const {
      addKeys,
      addOnBlur,
      className,
      inputProps={},
      onChange,
      removeKeys,
      renderInput,
      renderTag,
      renderLayout,
      tagProps={},
      value,
      ...props
    } = this.props;
    const { tag } = this.state;
    const tagComponents = value.map((tag, index) => {
      const props = assign({}, tagProps, {
        key: index,
        className: classNames(tagProps.className, 'TagsInput-tag'),
        tag: tag,
        onRemove: this._handleRemove
      });

      if (!props.style) props.style = {};

      return renderTag(props);
    });
    const inputComponent = renderInput(
      assign({}, inputProps, {
        ref: 'input',
        className: classNames(inputProps.className, 'TagsInput-input'),
        onBlur: this._handleOnBlur,
        onChange: this._handleChange,
        onKeyDown: this._handleKeyDown,
        value: tag
      })
    );

    return (
      <div
        {...props}
        ref="div"
        className={classNames(className, 'TagsInput')}
        onClick={this._handleClick}
      >
        {renderLayout(tagComponents, inputComponent)}
      </div>
    )
  },

  blur() {
    this.refs.input.blur();
  },

  focus() {
    this.refs.input.focus();
  },

  select() {
    this.refs.input.select();
  },

  _addTag(tag) {
    if (tag !== '') {
      const { allowDuplicates, onChange, value } = this.props;

      if (
        !allowDuplicates
        && value.length
        && value.indexOf(tag) != -1
      ) {
        return;
      }

      onChange(value.concat([tag]));
      this._clearInput();
    }
  },

  _clearInput() {
    this.setState({tag: ''});
  },

  _handleOnBlur(event) {
    const { addOnBlur, inputProps={} } = this.props;

    if (addOnBlur) {
      this._addTag(event.target.value);
    }

    if (inputProps.onBlur) {
      inputProps.onBlur(event);
    }
  },

  _handleChange(event) {
    const tag = event.target.value;
    const { inputProps={} } = this.props;

    if (inputProps.onChange) {
      inputProps.onChange(event)
    }

    this.setState({tag: tag});
  },

  _handleClick(event) {
    if (event.target === this.refs.div) {
      this.focus();
    }
  },

  _handleKeyDown(event) {
    const {addKeys, inputProps={}, removeKeys, value} = this.props;
    const {tag} = this.state;
    const add = addKeys.indexOf(event.keyCode) !== -1;

    if (add) {
      event.preventDefault();
      this._addTag(tag);
      return;
    }

    const empty = tag === '';
    const remove = removeKeys.indexOf(event.keyCode) !== -1;

    if (remove && value.length > 0 && empty) {
      event.preventDefault();
      this._removeTag(value.length - 1);
    }

    if (inputProps.onKeyDown) {
      inputProps.onKeyDown(event);
    }
  },

  _handleRemove(tag) {
    this._removeTag(tag);
  },

  _removeTag (index) {
    const props = this.props;
    const value = props.value.concat([]);

    if (index > -1 && index < value.length) {
      value.splice(index, 1);

      props.onChange(value)
    }
  }

});

function defaultRenderTag(props) {
  let {
    key,
    onRemove,
    classNameRemove,
    style,
    tag,
    ...other
  } = props;

  return (
    <span {...other} key={key} style={style}>
      {tag}
      <span
        className={classNames(classNameRemove, 'TagsInput-remove')}
        onClick={() => onRemove(key)}
      />
    </span>
  );
}

function defaultRenderInput(props) {
  return (
    <input {...props} type="text" />
  );
}

function defaultRenderLayout(tagComponents, inputComponent) {
  return (
    <span>
      {tagComponents}
      {inputComponent}
    </span>
  );
}

export default TagsInput;