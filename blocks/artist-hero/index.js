import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/artist-hero', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();
        const { backgroundImage, title } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Background Image', 'dedwards')}>
                        {backgroundImage && (
                            <img src={backgroundImage.url} alt="" className="mb-4 max-w-full h-auto" />
                        )}
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => setAttributes({ backgroundImage: { id: media.id, url: media.url } })}
                                allowedTypes={['image']}
                                value={backgroundImage?.id}
                                render={({ open }) => (
                                    <div className="flex gap-2">
                                        <Button variant="secondary" onClick={open}>
                                            {backgroundImage ? 'Change Image' : 'Select Image'}
                                        </Button>
                                        {backgroundImage && (
                                            <Button variant="tertiary" isDestructive onClick={() => setAttributes({ backgroundImage: null })}>
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="relative h-[60vh] w-full overflow-hidden bg-stone-200">
                        {backgroundImage ? (
                            <img 
                                src={backgroundImage.url} 
                                className="w-full h-full object-cover object-center grayscale brightness-75" 
                                alt=""
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-400">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => setAttributes({ backgroundImage: { id: media.id, url: media.url } })}
                                        allowedTypes={['image']}
                                        render={({ open }) => (
                                            <button onClick={open} className="text-sm">
                                                Click to select background image
                                            </button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <RichText
                                tagName="h1"
                                className="font-display text-5xl md:text-7xl text-white tracking-widest text-center"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder="Enter title..."
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: () => {
        return null;
    }
});
