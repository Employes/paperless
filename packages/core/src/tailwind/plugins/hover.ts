import plugin from 'tailwindcss/plugin';

const hover = plugin(({ addVariant }) => {
	// Hover media queries
	addVariant('has-hover', '@media (hover: hover)');
	addVariant('no-hover', '@media (hover: none)');
	// Applied on hover if supported, never applied otherwise
	addVariant('hover-never', '@media (hover: hover) { &:hover }');
	addVariant(
		'group-hover-never',
		'@media (hover: hover) { :merge(.group):hover & }'
	);
	addVariant(
		'peer-hover-never',
		'@media (hover: hover) { :merge(.peer):hover & }'
	);
	// Applied on hover if supported, always applied otherwise
	addVariant('hover-always', [
		'@media (hover: hover) { &:hover }',
		'@media (hover: none)',
	]);
	addVariant('group-hover-always', [
		'@media (hover: hover) { :merge(.group):hover & }',
		'@media (hover: none)',
	]);
	addVariant('peer-hover-always', [
		'@media (hover: hover) { :merge(.peer):hover & }',
		'@media (hover: none)',
	]);
});

export default hover;
