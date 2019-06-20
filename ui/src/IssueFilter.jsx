
/* eslint "react/prefer-statless-function": "off" */

import React from 'react';
import { withRouter } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class IssueFilter extends React.Component {
  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(e) {
    const status = e.target.value;
    const { history } = this.props;
    history.push({ //literally changes the url
      pathname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    return (
      <div>
        Status:
        {' '}
        <select onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    );
  }
}

export default withRouter(IssueFilter);
