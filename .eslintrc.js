module.exports = {
    root: true,
    plugins: ["es"],
    env: { es6: true, node: true, jest: true, jasmine: true },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        // we explicitly don't include project because of https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-481356103
        // project: "./tsconfig.json",
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:eslint-comments/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    reportUnusedDisableDirectives: true,
    rules: {
        // NOTE: these were last reviewed with @typescript-eslint/eslint-plugin version 4.14.0

        // replaced by core typescript functionality
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
        "import/default": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-named-as-default-member": "off",
        "consistent-return": "off",

        // replaced by @typescript-eslint rules
        "dot-notation": "off", // replaced by @typescript-eslint/dot-notation
        "no-duplicate-imports": "off", // replaced by @typescript-eslint/no-duplicate-imports, which supports type-only imports
        "import/no-duplicates": "off", // replaced by @typescript-eslint/no-duplicate-imports, which supports type-only imports
        "no-unused-expressions": "off", // replaced by @typescript-eslint/no-unused-expressions, which supports null coalescing

        // Project rules
        "@typescript-eslint/array-type": ["error", { default: "generic" }],
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
        ],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-duplicate-imports": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unnecessary-type-constraint": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: true }],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/unified-signatures": "error",
        "import/extensions": [
            "error",
            "always",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                pathGroups: [
                    {
                        pattern: "@remitly/react-native-remitly-cesdk/**",
                        group: "internal",
                    },
                ],
            },
        ],
        "array-callback-return": ["error", {}],
        "arrow-body-style": "error",
        "block-scoped-var": "error",
        "curly": "error",
        "default-case": "off", // this doesn't play well with case over a typescript enum
        "eqeqeq": ["error", "smart"],
        "es/no-regexp-lookbehind-assertions": "error", // not supported as of iOS 13.4
        "func-names": "error",
        "jsx-a11y/accessible-emoji": "off",
        "jsx-a11y/no-autofocus": "off",
        "no-await-in-loop": "error",
        "no-caller": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-labels": "error",
        "no-loop-func": "error",
        "no-new": "error",
        "no-return-await": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-unneeded-ternary": ["error", { defaultAssignment: false }],
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-rest-params": "error",
        "prefer-template": "error",
        "react/jsx-boolean-value": "error",
        "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
        "react/jsx-no-bind": "error",
        "react/no-deprecated": "error",
        "react/no-unused-state": "error",
        "react/prefer-stateless-function": "error",
        "react/prop-types": "off", // This doesn't work properly with typescript props, I'm okay turning it off because type checking covers most use cases
        "react/self-closing-comp": "error",
        "sort-imports": ["error", { ignoreDeclarationSort: true }],
        "spaced-comment": ["error", "always", { markers: ["/"] }], // allow triple-slash typescript refs
        "symbol-description": "error",
        "yoda": "error",
        "@typescript-eslint/no-non-null-assertion": "error", // Existing use cases in narwhal have been commented. This is turned on to avoid new cases to be added.

        // These rules are disabled because of historical patterns in the codebase
        // Ideally we'd enable them
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-implicit-any-catch": "off", // this is kind of useless in typescript 4.1, as the only valid values are any and unknown
        "class-methods-use-this": "off", // we have lots of violations, and the refactor sometimes doesn't makes sense. I'd like to use this to avoid people creating unnecessary closures

        // High performance burden (requires type checking)
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "import/no-named-as-default": "off",
        "import/no-cycle": "off",
        "import/no-unused-modules": "off",
    },
    settings: {
        "react": {
            version: "detect",
        },
        "import/extensions": [".ts", ".tsx", ".js", ".jsx"],
    },

    overrides: [
        {
            // test files overrides
            files: ["**/__tests__/**/*.{ts,tsx,js,jsx}", "**/__mocks__/**"],
            extends: ["plugin:jest/recommended", "plugin:testing-library/react", "plugin:jest-dom/recommended"],
            rules: {
                "@typescript-eslint/consistent-type-assertions": "off",
                "@typescript-eslint/no-empty-function": "off",
                "jest/no-disabled-tests": "off",
                "jest/no-standalone-expect": "off",
                "react/display-name": "off",
                "react/jsx-no-bind": "off",
                "react/prop-types": "off",
                "class-methods-use-this": "off",
                // these rules are modified because of historical patterns in the codebase we haven't taken the time to fix
                "jest/no-mocks-import": "off",
                "jest/expect-expect": "off",
            },
        },
        {
            // test files overrides
            files: ["**/__tests__/**/*.native.{ts,tsx,js,jsx}"],
            extends: ["plugin:jest/recommended", "plugin:testing-library/react", "plugin:jest-dom/recommended"],
            rules: {
                "@typescript-eslint/consistent-type-assertions": "off",
                "@typescript-eslint/no-empty-function": "off",
                "jest/no-disabled-tests": "off",
                "jest/no-standalone-expect": "off",
                "react/display-name": "off",
                "react/jsx-no-bind": "off",
                "react/prop-types": "off",
                "class-methods-use-this": "off",
                "jest-dom/prefer-in-document": "off",
                "jest-dom/prefer-focus": "off",
                "jest-dom/prefer-to-have-style": "off",
                "testing-library/prefer-screen-queries": "off",
                // these rules are modified because of historical patterns in the codebase we haven't taken the time to fix
                "jest/no-mocks-import": "off",
                "jest/expect-expect": "off",
            },
        },
        {
            files: ["loc/*.json"],
            parser: "jsonc-eslint-parser",
            rules: {
                "no-irregular-whitespace": "off",
            },
        },
    ],
};
module.exports = {
    root: true,
    plugins: ["es"],
    env: { es6: true, node: true, jest: true, jasmine: true },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        // we explicitly don't include project because of https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-481356103
        // project: "./tsconfig.json",
        sourceType: "module",
    },
    extends: [
        "eslint:recommended",
        "plugin:eslint-comments/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:remitly-narwhal/recommended",
    ],
    reportUnusedDisableDirectives: true,
    rules: {
        // NOTE: these were last reviewed with @typescript-eslint/eslint-plugin version 4.14.0

        // replaced by core typescript functionality
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/FAQ.md#eslint-plugin-import
        "import/default": "off",
        "import/named": "off",
        "import/namespace": "off",
        "import/no-named-as-default-member": "off",
        "import/no-default-export": "warn",
        "remitly-narwhal/no-default-import": "warn",
        "consistent-return": "off",

        // replaced by @typescript-eslint rules
        "dot-notation": "off", // replaced by @typescript-eslint/dot-notation
        "no-duplicate-imports": "off", // replaced by @typescript-eslint/no-duplicate-imports, which supports type-only imports
        "import/no-duplicates": "off", // replaced by @typescript-eslint/no-duplicate-imports, which supports type-only imports
        "no-unused-expressions": "off", // replaced by @typescript-eslint/no-unused-expressions, which supports null coalescing

        // Project rules
        "@typescript-eslint/array-type": ["error", { default: "generic" }],
        "@typescript-eslint/ban-types": "error",
        "@typescript-eslint/consistent-type-assertions": [
            "error",
            { assertionStyle: "as", objectLiteralTypeAssertions: "never" },
        ],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-duplicate-imports": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-unnecessary-type-constraint": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: true }],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/unified-signatures": "error",
        "import/extensions": [
            "error",
            "always",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never",
            },
        ],
        "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                pathGroups: [
                    {
                        pattern: "@remitly/react-native-remitly-cesdk/**",
                        group: "internal",
                    },
                ],
            },
        ],
        "array-callback-return": ["error", {}],
        "arrow-body-style": "error",
        "block-scoped-var": "error",
        "curly": "error",
        "default-case": "off", // this doesn't play well with case over a typescript enum
        "eqeqeq": ["error", "smart"],
        "es/no-regexp-lookbehind-assertions": "error", // not supported as of iOS 13.4
        "func-names": "error",
        "jsx-a11y/accessible-emoji": "off",
        "jsx-a11y/no-autofocus": "off",
        "no-await-in-loop": "error",
        "no-caller": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-labels": "error",
        "no-loop-func": "error",
        "no-new": "error",
        "no-return-await": "error",
        "no-self-compare": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-unneeded-ternary": ["error", { defaultAssignment: false }],
        "no-useless-computed-key": "error",
        "no-useless-concat": "error",
        "no-useless-return": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-const": "error",
        "prefer-promise-reject-errors": "error",
        "prefer-rest-params": "error",
        "prefer-template": "error",
        "react/jsx-boolean-value": "error",
        "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
        "react/jsx-no-bind": "error",
        "react/no-deprecated": "error",
        "react/no-unused-state": "error",
        "react/prefer-stateless-function": "error",
        "react/prop-types": "off", // This doesn't work properly with typescript props, I'm okay turning it off because type checking covers most use cases
        "react/self-closing-comp": "error",
        "sort-imports": ["error", { ignoreDeclarationSort: true }],
        "spaced-comment": ["error", "always", { markers: ["/"] }], // allow triple-slash typescript refs
        "symbol-description": "error",
        "yoda": "error",
        "@typescript-eslint/no-non-null-assertion": "error", // Existing use cases in narwhal have been commented. This is turned on to avoid new cases to be added.

        // These rules are disabled because of historical patterns in the codebase
        // Ideally we'd enable them
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-implicit-any-catch": "off", // this is kind of useless in typescript 4.1, as the only valid values are any and unknown
        "class-methods-use-this": "off", // we have lots of violations, and the refactor sometimes doesn't makes sense. I'd like to use this to avoid people creating unnecessary closures

        // High performance burden (requires type checking)
        "remitly-narwhal/dot-equals": "off",
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/dot-notation": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/restrict-plus-operands": "off",
        "import/no-named-as-default": "off",
        "import/no-cycle": "off",
        "import/no-unused-modules": "off",
    },
    settings: {
        "react": {
            version: "detect",
        },
        "import/extensions": [".ts", ".tsx", ".js", ".jsx"],
    },

    overrides: [
        {
            // test files overrides
            files: ["**/__tests__/**/*.{ts,tsx,js,jsx}", "**/__mocks__/**"],
            extends: ["plugin:jest/recommended", "plugin:testing-library/react", "plugin:jest-dom/recommended"],
            rules: {
                "@typescript-eslint/consistent-type-assertions": "off",
                "@typescript-eslint/no-empty-function": "off",
                "jest/no-disabled-tests": "off",
                "jest/no-standalone-expect": "off",
                "react/display-name": "off",
                "react/jsx-no-bind": "off",
                "react/prop-types": "off",
                "remitly-narwhal/code-splitting": "off",
                "class-methods-use-this": "off",
                // these rules are modified because of historical patterns in the codebase we haven't taken the time to fix
                "jest/no-mocks-import": "off",
                "jest/expect-expect": "off",
            },
        },
        {
            // test files overrides
            files: ["**/__tests__/**/*.native.{ts,tsx,js,jsx}"],
            extends: ["plugin:jest/recommended", "plugin:testing-library/react", "plugin:jest-dom/recommended"],
            rules: {
                "@typescript-eslint/consistent-type-assertions": "off",
                "@typescript-eslint/no-empty-function": "off",
                "jest/no-disabled-tests": "off",
                "jest/no-standalone-expect": "off",
                "react/display-name": "off",
                "react/jsx-no-bind": "off",
                "react/prop-types": "off",
                "remitly-narwhal/code-splitting": "off",
                "class-methods-use-this": "off",
                "jest-dom/prefer-in-document": "off",
                "jest-dom/prefer-focus": "off",
                "jest-dom/prefer-to-have-style": "off",
                "testing-library/prefer-screen-queries": "off",
                // these rules are modified because of historical patterns in the codebase we haven't taken the time to fix
                "jest/no-mocks-import": "off",
                "jest/expect-expect": "off",
            },
        },
        {
            // storybook files
            files: ["**/*.stories.{tsx,ts}", "storybook/stories/**"],
            rules: {
                "@typescript-eslint/consistent-type-assertions": "off",
                "react/jsx-no-bind": "off",
            },
        },
        {
            files: ["loc/*.json"],
            extends: ["plugin:remitly-narwhal/loc"],
            parser: "jsonc-eslint-parser",
            rules: {
                "no-irregular-whitespace": "off",
            },
        },
    ],
};
