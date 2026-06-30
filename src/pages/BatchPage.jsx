import React from 'react';
import { useConverterContext } from '../context/ConverterContext.jsx';
import BatchConvertPanel from '../components/panels/BatchConvertPanel.jsx';

export function BatchPage() {
    const { category, units, fromUnit, toUnit } = useConverterContext();

    return (
        <BatchConvertPanel
            category={category}
            units={units}
            defaultFrom={fromUnit}
            defaultTo={toUnit}
        />
    );
}

export default BatchPage;
