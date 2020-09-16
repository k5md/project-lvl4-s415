/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import React from 'react';
import { withTranslation } from 'react-i18next';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    const { errorReporter } = this.props;
    if (!errorReporter) {
      return;
    }
    errorReporter.error(error, errorInfo);
  }

  render() {
    const { children, t } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <h1>{t('errors.general')}</h1>;
    }
    return children;
  }
}

export default withTranslation()(ErrorBoundary);
