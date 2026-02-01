import React from 'react';

type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log the error to console and localStorage to help debugging in dev
    try {
      console.error(error, info);
      const payload = {
        message: error?.message,
        stack: (error as any)?.stack || info?.componentStack || null,
        time: new Date().toISOString(),
      };
      localStorage.setItem('last-ui-error', JSON.stringify(payload));
    } catch (e) {
      // swallow
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-red-50">
          <div className="max-w-xl w-full bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-bold mb-2">Une erreur est survenue</h2>
            <p className="text-sm text-gray-600 mb-4">Nous avons détecté un problème sur cette page. Essayez de recharger ou contactez l'administrateur.</p>
            <details className="text-xs text-gray-500 whitespace-pre-wrap">
              {this.state.error?.message}
            </details>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}
