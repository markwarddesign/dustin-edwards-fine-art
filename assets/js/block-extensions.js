/**
 * Add custom styling controls to core blocks
 */
(function() {
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, SelectControl, TextControl } = wp.components;
    const { addFilter } = wp.hooks;

    // List of blocks to add styling controls to
    const supportedBlocks = [
        'core/shortcode',
        'core/legacy-widget'
    ];

    /**
     * Add styling attributes to supported blocks
     */
    function addStylingAttributes(settings, name) {
        if (!supportedBlocks.includes(name)) {
            return settings;
        }

        settings.attributes = Object.assign(settings.attributes, {
            maxWidth: {
                type: 'string',
                default: ''
            },
            backgroundColor: {
                type: 'string',
                default: ''
            },
            padding: {
                type: 'string',
                default: ''
            },
            margin: {
                type: 'string',
                default: ''
            },
            customCSS: {
                type: 'string',
                default: ''
            }
        });

        return settings;
    }

    /**
     * Add styling controls to block editor
     */
    const withStylingControls = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            const { name, attributes, setAttributes } = props;

            if (!supportedBlocks.includes(name)) {
                return wp.element.createElement(BlockEdit, props);
            }

            const {
                maxWidth,
                backgroundColor,
                padding,
                margin,
                customCSS
            } = attributes;

            return wp.element.createElement(
                Fragment,
                {},
                wp.element.createElement(BlockEdit, props),
                wp.element.createElement(
                    InspectorControls,
                    {},
                    wp.element.createElement(
                        PanelBody,
                        {
                            title: 'Custom Styling',
                            initialOpen: false
                        },
                        wp.element.createElement(SelectControl, {
                            label: 'Max Width',
                            value: maxWidth,
                            options: [
                                { label: 'Default', value: '' },
                                { label: 'Extra Small (20rem)', value: 'xs' },
                                { label: 'Small (24rem)', value: 'sm' },
                                { label: 'Medium (28rem)', value: 'md' },
                                { label: 'Large (32rem)', value: 'lg' },
                                { label: 'Extra Large (36rem)', value: 'xl' },
                                { label: '2X Large (42rem)', value: '2xl' },
                                { label: '3X Large (48rem)', value: '3xl' },
                                { label: '4X Large (56rem)', value: '4xl' },
                                { label: 'Full Width', value: 'full' }
                            ],
                            onChange: (value) => setAttributes({ maxWidth: value })
                        }),
                        wp.element.createElement(SelectControl, {
                            label: 'Background Color',
                            value: backgroundColor,
                            options: [
                                { label: 'Default', value: '' },
                                { label: 'White', value: 'white' },
                                { label: 'Stone 50', value: 'stone-50' },
                                { label: 'Stone 100', value: 'stone-100' },
                                { label: 'Stone 900', value: 'stone-900' },
                                { label: 'Bronze 50', value: 'bronze-50' },
                                { label: 'Transparent', value: 'transparent' }
                            ],
                            onChange: (value) => setAttributes({ backgroundColor: value })
                        }),
                        wp.element.createElement(SelectControl, {
                            label: 'Padding',
                            value: padding,
                            options: [
                                { label: 'Default', value: '' },
                                { label: 'None', value: 'none' },
                                { label: 'Small', value: 'sm' },
                                { label: 'Medium', value: 'md' },
                                { label: 'Large', value: 'lg' },
                                { label: 'Extra Large', value: 'xl' }
                            ],
                            onChange: (value) => setAttributes({ padding: value })
                        }),
                        wp.element.createElement(SelectControl, {
                            label: 'Margin',
                            value: margin,
                            options: [
                                { label: 'Default', value: '' },
                                { label: 'None', value: 'none' },
                                { label: 'Small', value: 'sm' },
                                { label: 'Medium', value: 'md' },
                                { label: 'Large', value: 'lg' },
                                { label: 'Extra Large', value: 'xl' }
                            ],
                            onChange: (value) => setAttributes({ margin: value })
                        }),
                        wp.element.createElement(TextControl, {
                            label: 'Custom CSS',
                            value: customCSS,
                            placeholder: 'max-width: 500px; background: #f0f0f0;',
                            onChange: (value) => setAttributes({ customCSS: value }),
                            help: 'Add custom CSS styles directly (advanced users only)'
                        })
                    )
                )
            );
        };
    }, 'withStylingControls');

    // Register the filters
    addFilter('blocks.registerBlockType', 'dedwards/add-styling-attributes', addStylingAttributes);
    addFilter('editor.BlockEdit', 'dedwards/with-styling-controls', withStylingControls);
})();