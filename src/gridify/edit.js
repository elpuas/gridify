
import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { column, row } = attributes;
	const innerBlockCount = useSelect( ( select ) => select( 'core/block-editor' ).getBlock( clientId ).innerBlocks );
	const classes = useBlockProps().className;
	const appenderToUse = () => {
		if ( innerBlockCount.length < 11 ) {
			return (
				<InnerBlocks.ButtonBlockAppender/>
			);
		} else {
			return false;
		}
	}
	const ALLOWED_BLOCKS = [ 'elpuas/gridify-item' ];
	const innerBlocksProps = useInnerBlocksProps( {
		// Allow only specific blocks to be added as inner blocks
		allowedBlocks: ALLOWED_BLOCKS,
		// Add a custom class to the inner blocks wrapper element
		className: classes,
		renderAppender: appenderToUse,
		orientation:"horizontal",
		templateInsertUpdatesSelection: true,
		// Add a custom style to the inner blocks wrapper element
		style: {
			border: '1px solid red',
			display: 'grid',
			gridTemplateColumns: `repeat(${ column }, 1fr)`,
			gridTemplateRows: `repeat(${ row }, 1fr)`,
		},
	} );

	return (
		<Fragment>
			<InspectorControls>
				<RangeControl
					label={'Columns'}
					value={ column }
					onChange={ ( value ) => setAttributes( { column: value } ) }
					min={ 1 }
					max={ 12 }
				/>
				<RangeControl
					label={ __( 'Rows', 'gridify' ) }
					value={ row }
					onChange={ ( value ) => setAttributes( { row: value } ) }
					min={ 1 }
					max={ 12 }
				/>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</Fragment>
	);
}
