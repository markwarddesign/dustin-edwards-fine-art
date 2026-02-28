/**
 * Webpack configuration for custom blocks
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
    ...defaultConfig,
    entry: {
        'hero-section': path.resolve(__dirname, 'blocks/hero-section/index.js'),
        'quote-section': path.resolve(__dirname, 'blocks/quote-section/index.js'),
        'artist-section': path.resolve(__dirname, 'blocks/artist-section/index.js'),
        'statement-section': path.resolve(__dirname, 'blocks/statement-section/index.js'),
        'contact-section': path.resolve(__dirname, 'blocks/contact-section/index.js'),
        'collection-section': path.resolve(__dirname, 'blocks/collection-section/index.js'),
        'work-hero': path.resolve(__dirname, 'blocks/work-hero/index.js'),
        'work-details': path.resolve(__dirname, 'blocks/work-details/index.js'),
        'work-gallery': path.resolve(__dirname, 'blocks/work-gallery/index.js'),
        'work-cta': path.resolve(__dirname, 'blocks/work-cta/index.js'),
        'artist-hero': path.resolve(__dirname, 'blocks/artist-hero/index.js'),
        'artist-bio': path.resolve(__dirname, 'blocks/artist-bio/index.js'),
        'artist-timeline': path.resolve(__dirname, 'blocks/artist-timeline/index.js'),
        'philosophy-section': path.resolve(__dirname, 'blocks/philosophy-section/index.js'),
        'inquire-section': path.resolve(__dirname, 'blocks/inquire-section/index.js'),
        'mosaic-gallery': path.resolve(__dirname, 'blocks/mosaic-gallery/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name]/index.js',
    },
};
