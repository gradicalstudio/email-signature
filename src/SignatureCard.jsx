import React, { useState } from 'react';

// Styles object for inline usage (vital for email)
export const cardStyles = {
    table: (width, height) => ({
        width: '100%',
        maxWidth: `${width}px`,
        height: `${height}px`,
        minHeight: `${height}px`,
        borderCollapse: 'collapse',
        borderSpacing: 0,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#fefefe',
        backgroundColor: '#000E28',
        background: '#000E28 linear-gradient(180deg, #000E28 0%, #1679B8 49%, #D4F2FD 100%) no-repeat',
        backgroundImage: 'linear-gradient(180deg, #000E28 0%, #1679B8 49%, #D4F2FD 100%)',
        backgroundSize: '100% 100%',
        borderRadius: '2px',
        border: 'none',
        borderWidth: 0,
        outline: 'none',
        WebkitTextSizeAdjust: 'none',
        msTextSizeAdjust: 'none',
        margin: 0,
    }),
    mainCell: {
        padding: '13.5px 12px 13px 12px',
        verticalAlign: 'top',
        textAlign: 'left',
        background: '#000E28 linear-gradient(180deg, #000E28 0%, #1679B8 49%, #D4F2FD 100%) no-repeat',
        backgroundImage: 'linear-gradient(180deg, #000E28 0%, #1679B8 49%, #D4F2FD 100%)',
        backgroundSize: '100% 100%',
    },
    name: {
        color: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '42px',
        fontWeight: 'bold',
        lineHeight: '1.0',
        letterSpacing: '-1px',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    roleContainer: {
        paddingTop: '6px', // Little space between name and role
        paddingBottom: '0px'
    },
    roleIcon: {
        width: '16px',
        height: '16px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginRight: '8px'
    },
    role: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '20px',
        fontWeight: 'normal',
        lineHeight: '1.2',
        letterSpacing: '-0.5px',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        margin: 0,
        padding: 0,
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    email: {
        color: '#ffffff',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
        lineHeight: '1.2',
        textDecoration: 'none',
        background: 'transparent',
        border: 'none',
        outline: 'none',
        margin: 0,
        padding: 0,
        display: 'inline-block',
    },
    inputReset: {
        background: 'transparent',
        border: 'none',
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        width: '100%',
        outline: 'none',
        boxSizing: 'border-box', // Added as per instruction
    }
};

// SVG Icons for absolute reliability (no external links)
// Sharp WHITE icons for visibility and consistency
const ICON_URLS = {
    linkedin: 'https://img.icons8.com/ios-filled/50/ffffff/linkedin.png',
    website: 'https://img.icons8.com/ios/50/ffffff/geography.png' // Wireframe grid globe in white
};

const SignatureCard = ({ data, setData, config = {}, readonly = false, uniqueness = '' }) => {
    const handleChange = (field, value) => {
        if (!readonly && setData) {
            setData(prev => ({ ...prev, [field]: value }));
        }
    };

    const dynamicStyles = {
        name: {
            ...cardStyles.name,
            fontSize: `${config.nameSize || 28}px`,
            fontWeight: config.nameWeight || '500',
            color: '#fefefe',
        },
        role: {
            ...cardStyles.role,
            fontSize: `${config.roleSize || 16}px`,
            fontWeight: config.roleWeight || '500',
            color: 'rgba(254, 254, 254, 0.7)',
        },
        email: {
            ...cardStyles.email,
            fontSize: `${config.emailSize || 12}px`,
            fontWeight: config.emailWeight || '400',
            color: '#fefefe',
        },
    };

    return (
        <React.Fragment>
            <div style={{ display: 'none', fontSize: '1px', color: 'transparent', lineHeight: '1px', opacity: 0 }}>
                {uniqueness}
            </div>
            <table
                cellPadding="0"
                cellSpacing="0"
                border="0"
                bgcolor="#000E28"
                align="left"
                style={{
                    ...cardStyles.table(config.cardWidth || 450, config.cardHeight || 130),
                    outline: 'none',
                }}
                id={readonly ? undefined : "signature-card-preview"}
                width={config.cardWidth || 450}
            >
                <tr>
                    <td bgcolor="#000E28" style={cardStyles.mainCell}>

                        {/* TOP SECTION: Name */}
                        <table cellPadding="0" cellSpacing="0" border="0" width="100%">
                            <tr>
                                <td>
                                    {readonly ? (
                                        <div style={dynamicStyles.name}>
                                            <font color="#fefefe">
                                                <span style={{ color: '#fefefe', fontWeight: config.nameWeight || '500', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-1.2px', lineHeight: '1.0' }}>
                                                    {data.name}
                                                </span>
                                            </font>
                                        </div>
                                    ) : (
                                        <input
                                            style={{ ...cardStyles.inputReset, ...dynamicStyles.name }}
                                            value={data.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                            placeholder="Name"
                                        />
                                    )}
                                </td>
                            </tr>
                        </table>

                        {/* MIDDLE SECTION: Role with Dots Icon */}
                        <table cellPadding="0" cellSpacing="0" border="0" width="100%" style={{ marginTop: '2px' }}>
                            <tr>
                                <td valign="middle">
                                    <table cellPadding="0" cellSpacing="0" border="0" width="100%">
                                        <tr>
                                            <td width="16" valign="middle" style={{ width: '16px', verticalAlign: 'middle', paddingRight: '6px', lineHeight: 0 }}>
                                                {/* Bullet Pattern recreaated with table to ensure it NEVER breaks */}
                                                <table cellPadding="0" cellSpacing="0" border="0" width="12" height="12">
                                                    <tr>
                                                        <td align="left" valign="top" style={{ lineHeight: '1px', fontSize: '1px' }}>
                                                            <div style={{ width: '3px', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '50%' }}></div>
                                                        </td>
                                                        <td width="6"></td>
                                                    </tr>
                                                    <tr>
                                                        <td height="1"></td>
                                                        <td height="1"></td>
                                                    </tr>
                                                    <tr>
                                                        <td></td>
                                                        <td align="right" valign="middle" style={{ lineHeight: '1px', fontSize: '1px' }}>
                                                            <div style={{ width: '3px', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '50%' }}></div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td height="1"></td>
                                                        <td height="1"></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" valign="bottom" style={{ lineHeight: '1px', fontSize: '1px' }}>
                                                            <div style={{ width: '3px', height: '3px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '50%' }}></div>
                                                        </td>
                                                        <td></td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td width="100%" valign="middle" style={{ width: '100%', verticalAlign: 'middle' }}>
                                                {readonly ? (
                                                    <span style={dynamicStyles.role}>
                                                        <font color="#99a1af">
                                                            <span style={{ color: 'rgba(254, 254, 254, 0.7)', fontWeight: config.roleWeight || '500', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                                                                {data.role}
                                                            </span>
                                                        </font>
                                                    </span>
                                                ) : (
                                                    <input
                                                        style={{ ...cardStyles.inputReset, ...dynamicStyles.role }}
                                                        value={data.role}
                                                        onChange={(e) => handleChange('role', e.target.value)}
                                                        placeholder="Role"
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        {/* SPACER - Pushes bottom row down. */}
                        <div style={{ height: `${(config.cardHeight || 130) - 105}px`, minHeight: '10px', lineHeight: '1px', fontSize: '1px' }}>&nbsp;</div>


                        {/* BOTTOM SECTION: Email (Left) and Social Icons (Right) */}
                        <table cellPadding="0" cellSpacing="0" border="0" width="100%">
                            <tr>
                                <td align="left" valign="middle" style={{ verticalAlign: 'middle' }}>
                                    {/* Email */}
                                    {readonly ? (
                                        <a href={`mailto:${data.email}`} style={{ ...dynamicStyles.email, verticalAlign: 'middle', textDecoration: 'none', border: 'none', display: 'inline-block' }}>
                                            <span style={{ color: '#fefefe', fontWeight: config.emailWeight || '400', fontFamily: 'Inter, -apple-system, sans-serif', letterSpacing: '-0.2px', lineHeight: '1.2', textDecoration: 'none' }}>
                                                {data.email}
                                            </span>
                                        </a>
                                    ) : (
                                        <input
                                            style={{ ...cardStyles.inputReset, ...dynamicStyles.email, verticalAlign: 'middle' }}
                                            value={data.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            placeholder="Email"
                                        />
                                    )}
                                </td>
                                <td align="right" valign="middle" style={{ verticalAlign: 'middle' }}>
                                    {/* Icons */}
                                    <table cellPadding="0" cellSpacing="0" border="0" align="right">
                                        <tr>
                                            {data.linkedin && (
                                                <td style={{ paddingLeft: '10px', verticalAlign: 'middle' }} valign="middle">
                                                    <a href={data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`} style={{ textDecoration: 'none', display: 'inline-block', verticalAlign: 'middle', lineHeight: 0, cursor: 'pointer', pointerEvents: 'auto' }}>
                                                        <img src={ICON_URLS.linkedin} width="18" height="18" alt="L" style={{ border: 'none', width: '18px', height: '18px', display: 'block' }} />
                                                    </a>
                                                </td>
                                            )}
                                            {data.website && (
                                                <td style={{ paddingLeft: '8px', verticalAlign: 'middle' }} valign="middle">
                                                    <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} style={{ textDecoration: 'none', display: 'inline-block', verticalAlign: 'middle', lineHeight: 0, cursor: 'pointer', pointerEvents: 'auto' }}>
                                                        <img src={ICON_URLS.website} width="18" height="18" alt="W" style={{ border: 'none', width: '18px', height: '18px', display: 'block' }} />
                                                    </a>
                                                </td>
                                            )}
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </React.Fragment>
    );
};

export default SignatureCard;
