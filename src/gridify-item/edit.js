
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, useInnerBlocksProps } from '@wordpress/block-editor';
import { Panel, PanelBody, RangeControl } from '@wordpress/components';
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
export default function Edit( { attributes, setAttributes } ) {
	const { columnStart, rowStart, spanColumns, spanRows } = attributes;
	const classes = useBlockProps().className;
	const innerBlocksProps = useInnerBlocksProps( {
		// Add a custom class to the inner blocks wrapper element
		className: classes,
		// Add a custom style to the inner blocks wrapper element
		style: {
			gridColumnStart: columnStart,
			gridRowStart: rowStart,
			gridColumnEnd: `span ${ spanColumns }`,
			gridRowEnd: `span ${ spanRows }`,
		},
	} );

	return (
		<Fragment>
			<InspectorControls>
				<Panel>
					<PanelBody title={ __( 'Gridify Item Settings', 'gridify' ) } initialOpen={ true }>
						<RangeControl
							label={ __( 'Column Start', 'gridify' ) }
							value={ columnStart }
							onChange={ ( value ) => setAttributes( { columnStart: value } ) }
							min={ 1 }
							max={ 12 }
						/>
						<RangeControl
							label={ __( 'Span Columns', 'gridify' ) }
							value={ spanColumns }
							onChange={ ( value ) => setAttributes( { spanColumns: value } ) }
							min={ 1 }
							max={ 12 }
						/>
						<RangeControl
							label={ __( 'Row Start', 'gridify' ) }
							value={ rowStart }
							onChange={ ( value ) => setAttributes( { rowStart: value } ) }
							min={ 1 }
							max={ 12 }
						/>
						<RangeControl
							label={ __( 'Span Rows', 'gridify' ) }
							value={ spanRows }
							onChange={ ( value ) => setAttributes( { spanRows: value } ) }
							min={ 1 }
							max={ 12 }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</Fragment>
	);
}
