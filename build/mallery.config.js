module.exports = {
  title: 'Alo',
  paths: {
    src: '../docs',
    output: '../site',
    public: '../docs/public'
  },
  colors: {
    // http://colorschemedesigner.com/csd-3.5/#0i11TrbnTw0qw
    accent: '#D97647'
  },
  toc: [
    { title: 'Alo', path: 'README.md' },
    { path: 'getting_started', children: [
      { path: 'installation.md' },
      { path: 'first_steps.md' },
      { path: 'stores.md' },
      { path: 'reducers.md' },
      { path: 'subscriptions.md' },
      { path: 'middlewares.md' }
    ] },
    { path: 'streams.md' },
    { path: 'extras.md' },
    { title: 'Github', href: 'https://github.com/alojs/alo' }
  ]
};
