export const electromagnetism = {
    // ELECTRIC CURRENT - Base: ampere (A)
    electricCurrent: {
        base: 'ampere',
        symbol: 'A',
        units: {
            ampere: { factor: '1', symbol: 'A', name: 'Ampere' },
            milliampere: { factor: '0.001', symbol: 'mA', name: 'Milliampere' },
            microampere: { factor: '0.000001', symbol: 'μA', name: 'Microampere' },
            kiloampere: { factor: '1000', symbol: 'kA', name: 'Kiloampere' }
        }
    },

    // VOLTAGE - Base: volt (V)
    voltage: {
        base: 'volt',
        symbol: 'V',
        units: {
            volt: { factor: '1', symbol: 'V', name: 'Volt' },
            millivolt: { factor: '0.001', symbol: 'mV', name: 'Millivolt' },
            microvolt: { factor: '0.000001', symbol: 'μV', name: 'Microvolt' },
            kilovolt: { factor: '1000', symbol: 'kV', name: 'Kilovolt' }
        }
    },

    // RESISTANCE - Base: ohm (Ω)
    resistance: {
        base: 'ohm',
        symbol: 'Ω',
        units: {
            ohm: { factor: '1', symbol: 'Ω', name: 'Ohm' },
            milliohm: { factor: '0.001', symbol: 'mΩ', name: 'Milliohm' },
            kiloohm: { factor: '1000', symbol: 'kΩ', name: 'Kiloohm' },
            megaohm: { factor: '1000000', symbol: 'MΩ', name: 'Megaohm' }
        }
    },

    // CHARGE - Base: coulomb (C)
    charge: {
        base: 'coulomb',
        symbol: 'C',
        units: {
            coulomb: { factor: '1', symbol: 'C', name: 'Coulomb' },
            millicoulomb: { factor: '0.001', symbol: 'mC', name: 'Millicoulomb' },
            microcoulomb: { factor: '0.000001', symbol: 'μC', name: 'Microcoulomb' },
            ampereHour: { factor: '3600', symbol: 'Ah', name: 'Ampere-hour' },
            milliampereHour: { factor: '3.6', symbol: 'mAh', name: 'Milliampere-hour' }
        }
    },

    // CAPACITANCE - Base: farad (F)
    capacitance: {
        base: 'farad',
        symbol: 'F',
        units: {
            farad: { factor: '1', symbol: 'F', name: 'Farad' },
            millifarad: { factor: '0.001', symbol: 'mF', name: 'Millifarad' },
            microfarad: { factor: '0.000001', symbol: 'μF', name: 'Microfarad' },
            nanofarad: { factor: '0.000000001', symbol: 'nF', name: 'Nanofarad' },
            picofarad: { factor: '0.000000000001', symbol: 'pF', name: 'Picofarad' }
        }
    }
};
