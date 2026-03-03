import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/inquire-section', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'pt-32 md:pt-48 px-6 md:px-12 pb-24 bg-white min-h-screen'
        });
        const { heading, description, infoRows, formShortcode } = attributes;

        const updateRow = (index, field, value) => {
            const updated = infoRows.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            );
            setAttributes({ infoRows: updated });
        };

        const addRow = () => {
            setAttributes({ infoRows: [...infoRows, { label: '', value: '' }] });
        };

        const removeRow = (index) => {
            setAttributes({ infoRows: infoRows.filter((_, i) => i !== index) });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Contact Form', 'dedwards')}>
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

                            <div className="space-y-6 border-t border-stone-100 pt-8">
                                {infoRows.map((row, index) => (
                                    <div key={index} style={{ position: 'relative', paddingRight: '28px' }}>
                                        <RichText
                                            tagName="h3"
                                            className="text-xs uppercase tracking-widest text-stone-400 mb-2"
                                            value={row.label}
                                            onChange={(value) => updateRow(index, 'label', value)}
                                            placeholder={__('Label', 'dedwards')}
                                        />
                                        <RichText
                                            tagName="p"
                                            className="font-display text-stone-800"
                                            value={row.value}
                                            onChange={(value) => updateRow(index, 'value', value)}
                                            placeholder={__('Value...', 'dedwards')}
                                        />
                                        <button
                                            onClick={() => removeRow(index)}
                                            style={{ position: 'absolute', top: '2px', right: '0', background: 'rgba(220,38,38,0.85)', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                                            title={__('Remove row', 'dedwards')}
                                        >✕</button>
                                    </div>
                                ))}
                                <button
                                    onClick={addRow}
                                    style={{ marginTop: '8px', padding: '5px 14px', background: 'transparent', border: '1px dashed #a8a29e', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', color: '#78716c' }}
                                >+ {__('Add Row', 'dedwards')}</button>
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
