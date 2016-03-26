Package.describe({
  name: 'backer-tracker',
  version: '0.0.1',
  // Brief, one-line summary of the package.
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');
    api.use([
        'templating',
        'iron:router@1.0.7',
        'yogiben:admin',
    ]);

    api.addFiles([
        'lib/adminSidebar.js',
        'lib/router.js',
        'lib/template.html',
        'lib/template.js'
    ], 'client');
});