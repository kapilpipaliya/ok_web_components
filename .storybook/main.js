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
    config.plugins.unshift(Solid({hot:false}),)
    config.optimizeDeps.extensions = ["jsx"];
    config.optimizeDeps.exclude = [...(config.optimizeDeps.exclude || []),
      "solid-heroicons/solid-mini",
      "solid-heroicons/solid",
      "solid-heroicons/outline",
      "@iconify-icon/solid",
    ];
    return config;
  },
}
