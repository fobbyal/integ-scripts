module.export = {
  release: {
    publish: [
      '@semantic-release/npm',
      {
        path: '@semantic-release/git',
        assets: ['package.json', 'dist/**/*.{js|css}', 'docs'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
      '@semantic-release/github',
    ],
  },
}
