module.exports = {
	parserOptions: {
		project: './tsconfig.json',
	},
	extends: [
		'airbnb',
		'eslint:recommended',
		'plugin:@stencil/recommended',
		'plugin:import/errors',
		'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'prettier/react',
		'plugin:@angular-eslint/recommended',
		'plugin:@angular-eslint/template/process-inline-templates',
	],
	overrides: [
		{
			files: ['*.html'],
			extends: ['plugin:@angular-eslint/template/recommended'],
			rules: {
				/**
				 * Any template/HTML related rules you wish to use/reconfigure over and above the
				 * recommended set provided by the @angular-eslint project would go here.
				 */
			},
		},
	],
};
