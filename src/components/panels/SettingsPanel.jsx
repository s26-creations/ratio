import React from 'react';
import { X, Zap, Shield, Globe, Award, Table2, Moon, Sun } from 'lucide-react';
import Button from '../common/Button.jsx';

export function SettingsPanel({
    decimals,
    setDecimals,
    darkMode,
    toggleDarkMode,
    onClose
}) {
    return (
        <div className="w-full max-w-2xl mx-auto animate-slide-up pb-20">
            {/* Header */}
            <div className="glass-panel rounded-2xl p-4 md:p-6 mb-4 md:mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Customize your experience</p>
                </div>
                <Button onClick={onClose} variant="secondary" className="md:hidden">
                    Done
                </Button>
            </div>

            <div className="space-y-6">
                {/* Appearance Section */}
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Appearance</h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-xl ${darkMode ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-100 text-slate-600'}`}>
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {darkMode ? 'Dark Mode' : 'Light Mode'}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={toggleDarkMode}
                            className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${darkMode
                                ? 'bg-gray-700 text-white hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            Toggle
                        </button>
                    </div>
                </div>

                {/* Calculation Section */}
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Calculation</h3>
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Decimal Precision
                            </label>
                            <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-0.5">
                                {decimals}
                            </span>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="20"
                            value={decimals}
                            onChange={(e) => setDecimals(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Controls the maximum number of decimal places in the result.
                        </p>
                    </div>
                </div>

                {/* Info / About Section */}
                <div className="glass-panel rounded-2xl p-4 md:p-6 overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <span className="text-xl font-bold">R</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">About Ratio</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">The Gold Standard of Conversion</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="text-center md:text-left space-y-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Ratio is a state-of-the-art computational engine wrapped in a meticulously crafted interface, designed for those who demand absolute accuracy without compromising on aesthetics.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <FeatureCard
                                icon={<Zap className="text-amber-500" />}
                                title="Lightning Fast"
                                description="Instant conversions with zero latency."
                            />
                            <FeatureCard
                                icon={<Shield className="text-blue-500" />}
                                title="Scientific Precision"
                                description="Built on decimal.js for zero errors."
                            />
                            <FeatureCard
                                icon={<Globe className="text-green-500" />}
                                title="Universal Support"
                                description="Over 40 categories and 260+ units."
                            />
                            <FeatureCard
                                icon={<Table2 className="text-purple-500" />}
                                title="Batch Converter"
                                description="Convert multiple values instantly."
                            />
                        </div>



                        <div className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-xl text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                © {new Date().getFullYear()} Ratio. Crafted with precision.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Developer Note Section */}
                <div className="glass-panel rounded-2xl p-4 md:p-6">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Note from the Developer
                    </h3>
                    <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                            "I built this app after identifying a gap I experienced firsthand as a student: the need for a converter that is scientifically precise yet also clean, intuitive, and visually refined. This app is the result of that goal. If you have any questions or suggestions, feel free to reach out."
                        </p>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <a
                                href="mailto:santi.studiox@gmail.com"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium text-sm shadow-lg shadow-blue-500/20"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Developer
                            </a>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 select-all">
                                santi.studiox@gmail.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 shadow-sm">
            <div className="mb-2 w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                {icon}
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{description}</p>
        </div>
    );
}

export default SettingsPanel;
