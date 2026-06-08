'use client';

import React from 'react';

export default function GlobalError({ error, reset }) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught an error:', error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>System Error — BNHP</title>
        <meta name="theme-color" content="#000000" />
        <style>{`
          body {
            background-color: #050505;
            color: #ffffff;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
          }
          .container {
            text-align: center;
            max-width: 500px;
            padding: 40px;
            border: 1px solid rgba(198, 172, 111, 0.2);
            background: linear-gradient(180deg, rgba(11, 11, 11, 0.8) 0%, rgba(5, 5, 5, 0.9) 100%);
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 50px rgba(198, 172, 111, 0.05);
            position: relative;
          }
          .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #C6AC6F, transparent);
          }
          h2 {
            font-size: 24px;
            font-weight: 600;
            letter-spacing: 1px;
            color: #C6AC6F;
            margin-top: 0;
            margin-bottom: 16px;
            text-transform: uppercase;
          }
          p {
            font-size: 14px;
            color: #a0a0a0;
            line-height: 1.6;
            margin-bottom: 28px;
          }
          button {
            background: linear-gradient(90deg, #C6AC6F, #E2CA90);
            color: #000000;
            border: none;
            padding: 12px 32px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.5px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.23, 1, 0.32, 1);
            box-shadow: 0 4px 15px rgba(198, 172, 111, 0.2);
          }
          button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(198, 172, 111, 0.3);
          }
          button:active {
            transform: translateY(1px);
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h2>System Encountered an Error</h2>
          <p>
            An unexpected error occurred in the BNHP core runtime. Our engineers have been notified. Please try reloading the system application.
          </p>
          <button onClick={() => reset()}>
            RELOAD SYSTEM
          </button>
        </div>
      </body>
    </html>
  );
}
