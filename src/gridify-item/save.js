import { InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { columnStart, rowStart, spanColumns, spanRows } = attributes;

	return (
		<div
			style={{
				gridColumnStart: columnStart,
				gridRowStart: rowStart,
				gridColumn: `span ${ spanColumns } / span ${ spanColumns }`,
				gridRow: `span ${ spanRows } / span ${ spanRows }`,
			}}
		>
			<InnerBlocks.Content />
		</div>
	);
}
