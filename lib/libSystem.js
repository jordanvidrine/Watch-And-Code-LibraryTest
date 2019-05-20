(function(){
  var libraryStorage = {}
  function librarySystem(name,dependencies,callback) {
    //if arguments is greater than one, run through the 'definition' secion to define a library
    if (arguments.length > 1) {
      //if call includes dependencies
      if (dependencies.length > 0) {
        //checks to see if the library includes these dependencies
        if (dependencies.every(e=>libraryStorage.hasOwnProperty(e))) {
          //creates a map of the return values of each dependency
          let dependenciesMap = dependencies.map(e => librarySystem(e));
          //if it includes them, it creates a new library object w/ included info
          libraryStorage[name] = {name: name,
                                  library: callback(...dependenciesMap),
                                  dependencies: [...dependencies]}
        } else {
          //if not, it stores the information in the library, but does not define the library return value yet
          //it stores all of the information necessary to eventually run the callback and define itself
          libraryStorage[name] = {name: name,
                                  library: undefined,
                                  dependencies: [...dependencies],
                                  callback: callback}
        }
      } else {
        //if call does not include dependencies, creates the basic library
        libraryStorage[name] = {name: name,
                                library:callback(),
                                dependencies: [...dependencies]}
      }
    } else {
      if (libraryStorage[name].library === undefined ) {
        librarySystem(libraryStorage[name].name,libraryStorage[name].dependencies,libraryStorage[name].callback)
      }
      return libraryStorage[name].library
    }
  }
  window.librarySystem = librarySystem;
})()


// librarySystem('name', [], function() {
//   return 'Gordon';
// });

// librarySystem('company', [], function() {
//   return 'Watch and Code';
// });

// librarySystem('workBlurb', ['name', 'company'], function(name, company) {
//   return name + ' works at ' + company;
// });

// librarySystem('workBlurb'); // 'Gordon works at Watch and Code'
