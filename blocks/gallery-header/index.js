import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/gallery-header', {
    edit: ({ attributes, setAttributes }) => {
        const { title, subtitle, description } = attributes;
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Header Settings', 'dedwards')}>
                        <TextControl
                            label={__('Title', 'dedwards')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        <TextareaControl
                            label={__('Subtitle', 'dedwards')}
                            value={subtitle}
                            onChange={(value) => setAttributes({ subtitle: value })}
                            rows={3}
                        />
                        <TextareaControl
                            label={__('Description', 'dedwards')}
                            value={description}
                            onChange={(value) => setAttributes({ description: value })}
                            rows={4}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <header className="max-w-4xl mx-auto pt-32 pb-32 px-8 text-center">
                        <h1 className="font-serif italic text-6xl md:text-8xl font-light mb-10 text-stone-900">
                            {title}
                        </h1>
                        <div className="w-16 h-[1px] bg-stone-700 mx-auto mb-12"></div>
                        <p className="text-stone-600 font-light leading-relaxed text-xl md:text-2xl font-serif italic max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                        <p className="mt-8 text-[11px] uppercase tracking-[0.4em] text-stone-500 max-w-sm mx-auto leading-loose">
                            {description}
                        </p>
                    </header>
                </div>
            </>
        );
    }
});