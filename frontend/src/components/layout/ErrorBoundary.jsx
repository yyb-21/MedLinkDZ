import React from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-card glass">
            <h1>Oups ! 😕</h1>
            <p>Une erreur inattendue est survenue.</p>
            <button onClick={() => window.location.reload()}>Rafraîchir la page</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
