import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundaryAlbum extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    this.setState({ hasError: true });
  }

  render() {
    // next code block goes here
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="card my-5">
          <div className="card-header">
            <p>
              There was an error in loading this page.
              <a href="/"
                style={{ cursor: 'pointer', color: '#0077FF' }}
              >
                Back to HomePage
              </a>
            </p>
          </div>
        </div>
      );
    } else{
        return this.props.children;
    }
    
  }
}
ErrorBoundaryAlbum.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]).isRequired,
};