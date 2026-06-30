export const typography = {
    // TYPOGRAPHY - Base: pixel (px) - Assuming 96 DPI
    Typography: {
        base: 'pixel',
        symbol: 'px',
        units: {
            pixel: { factor: '1', symbol: 'px', name: 'Pixel' },
            point: { factor: '1.33333333333333333333', symbol: 'pt', name: 'Point' }, // 96/72
            pica: { factor: '16', symbol: 'pc', name: 'Pica' }, // 12pt
            inch: { factor: '96', symbol: 'in', name: 'Inch' },
            centimeter: { factor: '37.79527559055118', symbol: 'cm', name: 'Centimeter' }, // 96/2.54
            millimeter: { factor: '3.779527559055118', symbol: 'mm', name: 'Millimeter' },
            rem: { factor: '16', symbol: 'rem', name: 'Root EM (16px base)' },
            em: { factor: '16', symbol: 'em', name: 'EM (16px base)' },
            twip: { factor: '0.06666666666666666666', symbol: 'twip', name: 'Twip' } // 1/20 pt
        }
    }
};
