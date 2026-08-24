import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import json from "@eslint/json"
import markdown from "@eslint/markdown"
import { defineConfig } from "eslint/config"

/**
 * @summary Configuration of ESLint for the add-on.
 * @description This configuration is used to lint the code for the add-on.
 * @see {@link https://eslint.org/docs/latest/user-guide/configuring/configuration-files} for more information.
 */
export default defineConfig([
    tseslint.configs.recommended,
    {
        ignores: [
            "node_modules/",
            "dist/",
            "build/",
            /**
             * @remarks `tsconfig.json` does not have to be linted, as IDE already does it.
             * @throws {Error} Throws an error due to comments.
             */
            "./**/tsconfig*.json",
        ],
    },
    {
        files: ["**/*.ts"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                project: ["./tsconfig.json"],
            },
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_{1,2}",
                    varsIgnorePattern: "^_{1,2}",
                },
            ],
            "no-unused-vars": "off",
        },
    },
    {
        files: ["**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.jsonc"],
        plugins: { json },
        language: "json/jsonc",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.json5"],
        plugins: { json },
        language: "json/json5",
        extends: ["json/recommended"],
    },
    {
        files: ["**/*.md"],
        plugins: { markdown },
        language: "markdown/gfm",
        extends: ["markdown/recommended"],
        rules: {
            "markdown/no-missing-label-refs": "off",
        },
    },
])
