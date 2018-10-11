/* eslint react/no-array-index-key: 0 */
import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import * as PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import './styles.less';

const _ = require('lodash');

class TagsField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      textValidation: '',
      errorText: '',
      tags: props.defaultValue ? _.split(props.defaultValue, ',') : [],
    };
    this.validateForm = this.validateForm.bind(this);
    this.validateTextField = this.validateTextField.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleRemoveTag = this.handleRemoveTag.bind(this);
    this.handleOnAddNewTag = this.handleOnAddNewTag.bind(this);
  }

  componentWillReceiveProps({ validator, defaultValue }) {
    if (validator) {
      this.validateForm();
    }
    if (defaultValue) {
      this.setState({
        tags: _.split(defaultValue, ','),
      });
    }
  }

  onChange(e, value) {
    // console.log(e);
    this.setState({
      text: value,
    }, () => {
      if (this.validateTextField() && this.state.tags.length === 0 && this.props.onChange !== null) {
        this.props.onChange(value);
      }
    });
  }

  handleOnKeyDown(e) {
    // console.log(this.props, e.key);
    if (e.key === 'Enter') {
      this.handleOnAddNewTag();
    }
  }

  handleOnAddNewTag() {
    const text = _.trim(this.state.text);
    if (!text) {
      return;
    }
    if (this.state.tags.indexOf(text) >= 0) {
      this.setState({
        errorText: `Word "${text}" already exists`,
      });
      return;
    }
    const tags = this.state.tags.slice();
    tags.push(text);
    this.setState({
      text: '',
      tags: tags,
    }, () => {
      if (this.validateForm() && this.props.onChange !== null) {
        this.props.onChange(_.join(this.state.tags, ','));
      }
    });
  }

  handleRemoveTag(tag) {
    const tags = this.state.tags.slice();
    this.setState({
      tags: tags.filter(e => e !== tag),
    }, () => {
      if (this.validateForm() && this.props.onChange !== null) {
        this.props.onChange(_.join(this.state.tags, ','));
      }
    });
  }

  validateTextField() {
    let flag = true;
    if (!this.state.text) {
      flag = false;
      this.setState({
        textValidation: '',
      });
    } else {
      const { isNumeric } = this.props;
      if (isNumeric && !_.isNumber(_.toNumber(this.state.text))) {
        flag = false;
        this.setState({
          textValidation: 'Value should be number',
        });
      } else {
        this.setState({
          textValidation: '',
        });
      }
    }
    return flag;
  }

  validateForm() {
    if (this.state.tags.length === 0) {
      this.setState({
        errorText: this.props.validationMessage,
      });
      return false;
    }
    this.setState({
      errorText: '',
    });
    return true;
  }

  renderLabel(style = {}) {
    const { disabled } = this.props;
    return (
      <div className="label-caption" style={style}>
        {this.props.caption}
        {this.props.isMandatory && !disabled && <span style={{ marginLeft: 5, color: 'red', fontSize: 13 }}>(*)</span>}
      </div>
    );
  }

  renderTags() {
    return this.state.tags.map((tag, index) => (
      <Chip
        style={{ margin: 5, marginLeft: 0 }}
        className="asideItem ngager-flexbox-container"
        key={index}
        onRequestDelete={() => this.handleRemoveTag(tag)}
      >
        {tag}
      </Chip>
    ));
  }

  render() {
    const style = Object.assign({ marginBottom: '10px' }, this.props.style);
    const plusIconStyle = this.state.text !== null && this.state.text.length > 0 ? {} : { display: 'none' };
    plusIconStyle.color = this.props.themeColor;
    return (
      <div className={`tags-container ${this.props.disabled ? 'disabled' : ''}`} style={style}>
        {this.renderLabel({ lineHeight: 0, marginTop: '10px' })}
        <div className="text-field">
          <TextField
            onKeyDown={this.handleOnKeyDown}
            hintText="Add new word"
            hintStyle={{ color: '#bbb', fontSize: '14px' }}
            name="tags-input"
            errorText={this.state.textValidation}
            rows={1}
            disabled={this.props.disabled}
            value={this.state.text}
            fullWidth
            onChange={this.onChange}
            underlineStyle={{ borderColor: this.props.themeColor }}
            underlineFocusStyle={{ borderColor: this.props.themeColor }}
            underlineShow
            type={this.props.isNumeric ? 'number' : 'text'}
          />
          <i onClick={this.handleOnAddNewTag} style={plusIconStyle} className="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>{this.renderTags()}</div>
        {this.state.errorText && <span className="error-text" >{this.state.errorText}</span>}
      </div>
    );
  }
}

TagsField.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  themeColor: PropTypes.string,
  style: PropTypes.instanceOf(Array),
  caption: PropTypes.string,
  isMandatory: PropTypes.bool,
  validationMessage: PropTypes.string,
  validator: PropTypes.bool,
  onChange: PropTypes.func,
  isNumeric: PropTypes.bool,
};
TagsField.defaultProps = {
  caption: '',
  defaultValue: '',
  disabled: false,
  isMandatory: false,
  themeColor: 'inherit',
  style: [],
  validator: false,
  onChange: null,
  isNumeric: false,
  validationMessage: '',
};

export default TagsField;
