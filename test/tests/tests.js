tests({
  'Libraries can be created out of order': function() {
    librarySystem('workBlurb', ['name', 'company'], function(name, company) {
      return name + ' works at ' + company;
    });
    librarySystem('name', [], function() {
      return 'Gordon';
    });
    librarySystem('company', [], function() {
      return 'Watch and Code';
    });
    eq(librarySystem('workBlurb'), 'Gordon works at Watch and Code')
  },

  'Callback function should only be run once': function() {
    var callback = 0;
    librarySystem('workBlurb_2', ['name_2', 'company_2'], function(name_2, company_2) {
      callback++;
      return name_2 + ' works at ' + company_2;
    });
    librarySystem('workBlurb_2');
    librarySystem('name_2', [], function() {
      return 'Gordon';
    });
    librarySystem('company_2', [], function() {
      return 'Watch and Code';
    });

    eq(librarySystem('workBlurb_2'), 'Gordon works at Watch and Code')
    eq(callback,1);
  },

  'Callback functions for a library w/ dependencies, should only be run AFTER all dependencies have been added to the library': function() {
    var callback_2 = 0;
    librarySystem('workBlurb_3', ['name_3', 'company_3'], function(name_3, company_3) {
      callback_2++;
      return name_3 + ' works at ' + company_3;
    });
    librarySystem('workBlurb_3');
    eq(callback_2,0);
    librarySystem('name_3', [], function() {
      return 'Gordon';
    });
    librarySystem('company_3', [], function() {
      return 'Watch and Code';
    });
    eq(librarySystem('workBlurb_3'), 'Gordon works at Watch and Code')
    eq(callback_2,1);
  },

});
