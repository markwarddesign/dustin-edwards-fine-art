import { registerBlockType } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/quote-section', {
    edit: ({ attributes, setAttributes }) => {
        const { quote } = attributes;
        const blockProps = useBlockProps({
            className: 'py-24 md:py-32 px-6 md:px-12 bg-white text-center'
        });

        return (
            <section {...blockProps}>
                <blockquote className="max-w-3xl mx-auto">
                    <p className="font-display text-2xl md:text-4xl leading-relaxed text-stone-800 uppercase tracking-widest">
                        <span className="opacity-50">&ldquo;</span>
                        <RichText
                            tagName="span"
                            value={quote}
                            onChange={(value) => setAttributes({ quote: value })}
                            placeholder={__('Enter quote text...', 'dedwards')}
                        />
                        <span className="opacity-50">&rdquo;</span>
                    </p>
                </blockquote>
            </section>
        );
    },

    save: ({ attributes }) => {
        const { quote } = attributes;
        const blockProps = useBlockProps.save({
            className: 'py-24 md:py-32 px-6 md:px-12 bg-white text-center'
        });

        return (
            <section {...blockProps}>
                <blockquote className="max-w-3xl mx-auto">
                    <p className="font-display text-2xl md:text-4xl leading-relaxed text-stone-800 uppercase tracking-widest">
                        &ldquo;<RichText.Content
                            tagName="span"
                            value={quote}
                        />&rdquo;
                    </p>
                </blockquote>
            </section>
        );
    }
});
