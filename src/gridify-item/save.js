import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		columnStart,
		rowStart,
		spanColumns,
		spanRows,
		mobileColumnStart,
		stackOnMobile,
		spanMobileColumns,
	} = attributes;
	const mobileClasses = stackOnMobile
		? 'is-stack-on-mobile'
		: `mobile-columns-start-${ mobileColumnStart } mobile-column-end-${ spanMobileColumns }`;
	const blockProps = useBlockProps.save( {
		// Add a custom class to the inner blocks wrapper element
		className: `elpuas-gridify-item ${ mobileClasses }`,
		// Add a custom style to the inner blocks wrapper element
		style: {
			gridColumnStart: columnStart,
			gridRowStart: rowStart,
			gridColumnEnd: `span ${ spanColumns }`,
			gridRowEnd: `span ${ spanRows }`,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return <div { ...innerBlocksProps } />;
}
