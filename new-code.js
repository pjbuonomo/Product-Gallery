// wait for the SharePoint JavaScript object model to load
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function() {
    // get the current list item's ID from the query string
    var itemId = GetUrlKeyValue('ID');
  
    // get the context and list item object
    var ctx = SP.ClientContext.get_current();
    var list = ctx.get_web().get_lists().getById(_spPageContextInfo.pageListId);
    var listItem = list.getItemById(itemId);
  
    // load the properties we want to retrieve
    ctx.load(listItem, 'Created', 'Modified', 'ID');
  
    // execute the query and log the results to the console
    ctx.executeQueryAsync(function() {
      console.log('Created:', listItem.get_item('Created'));
      console.log('Modified:', listItem.get_item('Modified'));
      console.log('ID:', listItem.get_item('ID'));
    }, function(sender, args) {
      console.error(args.get_message());
    });
  });
  
  function GetUrlKeyValue(key) {
    var vars = window.location.search.substring(1).split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == key) {
        return decodeURIComponent(pair[1]);
      }
    }
    return null;
  }
  