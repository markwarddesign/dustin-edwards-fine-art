import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/inquire-section', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'pt-32 md:pt-48 px-6 md:px-12 pb-24 bg-white min-h-screen'
        });
        const { heading, description, studioLocation, representation, email, formShortcode } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Contact Information', 'dedwards')}>
                        <TextControl
                            label={__('Studio Location', 'dedwards')}
                            value={studioLocation}
                            onChange={(value) => setAttributes({ studioLocation: value })}
                        />
                        <TextControl
                            label={__('Representation', 'dedwards')}
                            value={representation}
                            onChange={(value) => setAttributes({ representation: value })}
                        />
                        <TextControl
                            label={__('Email', 'dedwards')}
                            value={email}
                            onChange={(value) => setAttributes({ email: value })}
                        />
                        <TextControl
                            label={__('Contact Form 7 Shortcode', 'dedwards')}
                            value={formShortcode}
                            onChange={(value) => setAttributes({ formShortcode: value })}
                            placeholder="[contact-form-7 id='123']"
                            help={__('Enter your Contact Form 7 shortcode', 'dedwards')}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
                        <div>
                            <RichText
                                tagName="h1"
                                className="font-display text-4xl md:text-5xl text-stone-850 mb-8"
                                value={heading}
                                onChange={(value) => setAttributes({ heading: value })}
                                placeholder={__('Inquire', 'dedwards')}
                            />
                            <RichText
                                tagName="p"
                                className="font-serif text-xl text-stone-600 mb-12"
                                value={description}
                                onChange={(value) => setAttributes({ description: value })}
                                placeholder={__('Enter description...', 'dedwards')}
                            />
                            
                            <div className="space-y-8 border-t border-stone-100 pt-8">
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Studio Location</h3>
                                    <p className="font-display text-stone-800">{studioLocation}</p>
                                </div>
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Representation</h3>
                                    <p className="font-display text-stone-800">{representation}</p>
                                </div>
                                <div>
                                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Contact</h3>
                                    <a href={`mailto:${email}`} className="font-display text-stone-800 hover:text-bronze-600 transition-colors">
                                        {email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-stone-50 p-8 rounded">
                            {formShortcode ? (
                                <div className="text-sm text-stone-600">
                                    <p className="mb-2"><strong>Contact Form 7 Shortcode:</strong></p>
                                    <code className="block bg-white p-4 rounded">{formShortcode}</code>
                                    <p className="mt-4 text-xs text-stone-500">The form will render on the frontend</p>
                                </div>
                            ) : (
                                <p className="text-stone-400 text-center">
                                    {__('Add Contact Form 7 shortcode in the sidebar →', 'dedwards')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    },
    save: () => null
});
