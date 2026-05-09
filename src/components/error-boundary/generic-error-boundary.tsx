"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GenericErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
          <Alert variant="destructive" className="max-w-md border-2">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg font-bold">Something went wrong</AlertTitle>
            <AlertDescription className="mt-2 text-sm">
              An unexpected error occurred while rendering this section.
            </AlertDescription>
            <div className="mt-4 flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => this.setState({ hasError: false })}
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
