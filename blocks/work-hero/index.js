import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, Placeholder } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/work-hero', {
    edit: ({ attributes, setAttributes, context }) => {
        const blockProps = useBlockProps({
            className: 'bg-white'
        });

        const { detailImage1, detailImage2, detailImage3 } = attributes;
        const postId = context.postId;

        const { editEntityRecord } = useDispatch('core');

        const { title, featuredImageId, featuredImageUrl, meta, content } = useSelect((select) => {
            const { getEditedEntityRecord, getMedia } = select('core');
            const post = getEditedEntityRecord('postType', 'work', postId);
            const featuredMediaId = post?.featured_media;
            const media = featuredMediaId ? getMedia(featuredMediaId) : null;
            
            return {
                title: post?.title || '',
                featuredImageId: featuredMediaId,
                featuredImageUrl: media?.source_url || null,
                meta: post?.meta || {},
                content: post?.content?.raw || ''
            };
        }, [postId]);

        const material   = meta?._work_material   || '';
        const year       = meta?._work_year       || '';
        const dimensions = meta?._work_dimensions || '';
        const edition    = meta?._work_edition    || '';

        // Update meta fields
        const updateMeta = (key, value) => {
            editEntityRecord('postType', 'work', postId, {
                meta: { [key]: value }
            });
        };

        // Update content
        const updateContent = (newContent) => {
            editEntityRecord('postType', 'work', postId, {
                content: newContent
            });
        };

        // Update featured image
        const updateFeaturedImage = (mediaId) => {
            editEntityRecord('postType', 'work', postId, {
                featured_media: mediaId
            });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Work Details', 'dedwards')}>
                        <TextControl
                            label={__('Material', 'dedwards')}
                            value={material}
                            onChange={(value) => updateMeta('_work_material', value)}
                            placeholder="e.g., Bronze"
                        />
                        <TextControl
                            label={__('Year', 'dedwards')}
                            value={year}
                            onChange={(value) => updateMeta('_work_year', value)}
                            placeholder="e.g., 2023"
                        />
                        <TextControl
                            label={__('Dimensions', 'dedwards')}
                            value={dimensions}
                            onChange={(value) => updateMeta('_work_dimensions', value)}
                            placeholder="e.g., 24 x 18 x 12 inches"
                        />
                        <TextControl
                            label={__('Edition', 'dedwards')}
                            value={edition}
                            onChange={(value) => updateMeta('_work_edition', value)}
                            placeholder="e.g., Edition of 15"
                        />
                    </PanelBody>
                    <PanelBody title={__('Detail Images', 'dedwards')}>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm mb-2 font-medium">Detail Image 1</p>
                                {detailImage1 && (
                                    <img src={detailImage1.url} alt="" className="mb-2 max-w-full h-auto" style={{ maxHeight: '150px' }} />
                                )}
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => setAttributes({ detailImage1: { id: media.id, url: media.url } })}
                                        allowedTypes={['image']}
                                        value={detailImage1?.id}
                                        render={({ open }) => (
                                            <div className="flex gap-2">
                                                <Button variant="secondary" onClick={open}>
                                                    {detailImage1 ? 'Change Image' : 'Add Image'}
                                                </Button>
                                                {detailImage1 && (
                                                    <Button variant="tertiary" isDestructive onClick={() => setAttributes({ detailImage1: undefined })}>
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                            <div>
                                <p className="text-sm mb-2 font-medium">Detail Image 2</p>
                                {detailImage2 && (
                                    <img src={detailImage2.url} alt="" className="mb-2 max-w-full h-auto" style={{ maxHeight: '150px' }} />
                                )}
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => setAttributes({ detailImage2: { id: media.id, url: media.url } })}
                                        allowedTypes={['image']}
                                        value={detailImage2?.id}
                                        render={({ open }) => (
                                            <div className="flex gap-2">
                                                <Button variant="secondary" onClick={open}>
                                                    {detailImage2 ? 'Change Image' : 'Add Image'}
                                                </Button>
                                                {detailImage2 && (
                                                    <Button variant="tertiary" isDestructive onClick={() => setAttributes({ detailImage2: undefined })}>
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                            <div>
                                <p className="text-sm mb-2 font-medium">Detail Image 3</p>
                                {detailImage3 && (
                                    <img src={detailImage3.url} alt="" className="mb-2 max-w-full h-auto" style={{ maxHeight: '150px' }} />
                                )}
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => setAttributes({ detailImage3: { id: media.id, url: media.url } })}
                                        allowedTypes={['image']}
                                        value={detailImage3?.id}
                                        render={({ open }) => (
                                            <div className="flex gap-2">
                                                <Button variant="secondary" onClick={open}>
                                                    {detailImage3 ? 'Change Image' : 'Add Image'}
                                                </Button>
                                                {detailImage3 && (
                                                    <Button variant="tertiary" isDestructive onClick={() => setAttributes({ detailImage3: undefined })}>
                                                        Remove
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>
                        </div>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="pt-24 pb-12 min-h-screen">
                        <div className="px-6 md:px-12 mb-8">
                            <a href="#" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors inline-flex items-center gap-2">
                                &larr; Back to Collection
                            </a>
                        </div>

                        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 px-6 md:px-12">
                            {/* Left: Images */}
                            <div className="lg:col-span-5 space-y-4">
                                <div className="bg-stone-100 aspect-[4/5] overflow-hidden relative border-2 border-dashed border-transparent hover:border-blue-400 transition-all group">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => updateFeaturedImage(media.id)}
                                            allowedTypes={['image']}
                                            value={featuredImageId}
                                            render={({ open }) => (
                                                <button 
                                                    onClick={open}
                                                    className="w-full h-full relative"
                                                    title="Click to change featured image"
                                                >
                                                    {featuredImageUrl ? (
                                                        <>
                                                            <img src={featuredImageUrl} className="w-full h-full object-cover" alt={title} />
                                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                                <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded transition-opacity">
                                                                    Change Featured Image
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 hover:text-stone-600 transition-colors">
                                                            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                            <span className="text-sm font-medium">Add Featured Image</span>
                                                            <span className="text-xs mt-1">This will be the main work image</span>
                                                        </div>
                                                    )}
                                                </button>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                                <div className="grid grid-cols-3 gap-4"> {/* detail images — saved to post meta */}
                                    <div className="bg-stone-200 aspect-square overflow-hidden relative border-2 border-dashed border-transparent hover:border-blue-400 transition-all group">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => setAttributes({ detailImage1: { id: media.id, url: media.url } })}
                                                allowedTypes={['image']}
                                                value={detailImage1?.id}
                                                render={({ open }) => (
                                                    <button 
                                                        onClick={open}
                                                        className="w-full h-full relative"
                                                        title="Click to change detail image"
                                                    >
                                                        {detailImage1 ? (
                                                            <>
                                                                <img 
                                                                    src={detailImage1.url} 
                                                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                                                    alt="Detail 1" 
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-3 py-1 rounded transition-opacity">
                                                                        Change Image
                                                                    </span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center">
                                                                <div className="bg-white hover:bg-stone-50 border-2 border-stone-300 hover:border-blue-400 rounded-lg px-6 py-4 transition-all">
                                                                    <svg className="w-8 h-8 mb-2 text-stone-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                                                    </svg>
                                                                    <span className="text-xs font-medium text-stone-700">Add Detail Image</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                    <div className="bg-stone-200 aspect-square overflow-hidden relative border-2 border-dashed border-transparent hover:border-blue-400 transition-all group">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => setAttributes({ detailImage2: { id: media.id, url: media.url } })}
                                                allowedTypes={['image']}
                                                value={detailImage2?.id}
                                                render={({ open }) => (
                                                    <button 
                                                        onClick={open}
                                                        className="w-full h-full relative"
                                                        title="Click to change detail image"
                                                    >
                                                        {detailImage2 ? (
                                                            <>
                                                                <img 
                                                                    src={detailImage2.url} 
                                                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                                                    alt="Detail 2" 
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-3 py-1 rounded transition-opacity">
                                                                        Change Image
                                                                    </span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center">
                                                                <div className="bg-white hover:bg-stone-50 border-2 border-stone-300 hover:border-blue-400 rounded-lg px-6 py-4 transition-all">
                                                                    <svg className="w-8 h-8 mb-2 text-stone-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                                                    </svg>
                                                                    <span className="text-xs font-medium text-stone-700">Add Detail Image</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                    <div className="bg-stone-200 aspect-square overflow-hidden relative border-2 border-dashed border-transparent hover:border-blue-400 transition-all group">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => setAttributes({ detailImage3: { id: media.id, url: media.url } })}
                                                allowedTypes={['image']}
                                                value={detailImage3?.id}
                                                render={({ open }) => (
                                                    <button 
                                                        onClick={open}
                                                        className="w-full h-full relative"
                                                        title="Click to change detail image"
                                                    >
                                                        {detailImage3 ? (
                                                            <>
                                                                <img 
                                                                    src={detailImage3.url} 
                                                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                                                                    alt="Detail 3" 
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                                                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-medium bg-black/50 px-3 py-1 rounded transition-opacity">
                                                                        Change Image
                                                                    </span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center">
                                                                <div className="bg-white hover:bg-stone-50 border-2 border-stone-300 hover:border-blue-400 rounded-lg px-6 py-4 transition-all">
                                                                    <svg className="w-8 h-8 mb-2 text-stone-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                                                                    </svg>
                                                                    <span className="text-xs font-medium text-stone-700">Add Detail Image</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="lg:col-span-7 lg:sticky lg:top-32 h-fit pt-8">
                                <h1 className="font-serif italic text-4xl md:text-6xl text-stone-900 mb-6">
                                    {title || 'Work Title'}
                                </h1>
                                
                                <div className="grid grid-cols-2 gap-y-6 gap-x-12 border-t border-b border-stone-200 py-8 mb-8">
                                    <div>
                                        <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Medium</span>
                                        <span className="font-display text-stone-800">{material || 'Bronze'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Year</span>
                                        <span className="font-display text-stone-800">{year || '2023'}</span>
                                    </div>
                                    {(dimensions || true) && (
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Dimensions</span>
                                            <span className="font-display text-stone-800">{dimensions || '—'}</span>
                                        </div>
                                    )}
                                    {(edition || true) && (
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-widest text-stone-400 mb-1">Edition</span>
                                            <span className="font-display text-stone-800">{edition || '—'}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="prose prose-stone mb-12 border-2 border-dashed border-transparent hover:border-blue-400 transition-all rounded-lg p-4 -m-4">
                                    <RichText
                                        tagName="div"
                                        className="font-serif text-lg leading-relaxed text-stone-600"
                                        value={content}
                                        onChange={updateContent}
                                        placeholder="Click to add work description... You can format text, add paragraphs, and more."
                                    />
                                </div>

                                <a href="/contact" className="block w-full bg-stone-900 text-white py-5 px-8 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze-700 transition-all duration-300 text-center font-medium">
                                    Inquire About This Piece
                                </a>
                            </div>
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
