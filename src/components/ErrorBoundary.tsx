import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Application rendering failed', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main role="alert" className="min-h-screen bg-[#1A120B] p-8 text-center text-[#F5F5DC]">
          <h1 className="mb-4 text-3xl font-bold">This page could not be displayed</h1>
          <a className="underline" href="/">Return to Assava home</a>
        </main>
      );
    }
    return this.props.children;
  }
}
