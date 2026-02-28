import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/contact-section', {
    edit: ({ attributes, setAttributes }) => {
        const { heading, subheading, formShortcode } = attributes;
        const blockProps = useBlockProps({
            className: 'py-32 px-6 md:px-12 bg-white'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Contact Form Settings', 'dedwards')}>
                        <TextareaControl
                            label={__('Contact Form 7 Shortcode', 'dedwards')}
                            value={formShortcode}
                            onChange={(value) => setAttributes({ formShortcode: value })}
                            help={__('Paste your Contact Form 7 shortcode here (e.g., [contact-form-7 id="123"])', 'dedwards')}
                            placeholder="[contact-form-7 id=&quot;123&quot;]"
                        />
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="max-w-xl mx-auto">
                        <div className="text-center mb-16">
                            <RichText
                                tagName="h2"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Heading...', 'dedwards')}
                                className="font-serif text-4xl md:text-5xl mb-6 text-stone-800"
                            />
                            <RichText
                                tagName="p"
                                value={subheading}
                                onChange={(value) => setAttributes({ subheading: value })}
                                placeholder={__('Subheading...', 'dedwards')}
                                className="text-stone-500 font-light text-sm md:text-base"
                            />
                        </div>
                        
                        {formShortcode ? (
                            <div className="bg-stone-50 p-8 rounded border border-stone-200">
                                <p className="text-sm text-stone-600 text-center">
                                    {__('Contact Form 7 Shortcode:', 'dedwards')}<br/>
                                    <code className="text-xs bg-white px-2 py-1 rounded mt-2 inline-block">{formShortcode}</code>
                                </p>
                                <p className="text-xs text-stone-500 text-center mt-4">
                                    {__('Form will display on the frontend', 'dedwards')}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-bronze-50 p-8 rounded border border-bronze-200">
                                <p className="text-sm text-stone-600 text-center">
                                    {__('Add your Contact Form 7 shortcode in the block settings →', 'dedwards')}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </>
        );
    },

    save: ({ attributes }) => {
        const { heading, subheading, formShortcode } = attributes;
        const blockProps = useBlockProps.save({
            className: 'py-32 px-6 md:px-12 bg-white'
        });

        return (
            <section {...blockProps}>
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-16">
                        <RichText.Content
                            tagName="h2"
                            value={heading}
                            className="font-serif text-4xl md:text-5xl mb-6 text-stone-800"
                        />
                        <RichText.Content
                            tagName="p"
                            value={subheading}
                            className="text-stone-500 font-light text-sm md:text-base"
                        />
                    </div>
                    
                    {formShortcode && (
                        <div className="dedwards-contact-form">
                            {formShortcode}
                        </div>
                    )}
                </div>
            </section>
        );
    }
});
