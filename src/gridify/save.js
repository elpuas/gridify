import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { column, row, stackOnMobile, mobileColumns, gap } = attributes;
	const mobileClasses = stackOnMobile ? 'is-stack-on-mobile' : `mobile-columns-${ mobileColumns }`;
	const blockProps = useBlockProps.save({
		className: `elpuas-gridify ${mobileClasses}`,
		style: {
			display: 'grid',
			gridTemplateColumns: `repeat(${ column }, 1fr)`,
			gridTemplateRows: `repeat(${ row }, 1fr)`,
			gap: `${ gap }px`,
		},
	})

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return (
		<div {...innerBlocksProps} />
	);
}
