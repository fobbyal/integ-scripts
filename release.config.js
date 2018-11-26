module.export = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'dist/**/*.*', label: 'CSS distribution' }],
      },
    ],
  ],
}
