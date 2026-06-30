import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistoryContext } from '../context/HistoryContext.jsx';
import { useConverterContext } from '../context/ConverterContext.jsx';
import HistoryPanel from '../components/panels/HistoryPanel.jsx';

export function HistoryPage() {
    const navigate = useNavigate();
    const { history, clearHistory, deleteHistoryEntry } = useHistoryContext();
    const { setCategory, setFromUnit, setToUnit, setInputValue } = useConverterContext();

    const handleSelectEntry = (entry) => {
        setCategory(entry.category);
        setFromUnit(entry.from.unit);
        setToUnit(entry.to.unit);
        setInputValue(entry.from.value);
        navigate('/');
    };

    return (
        <HistoryPanel
            history={history}
            onSelectEntry={handleSelectEntry}
            onClearHistory={clearHistory}
            onDeleteEntry={deleteHistoryEntry}
        />
    );
}

export default HistoryPage;
