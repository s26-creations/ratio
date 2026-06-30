import React from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import { useNavigate } from 'react-router-dom';
import SettingsPanel from '../components/panels/SettingsPanel.jsx';

export function SettingsPage() {
    const navigate = useNavigate();
    const { decimals, setDecimals, darkMode, toggleDarkMode } = useSettings();

    return (
        <SettingsPanel
            decimals={decimals}
            setDecimals={setDecimals}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onClose={() => navigate('/')}
        />
    );
}

export default SettingsPage;
