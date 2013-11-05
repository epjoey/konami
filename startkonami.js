require.config({
  // Add this map config in addition to any baseUrl or
  // paths config you may already have in the project.
  map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    '*': { 'jquery': 'jquery-private' },

    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
    'jquery-private': { 'jquery': 'jquery' }
  },  
  shim: {
    backbone: {
        deps: ["underscore", "jquery-private"],
        exports: "Backbone"
    },    
    underscore: {
      exports: '_'
    }
  }
});

require(["konami", "epkonami"], function(Konami, epkonami) {
  
  // testing
  //epkonami.init();

  var konami = new Konami();
  konami.code = function() { 
    epkonami.init();
  }
  konami.load(); 
});