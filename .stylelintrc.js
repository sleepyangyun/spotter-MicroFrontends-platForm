module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-config-prettier',
    ],
    plugins: [
        'stylelint-order',
        'stylelint-declaration-block-no-ignored-properties',
        'stylelint-scss',
    ],
    customSyntax: require('postcss-less'),
    rules: {
        'comment-empty-line-before': null,
        'declaration-empty-line-before': null,
        'function-name-case': 'lower',
        'no-descending-specificity': null,
        'no-invalid-double-slash-comments': null,
        'value-keyword-case': null,
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'extend',
                    'at-root',
                    'debug',
                    'warn',
                    'error',
                    'if',
                    'else',
                    'for',
                    'each',
                    'while',
                    'mixin',
                    'include',
                    'content',
                    'return',
                    'function',
                ],
            },
        ],
        // 忽略自定义font-family不兜底 https://stylelint.io/user-guide/rules/list/font-family-no-missing-generic-family-keyword/
        'font-family-no-missing-generic-family-keyword': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global'],
            },
        ],
    },
    ignoreFiles: ['node_modules/**/*', 'client/style/iconfont/*', 'dist/**/*'],
};
