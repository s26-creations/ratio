import React from 'react';
import { ArrowRight } from 'lucide-react';

const conversionGroups = [
    {
        label: 'Everyday',
        description: 'Common measurements for daily tasks, travel, and personal metrics.',
        color: 'bg-orange-500',
        items: [
            { label: '°C to °F', cat: 'temperature', from: 'celsius', to: 'fahrenheit' },
            { label: 'km to mi', cat: 'length', from: 'kilometer', to: 'mile' },
            { label: 'kg to lb', cat: 'mass', from: 'kilogram', to: 'pound' },
            { label: 'L to gal', cat: 'volume', from: 'liter', to: 'gallonUS' },
            { label: 'cm to in', cat: 'length', from: 'centimeter', to: 'inch' },
            { label: 'ft to m', cat: 'length', from: 'foot', to: 'meter' }
        ]
    },
    {
        label: 'Science & Engineering',
        description: 'High-precision units for scientific research, engineering, and physics.',
        color: 'bg-blue-500',
        items: [
            { label: 'J to cal', cat: 'energy', from: 'joule', to: 'calorie' },
            { label: 'Pa to atm', cat: 'pressure', from: 'pascal', to: 'atmosphere' },
            { label: '° to rad', cat: 'angle', from: 'degree', to: 'radian' },
            { label: 'W to hp', cat: 'power', from: 'watt', to: 'horsepower' },
            { label: 'N to lbf', cat: 'force', from: 'newton', to: 'poundForce' },
            { label: 'eV to J', cat: 'energy', from: 'electronvolt', to: 'joule' }
        ]
    },
    {
        label: 'Cooking & Baking',
        description: 'Crucial kitchen conversions for perfect recipes and scaling ingredients.',
        color: 'bg-green-500',
        items: [
            { label: 'cups to g (flour)', cat: 'Cooking_Flour', from: 'cup', to: 'gram' },
            { label: 'tbsp to mL', cat: 'volume', from: 'tablespoon', to: 'milliliter' },
            { label: 'oz to g', cat: 'mass', from: 'ounce', to: 'gram' },
            { label: 'cups to g (sugar)', cat: 'Cooking_Sugar', from: 'cup', to: 'gram' },
            { label: 'gal to L', cat: 'volume', from: 'gallonUS', to: 'liter' },
            { label: 'lb to kg', cat: 'mass', from: 'pound', to: 'kilogram' }
        ]
    }
];

export function PopularConversions({ onSelectConversion }) {
    return (
        <section className="relative animate-section-enter border-t border-gray-200/50 dark:border-white/10 pt-12 mt-12 mb-20" aria-label="Popular conversions">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">
                    Explore
                </h3>
            </div>
            
            <h2 className="font-grotesk text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
                Popular Conversions
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mb-12">
                Discover the most frequently used unit pairs across different domains. Whether you're baking a cake, studying for a physics exam, or building a software application, Ratio has you covered with over 260 supported units processed with zero latency and arbitrary precision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {conversionGroups.map((group, groupIndex) => (
                    <div key={group.label} className="flex flex-col animate-list-item" style={{ animationDelay: `${groupIndex * 100}ms` }}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className={`w-2 h-2 rounded-full ${group.color}`}></div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{group.label}</h4>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            {group.description}
                        </p>
                        
                        <div className="flex flex-col gap-1 border-t border-gray-100 dark:border-white/5 pt-4">
                            {group.items.map((conv) => (
                                <button
                                    key={`${conv.cat}-${conv.from}-${conv.to}`}
                                    onClick={() => onSelectConversion(conv.cat, conv.from, conv.to)}
                                    className="group flex items-center justify-between py-2 text-left transition-colors hover:bg-gray-50/50 dark:hover:bg-white/[0.02] rounded-lg px-2 -mx-2"
                                >
                                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                        {conv.label.split(' to ')[0]} <span className="text-gray-400 font-normal mx-1">to</span> {conv.label.split(' to ')[1]}
                                    </span>
                                    <ArrowRight size={14} className="text-gray-300 dark:text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-900 dark:group-hover:text-white" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default PopularConversions;
