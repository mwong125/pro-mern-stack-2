
import React from 'react';

function displayFormat(date) {
  return (date != null) ? date.toDateString() : '';
}

function editFormat(date) {
  let tempDate = date;
  if (date != null) {
    if (!(date instanceof Date)) {
      tempDate = new Date(date);
    }
    return tempDate.toISOString().substr(0, 10);
  }
  return '';
  // return (date != null) ? date.toISOString().substr(0, 10) : '';
  // date recovery in graphQLFetch is not working
}

function unformat(str) {
  const val = new Date(str);
  return Number.isNaN(val.getTime()) ? null : val;
}

export default class DateInput extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: editFormat(props.value),
      focused: false,
      valid: true,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const { value, valid: oldValid } = this.state;
    const { onValidityChange, onChange } = this.props;
    const dateValue = unformat(value);
    const valid = value === '' || dateValue != null;
    if (valid !== oldValid && onValidityChange) {
      onValidityChange(e, dateValue);
    }
    this.setState({ focused: false, valid });
    if (valid) onChange(e, dateValue);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  render() {
    const { valid, focused, value } = this.state;
    const { value: origValue, onValidityChange, ...props } = this.props;
    const displayValue = (focused || !valid) ? value : displayFormat(origValue);
    return (
      <React.Fragment>
        <input
          {...props}
          value={displayValue}
          placeholder={focused ? 'yyyy-mm-dd' : null}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}
