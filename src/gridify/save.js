import { InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { column, row } = attributes;

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${ column }, 1fr)`,
				gridTemplateRows: `repeat(${ row }, 1fr)`,
			}}
		>
			<InnerBlocks.Content />
		</div>
	);
}
