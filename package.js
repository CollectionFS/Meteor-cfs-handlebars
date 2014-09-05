Package.describe({
  name: 'cfs:handlebars',
  version: '0.0.0',
  summary: "Handlebars helpers for CollectionFS"
});

Package.on_use(function(api) {
  api.versionsFrom('METEOR@0.9.1');

  api.use([
    'underscore',
    'templating',
    'handlebars',
    'cfs:standard-packages@0.0.0'
  ], 'client');
  api.add_files([
    // 'templates.html',
    // 'numeral.js',
    // 'handlebars.js'
    'helpers.html',
    'helpers.js'
  ], 'client');
});

Package.on_test(function(api) {
  api.use(['cfs:handlebars', 'test-helpers', 'tinytest'], 'client');
  api.add_files('tests.js', 'client');
});
