import React from 'react';
import { AlertOctagon, RefreshCcw } from 'lucide-react';
import PremiumButton from '../ui/PremiumButton';
import FadeUp from '../animations/FadeUp';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
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
          <div className="error-glow" />
          <FadeUp>
            <div className="error-card glass">
              <div className="error-icon-wrapper">
                <AlertOctagon size={48} />
              </div>
              <h1 className="error-title">Une erreur inattendue est survenue</h1>
              <p className="error-desc">
                Nous sommes désolés, mais un problème technique nous empêche d'afficher cette page correctement.
              </p>
              <div className="error-actions">
                <PremiumButton 
                  variant="primary" 
                  icon={RefreshCcw}
                  onClick={() => window.location.reload()}
                >
                  Rafraîchir la page
                </PremiumButton>
              </div>
            </div>
          </FadeUp>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
