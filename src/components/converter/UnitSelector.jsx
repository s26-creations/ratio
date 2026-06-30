import React from 'react';
import Dropdown from '../common/Dropdown.jsx';

export function UnitSelector({
    units,
    selectedUnit,
    onSelectUnit
}) {
    const options = units.map(unit => ({
        key: unit.key,
        label: unit.name,
        subLabel: unit.symbol,
        tooltip: unit.formula
    }));

    return (
        <Dropdown
            value={selectedUnit}
            options={options}
            onChange={onSelectUnit}
            placeholder="Select unit..."
            searchable={true}
            className="w-full"
        />
    );
}

export default UnitSelector;
