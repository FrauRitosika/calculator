import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
    fallback: React.ReactNode;
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
        this.setState({ error, errorInfo });
    };

    render() {
        if (this.state.hasError) {
            <div className="error">
                    <h2 className='error__title'>Что-то пошло не так</h2>
                    {this.state.error?.message}
            </div>
        }

        return this.props.children;
    }
}
export default ErrorBoundary;