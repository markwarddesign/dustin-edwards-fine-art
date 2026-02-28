import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/statement-section', {
    edit: ({ attributes, setAttributes }) => {
        const { decorativeChar, heading, paragraph1, paragraph2, author } = attributes;
        const blockProps = useBlockProps({
            className: 'py-32 px-6 md:px-12 bg-bronze-100 relative'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'dedwards')}>
                        <TextControl
                            label={__('Decorative Character', 'dedwards')}
                            value={decorativeChar}
                            onChange={(value) => setAttributes({ decorativeChar: value })}
                            help={__('Large background character (e.g., &, ✦, •)', 'dedwards')}
                        />
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-display text-[20rem] opacity-40 select-none pointer-events-none">
                        {decorativeChar}
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <RichText
                            tagName="h2"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Artist Statement', 'dedwards')}
                            className="font-display text-3xl md:text-4xl text-stone-800 mb-12 uppercase tracking-widest"
                        />
                        
                        <div className="font-serif text-xl md:text-2xl text-stone-700 leading-loose italic">
                            <RichText
                                tagName="p"
                                value={paragraph1}
                                onChange={(value) => setAttributes({ paragraph1: value })}
                                placeholder={__('First paragraph...', 'dedwards')}
                                className="mb-8"
                            />
                            <RichText
                                tagName="p"
                                value={paragraph2}
                                onChange={(value) => setAttributes({ paragraph2: value })}
                                placeholder={__('Second paragraph...', 'dedwards')}
                                className="mb-8"
                            />
                        </div>

                        <div className="w-32 h-1 bg-bronze-400 mx-auto my-12"></div>

                        <p className="text-sm font-sans uppercase tracking-[0.2em] text-stone-500">
                            &mdash; <RichText
                                tagName="span"
                                value={author}
                                onChange={(value) => setAttributes({ author: value })}
                                placeholder={__('Author Name', 'dedwards')}
                            />
                        </p>
                    </div>
                </section>
            </>
        );
    },

    save: ({ attributes }) => {
        const { decorativeChar, heading, paragraph1, paragraph2, author } = attributes;
        const blockProps = useBlockProps.save({
            className: 'py-32 px-6 md:px-12 bg-bronze-100 relative'
        });

        return (
            <section {...blockProps}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-white font-display text-[20rem] opacity-40 select-none pointer-events-none">
                    {decorativeChar}
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <RichText.Content
                        tagName="h2"
                        value={heading}
                        className="font-display text-3xl md:text-4xl text-stone-800 mb-12 uppercase tracking-widest"
                    />
                    
                    <div className="font-serif text-xl md:text-2xl text-stone-700 leading-loose italic">
                        <RichText.Content
                            tagName="p"
                            value={paragraph1}
                            className="mb-8"
                        />
                        <RichText.Content
                            tagName="p"
                            value={paragraph2}
                            className="mb-8"
                        />
                    </div>

                    <div className="w-32 h-1 bg-bronze-400 mx-auto my-12"></div>

                    <p className="text-sm font-sans uppercase tracking-[0.2em] text-stone-500">
                        &mdash; <RichText.Content tagName="span" value={author} />
                    </p>
                </div>
            </section>
        );
    }
});
