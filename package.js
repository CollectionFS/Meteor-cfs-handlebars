Package.describe({
  summary: "Handlebars helpers for CollectionFS"
});

Package.on_use(function(api) {
  "use strict";
  api.use(['underscore', 'templating', 'handlebars', 'collectionFS'], 'client');
  api.add_files([
    'templates.html',
    'handlebars.js'
  ], 'client');
});

Package.on_test(function(api) {
  api.use(['cfs-handlebars', 'test-helpers', 'tinytest'], 'client');
  api.add_files('tests.js', 'client');
});