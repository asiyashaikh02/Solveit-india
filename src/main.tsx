import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("🚀 Application bootstrap sequence started...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("FATAL: Root element '#root' not found in document. Check index.html.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log("✅ Main app rendered to DOM successfully.");
  } catch (err) {
    console.error("💥 Fatal render crash:", err);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif; color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 8px; margin: 20px;">
        <h2 style="margin-top: 0;">Application failed to start</h2>
        <p>The application encountered a fatal error during startup. Please check the browser console for details.</p>
        <pre style="background: rgba(0,0,0,0.05); padding: 10px; border-radius: 4px; overflow: auto; max-height: 200px;">${err instanceof Error ? err.message : String(err)}</pre>
      </div>
    `;
  }
}
