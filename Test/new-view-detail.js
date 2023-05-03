$(document).ready(function() {
    // retrieve the current item ID from the query string
    var itemId = GetUrlKeyValue('ID');
  
    // set the REST API endpoint URL with required query parameters
    var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PurchaseRequests')/items(" + itemId + ")?$select=ID,Created,Modified,Title,DIER_x0020_Code,Project_x0020_Code,Approver,Department,Ship_x0020_To,Attention_x0020_To,Request_x0020_For,Status,Comment,Item_x0020_Details,Item_x0020_Details,Created,Modified,AssignedTo/Title&$expand=AssignedTo";
  
    // execute the AJAX call to retrieve the item data
    $.ajax({
      url: oDataUrl,
      type: "GET",
      dataType: "json",
      headers: {
        "accept": "application/json;odata=verbose"
      },
      success: function(data) {
        // retrieve the item properties from the response data
        var item = data.d;
  
        // append each property value to its own HTML id tag
        $('#itemID').text(item.ID);
        $('#itemCreated').text(item.Created);
        $('#itemModified').text(item.Modified);
        $('#itemTitle').text(item.Title);
        $('#itemDIERCode').text(item.DIER_x0020_Code);
        $('#itemProjectCode').text(item.Project_x0020_Code);
        $('#itemApprover').text(item.Approver);
        $('#itemDepartment').text(item.Department);
        $('#itemShipTo').text(item.Ship_x0020_To);
        $('#itemAttentionTo').text(item.Attention_x0020_To);
        $('#itemRequestFor').text(item.Request_x0020_For);
        $('#itemStatus').text(item.Status);
        $('#itemComment').text(item.Comment);
        $('#itemItemDetails').text(item.Item_x0020_Details);
        $('#itemAssignedTo').text(item.AssignedTo.Title);
      },
      error: function(error) {
        console.log(JSON.stringify(error));
      }
    });
  });
  
  // helper function to retrieve query string parameter values
  function GetUrlKeyValue(key) {
    return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }
  