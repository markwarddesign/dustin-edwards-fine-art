import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/work-cta', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'py-24 px-6 md:px-12 bg-stone-900'
        });

        const { heading, description, buttonText, buttonLink } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('CTA Settings', 'dedwards')}>
                        <TextControl
                            label={__('Button Link', 'dedwards')}
                            value={buttonLink}
                            onChange={(value) => setAttributes({ buttonLink: value })}
                            placeholder="/contact"
                        />
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="max-w-3xl mx-auto text-center">
                        <RichText
                            tagName="h2"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading...', 'dedwards')}
                            className="font-serif text-4xl md:text-5xl text-white mb-6"
                        />
                        
                        <RichText
                            tagName="p"
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            placeholder={__('Enter description...', 'dedwards')}
                            className="text-stone-400 text-lg mb-12 max-w-2xl mx-auto font-light"
                        />
                        
                        <RichText
                            tagName="span"
                            value={buttonText}
                            onChange={(value) => setAttributes({ buttonText: value })}
                            placeholder={__('Button text...', 'dedwards')}
                            className="inline-block bg-bronze-600 text-white px-12 py-5 text-[10px] uppercase tracking-[0.25em] hover:bg-bronze-500 transition-colors duration-300"
                        />
                    </div>
                </section>
            </>
        );
    },

    save: () => {
        return null;
    }
});
