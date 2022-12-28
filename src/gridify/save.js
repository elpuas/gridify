import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { column, row } = attributes;
	// const classes = useBlockProps().className;
	const blockProps = useBlockProps.save({
		className: 'elpuas-gridify',
		style: {
			display: 'grid',
			gridTemplateColumns: `repeat(${ column }, 1fr)`,
			gridTemplateRows: `repeat(${ row }, 1fr)`,
		},
	})

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	return (
		<div {...innerBlocksProps} />
	);
}
