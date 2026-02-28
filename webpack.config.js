/**
 * Webpack configuration for custom blocks
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');
const fs = require('fs');

// Dynamically find all block entries
function getBlockEntries() {
    const blocksDir = path.resolve(__dirname, 'blocks');
    const entries = {};
    
    if (fs.existsSync(blocksDir)) {
        const blockDirs = fs.readdirSync(blocksDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        blockDirs.forEach(blockDir => {
            const indexPath = path.resolve(blocksDir, blockDir, 'index.js');
            if (fs.existsSync(indexPath)) {
                entries[blockDir] = indexPath;
            }
        });
    }
    
    return entries;
}

module.exports = {
    ...defaultConfig,
    entry: getBlockEntries(),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]/index.js',
    },
};
