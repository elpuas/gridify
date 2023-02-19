import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
	Panel,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment, useState } from '@wordpress/element';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed from the editor.
 * @param {Object}   props.attributes    Properties passed from the editor.
 * @param {Function} props.setAttributes Function to set the block attributes.
 * @param {string}   props.clientId      The block client ID.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const { column, row, stackOnMobile, mobileColumns, gap } = attributes;
	const [ lineColor, setLineColor ] = useState( 'transparent' );
	const [showLayout, setShowLayout] = useState(false);
	const innerBlockCount = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlock( clientId ).innerBlocks
	);
	const classes = useBlockProps().className;
	const mobileClasses = stackOnMobile
		? 'is-stack-on-mobile'
		: 'mobile-columns';
	const styles = useBlockProps( {
		style: {
			'--grid-columns': `${ column }`,
			'--grid-rows': `${ row }`,
			'--grid-gap': `${ gap }px`,
			'--cols': `${ column }`,
			'--rows': `${ row }`,
			'--line-color': `${ lineColor }`,
			'--mobile-columns': `${ mobileColumns }`,
		},
	} );

	const appenderToUse = () => {
		if ( innerBlockCount.length < 11 ) {
			return <InnerBlocks.DefaultBlockAppender />;
			// eslint-disable-next-line no-else-return
		} else {
			return false;
		}
	};
	const ALLOWED_BLOCKS = [ 'elpuas/gridify-item' ];
	const TEMPLATE = [ [ 'elpuas/gridify-item' ] ];

	const innerBlocksProps = useInnerBlocksProps( styles, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		className: `${ classes } ${ mobileClasses }`,
		renderAppender: appenderToUse,
		orientation: 'horizontal',
		templateInsertUpdatesSelection: true,
	} );

	return (
		<Fragment>
			<InspectorControls>
				<Panel>
					<PanelBody
						title={ __( 'Gridify Settings', 'gridify' ) }
						initialOpen={ true }
					>
						<RangeControl
							label={ 'Columns' }
							value={ column }
							onChange={ ( value ) =>
								setAttributes( { column: value } )
							}
							min={ 1 }
							max={ 12 }
						/>
						<RangeControl
							label={ __( 'Rows', 'gridify' ) }
							value={ row }
							onChange={ ( value ) =>
								setAttributes( { row: value } )
							}
							min={ 1 }
							max={ 12 }
						/>
						<RangeControl
							label={ __( 'Gap', 'my-plugin' ) }
							value={ gap }
							onChange={ ( value ) =>
								setAttributes( { gap: value } )
							}
							min={ 0 }
							max={ 100 }
						/>
						<ToggleControl
							label={ __( 'Stack on mobile', 'gridify' ) }
							checked={ stackOnMobile }
							onChange={ () =>
								setAttributes( {
									stackOnMobile: ! stackOnMobile,
								} )
							}
						/>
						{ ! stackOnMobile && (
							<RangeControl
								label={ __( 'Mobile columns', 'gridify' ) }
								value={ mobileColumns }
								onChange={ ( value ) =>
									setAttributes( { mobileColumns: value } )
								}
								min={ 1 }
								max={ 4 }
							/>
						) }
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody>
						<ToggleControl
							label={ __( 'Show Grid Layout', 'gridify' ) }
							checked={ showLayout }
							onChange={ () => {
									setShowLayout(!showLayout);
									setLineColor(showLayout ? 'transparent' : 'rgba(0, 0, 0, .08)');
								}
							}
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</Fragment>
	);
}
