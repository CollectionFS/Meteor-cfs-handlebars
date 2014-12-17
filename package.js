Package.describe({
  name: 'cfs:handlebars',
  version: '0.0.5',
  summary: 'Handlebars helpers for CollectionFS',
  git: 'https://github.com/CollectionFS/Meteor-cfs-handlebars.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use([
    'underscore',
    'templating',
    'handlebars',
    'cfs:standard-packages@0.5.0'
  ], 'client');
  api.addFiles([
    // 'templates.html',
    // 'numeral.js',
    // 'handlebars.js'
    'helpers.html',
    'helpers.js'
  ], 'client');
});

Package.onTest(function(api) {
  api.use(['cfs:handlebars', 'test-helpers', 'tinytest'], 'client');
  api.addFiles('tests.js', 'client');
});
