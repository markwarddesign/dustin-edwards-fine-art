import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/work-gallery', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'py-20 px-6 md:px-12 bg-bronze-50'
        });

        const { images } = attributes;

        const onSelectImages = (media) => {
            setAttributes({
                images: media.map(item => ({
                    id: item.id,
                    url: item.url,
                    alt: item.alt || ''
                }))
            });
        };

        const removeImage = (index) => {
            const newImages = [...images];
            newImages.splice(index, 1);
            setAttributes({ images: newImages });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Gallery Settings', 'dedwards')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImages}
                                allowedTypes={['image']}
                                multiple
                                gallery
                                value={images.map(img => img.id)}
                                render={({ open }) => (
                                    <Button variant="secondary" onClick={open}>
                                        {images.length === 0 ? __('Add Images', 'dedwards') : __('Edit Gallery', 'dedwards')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-sm font-display uppercase tracking-widest text-bronze-800 mb-12 text-center border-b border-bronze-200 pb-4">
                            Additional Views
                        </h2>
                        
                        {images.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {images.map((image, index) => (
                                    <div key={image.id} className="group relative aspect-square overflow-hidden bg-stone-200 shadow-lg">
                                        <img 
                                            src={image.url} 
                                            alt={image.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-bronze-300">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={onSelectImages}
                                        allowedTypes={['image']}
                                        multiple
                                        gallery
                                        render={({ open }) => (
                                            <Button variant="primary" onClick={open}>
                                                {__('Add Gallery Images', 'dedwards')}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                        )}
                    </div>
                </section>
            </>
        );
    },

    save: () => {
        return null;
    }
});
