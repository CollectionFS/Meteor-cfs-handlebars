Package.describe({
  version: '0.0.0',
  summary: "Handlebars helpers for CollectionFS"
});

Package.on_use(function(api) {
  "use strict";
  api.use(['underscore', 'templating', 'handlebars', 'collectionfs'], 'client');
  api.add_files([
    // 'templates.html',
    // 'numeral.js',
    // 'handlebars.js'
    'helpers.html',
    'helpers.js'
  ], 'client');
});

Package.on_test(function(api) {
  api.use(['cfs-handlebars', 'test-helpers', 'tinytest'], 'client');
  api.add_files('tests.js', 'client');
});
