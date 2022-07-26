## Setup

`npm i` to install dependencies

`npm link` in this project root directory

`npm link ok_web_components` in desired project root directory where you want to use this library

## Available Scripts

- `npm run dev`: Runs the app in the development mode
- `npm run build`: Builds the app for production to the `dist` folder
- `npm run lint:check`: Find linting errors
- `npm run lint:fix`: Fix linting errors in directory
- `npm run prettier:check`: Find prettier formatting suggestions in project.
- `npm run prettier:format`: Find & fix prettier formatting suggestions in project.

## Deployment

You can deploy the `dist` folder to any static host provider

## Linting

ESLint is configured as following

- Warning on prettier warnings.
<!-- - `id-length`: avoid single letter name -->
- `camelcase`: Use `camelCase` for naming objects, functions, and instances
- `new-cap`: Use `PascalCase` for naming constructor and classes,
- `no-underscore-dangle`: Do not use leading or trailing underscore

## Naming conventions

- File name - A base filename should `exactly match` the name of its default export.
- Export function - Use `camelCase` when you export-default a function.
- Export constructor/class/object - use `PascalCase` when export a constructor/class/object/function library.
- Optionally uppercase const only if it is
  -- Exported
  -- is constant


## Appendix

 - Don't use `{}` as a type. `{}` actually means "any non-nullish value". 
    For us when we define this for props in Component it is technically safe may not be safe otherwise. 
    More [here](https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492)
