import React from 'react';
import Dropdown from '../common/Dropdown.jsx';
import { getCategoryIcon } from '../../constants/categoryIcons.js';

export function CategorySelector({
    categories,
    selectedCategory,
    onSelectCategory
}) {
    const options = categories.map(cat => ({
        key: cat.key,
        label: cat.name,
        subLabel: `${cat.unitCount} units`,
        icon: getCategoryIcon(cat.key)
    }));

    return (
        <Dropdown
            value={selectedCategory}
            options={options}
            onChange={onSelectCategory}
            placeholder="Select category..."
            searchable={true}
            className="w-full"
        />
    );
}

export default CategorySelector;
