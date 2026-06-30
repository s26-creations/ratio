export const computing = {
    // DATA SIZE - Base: byte (B) - Using decimal (1000) standard
    dataSize: {
        base: 'byte',
        symbol: 'B',
        units: {
            bit: { factor: '0.125', symbol: 'b', name: 'Bit' },
            byte: { factor: '1', symbol: 'B', name: 'Byte' },
            kilobyte: { factor: '1000', symbol: 'kB', name: 'Kilobyte' },
            megabyte: { factor: '1000000', symbol: 'MB', name: 'Megabyte' },
            gigabyte: { factor: '1000000000', symbol: 'GB', name: 'Gigabyte' },
            terabyte: { factor: '1000000000000', symbol: 'TB', name: 'Terabyte' },
            petabyte: { factor: '1000000000000000', symbol: 'PB', name: 'Petabyte' },
            // Binary (1024) standard
            kibibyte: { factor: '1024', symbol: 'KiB', name: 'Kibibyte' },
            mebibyte: { factor: '1048576', symbol: 'MiB', name: 'Mebibyte' },
            gibibyte: { factor: '1073741824', symbol: 'GiB', name: 'Gibibyte' },
            tebibyte: { factor: '1099511627776', symbol: 'TiB', name: 'Tebibyte' },
            pebibyte: { factor: '1125899906842624', symbol: 'PiB', name: 'Pebibyte' }
        }
    },

    // DATA TRANSFER - Base: bit per second (bps)
    dataTransfer: {
        base: 'bitPerSecond',
        symbol: 'bps',
        units: {
            bitPerSecond: { factor: '1', symbol: 'bps', name: 'Bit per Second' },
            bytePerSecond: { factor: '8', symbol: 'B/s', name: 'Byte per Second' },
            kilobitPerSecond: { factor: '1000', symbol: 'kbps', name: 'Kilobit per Second' },
            megabitPerSecond: { factor: '1000000', symbol: 'Mbps', name: 'Megabit per Second' },
            gigabitPerSecond: { factor: '1000000000', symbol: 'Gbps', name: 'Gigabit per Second' },
            terabitPerSecond: { factor: '1000000000000', symbol: 'Tbps', name: 'Terabit per Second' },
            kilobytePerSecond: { factor: '8000', symbol: 'kB/s', name: 'Kilobyte per Second' },
            megabytePerSecond: { factor: '8000000', symbol: 'MB/s', name: 'Megabyte per Second' },
            gigabytePerSecond: { factor: '8000000000', symbol: 'GB/s', name: 'Gigabyte per Second' }
        }
    }
};
