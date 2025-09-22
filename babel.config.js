module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/models': './src/models',
            '@/utils': './src/utils',
            '@/navigation': './src/navigation',
          },
        },
      ],
    ],
  };
};