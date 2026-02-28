import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/artist-bio', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'max-w-6xl mx-auto px-6 md:px-12 py-24 bg-white'
        });
        const { heading, content, imageUrl } = attributes;

        return (
            <div {...blockProps}>
                <RichText
                    tagName="h2"
                    className="font-serif text-3xl md:text-4xl italic text-stone-800 mb-12 text-center"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder="Artist Name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <div>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ imageUrl: media.url })}
                                allowedTypes={['image']}
                                value={imageUrl}
                                render={({ open }) => (
                                    imageUrl ? (
                                        <div className="relative group">
                                            <img src={imageUrl} alt="Artist" className="w-full h-auto" />
                                            <Button 
                                                onClick={open} 
                                                variant="secondary" 
                                                className="mt-4 w-full"
                                            >
                                                {__('Change Image', 'dedwards')}
                                            </Button>
                                        </div>
                                    ) : (
                                        <div 
                                            onClick={open}
                                            className="w-full aspect-[3/4] bg-stone-100 flex items-center justify-center cursor-pointer hover:bg-stone-200 transition-colors"
                                        >
                                            <span className="text-stone-400">{__('Click to upload image', 'dedwards')}</span>
                                        </div>
                                    )
                                )}
                            />
                        </MediaUploadCheck>
                    </div>
                    <div className="artist-bio">
                        <RichText
                            tagName="div"
                            className="font-serif text-lg md:text-xl leading-loose text-stone-600 space-y-8"
                            value={content}
                            onChange={(value) => setAttributes({ content: value })}
                            placeholder="Click to add biography text... The first letter will be automatically styled as a drop cap."
                            multiline="p"
                        />
                    </div>
                </div>
            </div>
        );
    },

    save: () => {
        return null;
    }
});
