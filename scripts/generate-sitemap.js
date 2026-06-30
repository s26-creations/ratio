import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load definitions directly
// We need to use relative path and standard JS because this script is run via Node
import { definitions } from '../src/engine/definitions/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://ratioconverter.vercel.app';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');

function generateSitemap() {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Add static routes
    const staticRoutes = ['/', '/history', '/batch', '/settings'];
    for (const route of staticRoutes) {
        xml += `  <url>\n`;
        xml += `    <loc>${BASE_URL}${route}</loc>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n`;
        xml += `  </url>\n`;
    }

    // Add dynamic conversion routes
    for (const [categoryKey, categoryDef] of Object.entries(definitions)) {
        const unitKeys = Object.keys(categoryDef.units);
        
        // Generate every combination of units
        for (let i = 0; i < unitKeys.length; i++) {
            for (let j = 0; j < unitKeys.length; j++) {
                if (i !== j) {
                    const fromUnit = unitKeys[i];
                    const toUnit = unitKeys[j];
                    const route = `/convert/${categoryKey}/${fromUnit}-to-${toUnit}`;
                    
                    xml += `  <url>\n`;
                    xml += `    <loc>${BASE_URL}${route}</loc>\n`;
                    xml += `    <changefreq>monthly</changefreq>\n`;
                    xml += `    <priority>0.6</priority>\n`;
                    xml += `  </url>\n`;
                }
            }
        }
    }

    xml += `</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, xml, 'utf8');
    console.log(`Successfully generated sitemap at ${SITEMAP_PATH}`);
}

generateSitemap();
