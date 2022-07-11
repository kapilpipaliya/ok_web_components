// https://github.com/solidjs/solid-docs-next/issues/35
const Solid = require("vite-plugin-solid")

module.exports = {

  core: {
    "builder": "@storybook/builder-vite"
  },

  framework: "@storybook/html",

  stories: [
    "../src/**/*.stories.tsx",
  ],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],

  async viteFinal(config, {configType}){
		config.plugins.unshift(
			Solid({hot:false}),
		)

    return config
  },

}
