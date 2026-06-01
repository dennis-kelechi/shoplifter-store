import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <h2 style={{textAlign:'center',padding:'2rem'}}>Something went wrong.</h2>;
    return this.props.children;
  }
}
export default ErrorBoundary;