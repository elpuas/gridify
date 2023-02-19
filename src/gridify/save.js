import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { column, row, stackOnMobile, mobileColumns, gap } = attributes;
	const mobileClasses = stackOnMobile
		? 'is-stack-on-mobile'
		: 'mobile-columns';
	const blockProps = useBlockProps.save( {
		className: `elpuas-gridify ${ mobileClasses }`,
		style: {
			'--grid-columns': `${ column }`,
			'--grid-rows': `${ row }`,
			'--grid-gap': `${ gap }px`,
			'--mobile-columns': `${ mobileColumns }`,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
}
