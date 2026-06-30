import React from 'react';
import { Flame, FlaskConical, CookingPot, ArrowRight } from 'lucide-react';

const conversionGroups = [
    {
        label: 'Everyday',
        icon: Flame,
        color: 'text-orange-500',
        bg: 'bg-orange-50 dark:bg-orange-900/15',
        bgGlow: 'from-orange-500/5 to-transparent dark:from-orange-500/10 dark:to-transparent',
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
        label: 'Science',
        icon: FlaskConical,
        color: 'text-blue-500',
        bg: 'bg-blue-50 dark:bg-blue-900/15',
        bgGlow: 'from-blue-500/5 to-transparent dark:from-blue-500/10 dark:to-transparent',
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
        label: 'Cooking',
        icon: CookingPot,
        color: 'text-green-500',
        bg: 'bg-green-50 dark:bg-green-900/15',
        bgGlow: 'from-green-500/5 to-transparent dark:from-green-500/10 dark:to-transparent',
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
        <section className="animate-section-enter animation-delay-2" aria-label="Popular conversions">

            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
                <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">
                    Popular Conversions
                </h3>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800"></div>
            </div>

            {/* Category Groups */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {conversionGroups.map(group => {
                    const GroupIcon = group.icon;
                    return (
                        <div key={group.label} className="relative overflow-hidden glass-panel rounded-3xl p-5 md:p-6 border border-gray-200/50 dark:border-white/[0.05] shadow-sm hover:shadow-md transition-shadow duration-300">
                            {/* Thematic Glow */}
                            <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${group.bgGlow} opacity-50 pointer-events-none mix-blend-screen`}></div>
                            
                            {/* Group header */}
                            <div className="relative flex items-center gap-2.5 mb-4">
                                <div className={`p-2 rounded-xl ${group.bg} shadow-inner`}>
                                    <GroupIcon size={16} className={group.color} />
                                </div>
                                <span className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    {group.label}
                                </span>
                            </div>

                            {/* Conversion pills */}
                            <div className="relative flex flex-wrap gap-2">
                                {group.items.map(conv => (
                                    <button
                                        key={`${conv.cat}-${conv.from}-${conv.to}`}
                                        onClick={() => onSelectConversion(conv.cat, conv.from, conv.to)}
                                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-[0.96] group/pill
                                            bg-white/80 dark:bg-black/20 
                                            border border-gray-200/80 dark:border-white/10
                                            text-gray-700 dark:text-gray-300
                                            hover:border-blue-400/50 dark:hover:border-indigo-400/50
                                            hover:text-blue-600 dark:hover:text-indigo-300
                                            hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 dark:hover:from-white/5 dark:hover:to-indigo-500/10
                                            hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] backdrop-blur-sm"
                                    >
                                        <span>{conv.label.split(' to ')[0] || conv.label}</span>
                                        <ArrowRight size={12} className="text-gray-400 dark:text-gray-500 group-hover/pill:text-blue-500 dark:group-hover/pill:text-indigo-400 transition-colors" />
                                        <span>{conv.label.split(' to ')[1] || ''}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default PopularConversions;
