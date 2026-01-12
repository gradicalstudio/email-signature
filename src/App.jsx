import React, { useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server';
import SignatureCard from './SignatureCard'
import Sidebar from './Sidebar'

function App() {
  const [data, setData] = useState({
    name: 'First Name',
    role: 'Role, GRADICAL',
    email: 'email@gradical.xyz',
    website: 'gradical.xyz',
    linkedin: '-',
  });

  const [config, setConfig] = useState({
    nameSize: 28,
    roleSize: 16,
    emailSize: 12,
    nameWeight: '500', // Medium
    roleWeight: '500', // Medium
    emailWeight: '400', // Regular
    cardWidth: 450,
    cardHeight: 130
  });

  const [isDark, setIsDark] = useState(false);

  const handleCopy = async () => {
    try {
      const uniquenessId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      const staticCard = <SignatureCard data={data} config={config} readonly={true} uniqueness={uniquenessId} />;
      let html = renderToStaticMarkup(staticCard);

      // GMAIL COLOR-LOCK BYPASS
      html = html.replace(/color:\s?#fefefe/gi, 'color:#fefefe !important; -webkit-text-fill-color:#fefefe !important; text-shadow: 0 0 0 #fefefe !important');
      html = html.replace(/rgba\(\s?254,\s?254,\s?254,\s?0.7\s?\)/g, 'rgba(254,254,254,0.7) !important; -webkit-text-fill-color:rgba(254,254,254,0.7) !important; text-shadow: 0 0 0 rgba(254,254,255,0.7) !important');
      html = html.replace(/font-family:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/font-weight:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/letter-spacing:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/line-height:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/text-decoration:\s?none/gi, 'text-decoration:none !important');
      html = html.replace(/display:\s?inline-block/gi, 'display:inline-block !important');

      const blobHtml = new Blob([html], { type: 'text/html' });
      const blobText = new Blob([html], { type: 'text/plain' });

      const dataItem = new ClipboardItem({
        'text/html': blobHtml,
        'text/plain': blobText,
      });

      await navigator.clipboard.write([dataItem]);
      alert("Signature copied to clipboard! You can now paste it into Gmail.");
    } catch (err) {
      console.error('Failed to copy: ', err);
      const staticCard = <SignatureCard data={data} config={config} readonly={true} />;
      const html = renderToStaticMarkup(staticCard);
      navigator.clipboard.writeText(html).then(() => {
        alert("Copied HTML code (Fallback).");
      });
    }
  };

  const handleDownload = () => {
    try {
      const uniquenessId = Date.now().toString(36) + Math.random().toString(36).substring(2);
      const staticCard = <SignatureCard data={data} config={config} readonly={true} uniqueness={uniquenessId} />;
      let html = renderToStaticMarkup(staticCard);

      // Apply Gmail fixes to download as well
      html = html.replace(/color:\s?#fefefe/gi, 'color:#fefefe !important; -webkit-text-fill-color:#fefefe !important; text-shadow: 0 0 0 #fefefe !important');
      html = html.replace(/rgba\(\s?254,\s?254,\s?254,\s?0.7\s?\)/g, 'rgba(254,254,254,0.7) !important; -webkit-text-fill-color:rgba(254,254,254,0.7) !important; text-shadow: 0 0 0 rgba(254,254,255,0.7) !important');
      html = html.replace(/font-family:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/font-weight:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/letter-spacing:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/line-height:[^;"]+/gi, (match) => match + ' !important');
      html = html.replace(/text-decoration:\s?none/gi, 'text-decoration:none !important');
      html = html.replace(/display:\s?inline-block/gi, 'display:inline-block !important');

      // Add basic HTML structure for the file
      const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Signature Preview</title></head><body style="padding: 40px; background: #fff; -webkit-user-select: text; user-select: text;"><p style="font-size:13px; color:#666; margin-bottom:20px;">Highlight the card below and copy it (Ctrl+C):</p>${html}</body></html>`;

      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `signature_${data.name.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="app-container">
      <div
        className="canvas"
        style={{
          backgroundColor: isDark ? '#111111' : '#F9F9F9',
          backgroundImage: isDark ? 'radial-gradient(#333333 1px, transparent 1px)' : 'radial-gradient(#E5E5E5 1px, transparent 1px)'
        }}
      >
        <div
          className="card-wrapper"
          style={{
            boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.5)' : '0 20px 50px rgba(0,0,0,0.1)',
            transform: 'scale(1.1)', // Make it slightly more prominent in editor
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <SignatureCard data={data} setData={setData} config={config} readonly={false} />
        </div>

        {/* Mode Toggle at Bottom Center */}
        <div className="mode-toggle">
          <button
            onClick={() => setIsDark(false)}
            className={`toggle-btn ${!isDark ? 'active' : ''}`}
          >
            Light
          </button>
          <button
            onClick={() => setIsDark(true)}
            className={`toggle-btn ${isDark ? 'active' : ''}`}
          >
            True Dark Mode
          </button>
        </div>
      </div>

      <Sidebar
        data={data}
        setData={setData}
        config={config}
        setConfig={setConfig}
        onCopy={handleCopy}
        onDownload={handleDownload}
      />

      <style>{`
        body { margin: 0; font-family: 'Geist Sans', sans-serif; background: #F9F9F9; }
        .app-container {
            display: flex;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }
        .canvas {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: 24px 24px;
            position: relative;
            transition: all 0.4s ease;
        }
        .card-wrapper {
            background: #000E28;
            border-radius: 2px;
            overflow: hidden;
        }
        
        .mode-toggle {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            padding: 4px;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            z-index: 100;
        }
        
        .toggle-btn {
            border: none;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            color: #666;
            background: transparent;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
        }
        
        .toggle-btn.active {
            background: #000;
            color: #FFF;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  )
}

export default App
