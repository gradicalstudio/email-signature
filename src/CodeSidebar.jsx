import React, { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import SignatureCard from './SignatureCard';

const CodeSidebar = ({ data }) => {

    const generatedCode = useMemo(() => {
        const staticCard = <SignatureCard data={data} readonly={true} />;
        return renderToStaticMarkup(staticCard);
    }, [data]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        alert("Code copied to clipboard!");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Generated HTML</h2>
                <button onClick={copyToClipboard} className="copy-btn">Copy Code</button>
            </div>
            <div className="code-display">
                {generatedCode}
            </div>
            <style>{`
        .sidebar {
            width: 350px;
            background: #1a1a1a;
            color: #fff;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            border-left: 1px solid #333;
            overflow: hidden;
        }
        .sidebar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .sidebar-header h2 {
            font-size: 1.2rem;
            margin: 0;
            font-family: 'Geist Sans', sans-serif;
        }
        .copy-btn {
            background: #1679B8;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-family: 'Geist Sans', sans-serif;
            font-weight: 500;
        }
        .copy-btn:hover {
            background: #136094;
        }
        .code-display {
            background: #000;
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 0.85rem;
            overflow-y: auto;
            white-space: pre-wrap;
            word-break: break-all;
            flex: 1;
            color: #a5d6ff;
        }
      `}</style>
        </div>
    );
};

export default CodeSidebar;
