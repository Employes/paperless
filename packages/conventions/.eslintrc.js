module.exports = {
	parserOptions: {
		project: './tsconfig.json',
	},
	plugins: ['@angular-eslint/template'],
	extends: [
		'eslint:recommended',
		'plugin:@stencil/recommended',
		'plugin:import/errors',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'plugin:@angular-eslint/recommended',
		'plugin:@angular-eslint/template/process-inline-templates',
	],
	overrides: [
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				'no-tabs': 0,
				/**
				 * Any template/HTML related rules you wish to use/reconfigure over and above the
				 * recommended set provided by the @angular-eslint project would go here.
				 */
			},
		},
	],
};
