import { registerBlockType } from '@wordpress/blocks';
import { RichText, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType( 'dedwards/page-title', {
    edit: ( { attributes, setAttributes } ) => {
        const { title, subtitle, alignment, theme } = attributes;

        const isDark = theme === 'dark';
        const alignClass = alignment === 'center' ? 'text-center items-center' : 'text-left items-start';
        const bgClass = isDark ? 'bg-stone-900' : 'bg-stone-50';
        const titleColor = isDark ? 'text-white' : 'text-stone-900';
        const subtitleColor = isDark ? 'text-stone-400' : 'text-stone-500';

        const blockProps = useBlockProps( {
            className: `${ bgClass } pt-32 md:pt-48 pb-16 px-6 md:px-12`,
        } );

        return (
            <>
                <InspectorControls>
                    <PanelBody title={ __( 'Settings', 'dedwards' ) }>
                        <SelectControl
                            label={ __( 'Alignment', 'dedwards' ) }
                            value={ alignment }
                            options={ [
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                            ] }
                            onChange={ ( value ) => setAttributes( { alignment: value } ) }
                        />
                        <SelectControl
                            label={ __( 'Theme', 'dedwards' ) }
                            value={ theme }
                            options={ [
                                { label: 'Light', value: 'light' },
                                { label: 'Dark', value: 'dark' },
                            ] }
                            onChange={ ( value ) => setAttributes( { theme: value } ) }
                        />
                    </PanelBody>
                </InspectorControls>

                <div { ...blockProps }>
                    <div className={ `max-w-7xl mx-auto flex flex-col ${ alignClass }` }>
                        <RichText
                            tagName="h1"
                            value={ title }
                            onChange={ ( value ) => setAttributes( { title: value } ) }
                            placeholder={ __( 'Page Title', 'dedwards' ) }
                            className={ `font-display text-4xl md:text-5xl ${ titleColor } mb-4` }
                        />
                        <RichText
                            tagName="p"
                            value={ subtitle }
                            onChange={ ( value ) => setAttributes( { subtitle: value } ) }
                            placeholder={ __( 'Optional subtitle…', 'dedwards' ) }
                            className={ `font-serif italic ${ subtitleColor } max-w-2xl text-lg` }
                        />
                    </div>
                </div>
            </>
        );
    },

    save: () => null,
} );
