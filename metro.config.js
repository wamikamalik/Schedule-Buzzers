module.exports = {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
    })
}
}