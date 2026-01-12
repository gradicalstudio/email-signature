import React, { useRef } from 'react';

const Panel = ({ title, children, icon }) => (
    <div className="panel">
        <div className="panel-header">
            <span className="panel-arrow">
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </span>
            <span className="panel-title">{title}</span>
            {icon && <span className="panel-icon">{icon}</span>}
        </div>
        <div className="panel-content">
            {children}
        </div>
    </div>
);

const ControlRow = ({ label, children }) => (
    <div className="control-row">
        <label>{label}</label>
        <div className="control-input-wrapper">
            {children}
        </div>
    </div>
);

const NumberInput = ({ value, onChange, unit = 'px' }) => (
    <div className="number-input-container">
        <input
            type="number"
            value={value}
            onChange={onChange}
            className="number-input"
        />
        <span className="unit">{unit}</span>
    </div>
);

const Sidebar = ({ data, setData, config, setConfig, onCopy, onDownload }) => {
    return (
        <div className="sidebar">

            <div className="sidebar-scroll">
                <Panel title="Profile">
                    <ControlRow label="Name">
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            className="text-input"
                        />
                    </ControlRow>
                    <ControlRow label="Role">
                        <input
                            type="text"
                            value={data.role}
                            onChange={(e) => setData({ ...data, role: e.target.value })}
                            className="text-input"
                        />
                    </ControlRow>
                    <ControlRow label="Email">
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            className="text-input"
                        />
                    </ControlRow>
                    <ControlRow label="Website">
                        <input
                            type="text"
                            value={data.website}
                            onChange={(e) => setData({ ...data, website: e.target.value })}
                            className="text-input"
                            placeholder="e.g. gradical.xyz"
                        />
                    </ControlRow>
                    <ControlRow label="LinkedIn">
                        <input
                            type="text"
                            value={data.linkedin}
                            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
                            className="text-input"
                            placeholder="e.g. linkedin.com/in/user"
                        />
                    </ControlRow>
                </Panel>

                <Panel title="Layout">
                    <ControlRow label="Width">
                        <NumberInput
                            value={config.cardWidth}
                            onChange={(e) => setConfig({ ...config, cardWidth: Number(e.target.value) })}
                        />
                    </ControlRow>
                    <ControlRow label="Height">
                        <NumberInput
                            value={config.cardHeight}
                            onChange={(e) => setConfig({ ...config, cardHeight: Number(e.target.value) })}
                        />
                    </ControlRow>
                </Panel>

                <Panel title="Typography">
                    <ControlRow label="Name Size">
                        <NumberInput
                            value={config.nameSize}
                            onChange={(e) => setConfig({ ...config, nameSize: Number(e.target.value) })}
                        />
                    </ControlRow>
                    <ControlRow label="Name Weight">
                        <select
                            value={config.nameWeight}
                            onChange={(e) => setConfig({ ...config, nameWeight: e.target.value })}
                            className="text-input"
                            style={{ padding: '6px' }}
                        >
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                        </select>
                    </ControlRow>
                    <ControlRow label="Role Size">
                        <NumberInput
                            value={config.roleSize}
                            onChange={(e) => setConfig({ ...config, roleSize: Number(e.target.value) })}
                        />
                    </ControlRow>
                    <ControlRow label="Role Weight">
                        <select
                            value={config.roleWeight}
                            onChange={(e) => setConfig({ ...config, roleWeight: e.target.value })}
                            className="text-input"
                            style={{ padding: '6px' }}
                        >
                            <option value="400">Regular</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                        </select>
                    </ControlRow>
                    <ControlRow label="Email Size">
                        <NumberInput
                            value={config.emailSize}
                            onChange={(e) => setConfig({ ...config, emailSize: Number(e.target.value) })}
                        />
                    </ControlRow>
                    <ControlRow label="Email Weight">
                        <select
                            value={config.emailWeight}
                            onChange={(e) => setConfig({ ...config, emailWeight: e.target.value })}
                            className="text-input"
                            style={{ padding: '6px' }}
                        >
                            <option value="400">Regular</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                        </select>
                    </ControlRow>
                </Panel>

                <Panel title="Export">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button className="copy-btn" onClick={onCopy}>
                            Copy Signature
                        </button>
                        <button
                            className="copy-btn"
                            onClick={onDownload}
                            style={{ background: '#fff', color: '#111', border: '1px solid #E0E0E0' }}
                        >
                            Download as HTML
                        </button>
                    </div>
                </Panel>
            </div>

            <style>{`
        /* Reset & Base */
        * { box-sizing: border-box; }

        .sidebar {
            width: 320px;
            background: #F9F9F9; /* Light grey bg for contrast */
            border-left: 1px solid #E5E5E5;
            height: 100vh;
            font-family: 'Inter', 'Geist Sans', sans-serif;
            color: #111;
            display: flex;
            flex-direction: column;
        }

        .sidebar-scroll {
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        /* Panel Card */
        .panel {
            background: #FFFFFF;
            border-radius: 8px; /* Slightly tighter radius than Plan (12px) to match 'Design Tool' look better */
            box-shadow: 0 1px 3px rgba(0,0,0,0.05); /* very subtle shadow */
            padding: 4px 0;
            border: 1px solid transparent; 
            /* To resemble proper inputs, we might want a border? 
               The ref image has soft shadows on white cards. */
        }

        .panel-header {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            cursor: pointer;
            gap: 10px;
        }

        .panel-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            transform: rotate(90deg); /* Expanded by default */
        }

        .panel-title {
            font-size: 13px;
            font-weight: 600;
            color: #333;
            flex: 1;
        }

        .panel-content {
            padding: 8px 16px 16px 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        /* Controls */
        .control-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .control-row label {
            font-size: 13px;
            color: #666;
            font-weight: 400;
            min-width: 60px;
        }

        .control-input-wrapper {
            flex: 1;
        }

        /* Text Input */
        .text-input {
            width: 100%;
            padding: 6px 10px;
            border-radius: 6px;
            border: 1px solid #E0E0E0; /* Light border */
            font-size: 13px;
            color: #333;
            background: #fff;
            transition: all 0.2s;
        }
        .text-input:focus {
            border-color: #3B82F6; /* Subtle blue focus, or #000 if strictly monochrome */
            border-color: #000;
            outline: none;
        }

        /* Number Input */
        .number-input-container {
            display: flex;
            align-items: center;
            border: 1px solid #E0E0E0;
            border-radius: 6px;
            padding: 0 8px;
            background: #fff;
            transition: border-color 0.2s;
            height: 32px;
        }
        .number-input-container:hover {
            border-color: #ccc;
        }
        .number-input-container:focus-within {
            border-color: #000;
        }

        .number-input {
            border: none;
            width: 100%;
            font-size: 13px;
            color: #333;
            background: transparent;
            outline: none;
        }
        /* Remove arrows */
        .number-input::-webkit-outer-spin-button,
        .number-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        
        .unit {
            font-size: 12px;
            color: #999;
            user-select: none;
        }

        /* Profile Row */
        .profile-upload-row {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 4px;
        }
        .avatar-preview {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #F0F0F0;
            background-position: center;
            background-size: cover;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid #E5E5E5;
            color: #999;
            font-size: 20px;
        }
        .small-btn {
            font-size: 12px;
            padding: 4px 8px;
            border: 1px solid #E0E0E0;
            background: #fff;
            border-radius: 4px;
            cursor: pointer;
            color: #333;
        }
        .small-btn:hover {
            background: #F5F5F5;
        }
        
        .copy-btn {
            width: 100%;
            padding: 10px;
            background: #111;
            color: #fff;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            border: none;
            cursor: pointer;
        }
        .copy-btn:hover {
            opacity: 0.9;
        }

      `}</style>
        </div>
    );
};

export default Sidebar;
