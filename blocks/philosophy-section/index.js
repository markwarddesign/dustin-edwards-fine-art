import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/philosophy-section', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'bg-bronze-50 pt-32 md:pt-48 px-6 md:px-12 pb-32 min-h-screen flex flex-col items-center justify-center'
        });
        const { heading, paragraphs, signatureUrl } = attributes;

        const updateParagraph = (index, value) => {
            const newParagraphs = [...paragraphs];
            newParagraphs[index] = value;
            setAttributes({ paragraphs: newParagraphs });
        };

        return (
            <div {...blockProps}>
                <div className="max-w-3xl text-center">
                    <div className="mb-12">
                        <span className="font-display text-6xl text-bronze-300">"</span>
                    </div>
                    <RichText
                        tagName="h1"
                        className="font-serif text-3xl md:text-5xl leading-tight text-stone-800 mb-12"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter philosophy heading...', 'dedwards')}
                    />
                    <div className="w-24 h-px bg-stone-300 mx-auto mb-12"></div>
                    <div className="font-light text-stone-600 text-lg leading-relaxed space-y-6">
                        {paragraphs.map((paragraph, index) => (
                            <RichText
                                key={index}
                                tagName="p"
                                value={paragraph}
                                onChange={(value) => updateParagraph(index, value)}
                                placeholder={__('Enter paragraph...', 'dedwards')}
                            />
                        ))}
                    </div>
                    <div className="mt-16">
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ signatureUrl: media.url })}
                                allowedTypes={['image']}
                                value={signatureUrl}
                                render={({ open }) => (
                                    signatureUrl ? (
                                        <div className="relative inline-block">
                                            <img src={signatureUrl} className="h-16 mx-auto opacity-50" alt="Signature" />
                                            <Button onClick={open} variant="secondary" className="mt-2">
                                                {__('Change Signature', 'dedwards')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={open} variant="primary">
                                            {__('Upload Signature', 'dedwards')}
                                        </Button>
                                    )
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                </div>
            </div>
        );
    },
    save: () => null
});
