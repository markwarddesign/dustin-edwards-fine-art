import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/work-details', {
    edit: ({ context }) => {
        const blockProps = useBlockProps({
            className: 'py-20 px-6 md:px-12 bg-white'
        });

        const postId = context.postId;

        const meta = useSelect((select) => {
            const { getEditedEntityRecord } = select('core');
            const post = getEditedEntityRecord('postType', 'work', postId);
            return post?.meta || {};
        }, [postId]);

        const material = meta?._work_material || '';
        const year = meta?._work_year || '';
        const dimensions = meta?._work_dimensions || '';
        const edition = meta?._work_edition || '';

        const details = [
            { label: 'Material', value: material },
            { label: 'Year', value: year },
            { label: 'Dimensions', value: dimensions },
            { label: 'Edition', value: edition }
        ].filter(detail => detail.value);

        return (
            <section {...blockProps}>
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-sm font-display uppercase tracking-widest text-bronze-800 mb-12 text-center border-b border-bronze-200 pb-4">
                        Specifications
                    </h2>
                    
                    {details.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {details.map((detail, index) => (
                                <div key={index} className="flex flex-col">
                                    <dt className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">
                                        {detail.label}
                                    </dt>
                                    <dd className="font-serif text-xl text-stone-800">
                                        {detail.value}
                                    </dd>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-stone-400">
                            {__('Add work details in the post meta fields to display them here.', 'dedwards')}
                        </p>
                    )}
                </div>
            </section>
        );
    },

    save: () => {
        return null;
    }
});
