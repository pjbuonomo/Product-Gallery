document.addEventListener("DOMContentLoaded", function () {
    const listItemId = GetUrlKeyValue("ID");
    const listId = _spPageContextInfo.pageListId;
    
    function setElementText(id, text) {
      document.getElementById(id).innerText = text;
    }
    
    function addClassToElement(selector, className) {
      document.querySelector(selector).classList.add(className);
    }
    
    function setProgressClasses(status) {
      const stepMapping = {
        'Not-Started': 'step-rs',
        'Assigned': 'step-at',
        'In-Progress': 'step-ip',
        'Ordered': 'step-o',
        'Completed': 'step-c'
      };
      
      addClassToElement('.order-progress', stepMapping[status]);
    }
    
    function getItemDetails(listId, listItemId) {
      const clientContext = new SP.ClientContext.get_current();
      const list = clientContext.get_web().get_lists().getById(listId);
      const listItem = list.getItemById(listItemId);
  
      clientContext.load(listItem);
      clientContext.executeQueryAsync(
        function () {
          const assignedToField = listItem.get_item("AssignedTo");
          const assignedToXName = assignedToField ? assignedToField.get_lookupValue() : 'Unassigned';
          const status = listItem.get_item("Status");
  
          setElementText("customAuthor", listItem.get_item("Author").get_lookupValue());
          setElementText("customId", "ESP" + listItem.get_item("ID"));
          setElementText("customStatus", status);
          setElementText("customAssignedTo", `${assignedToXName}<span class="time-track-text"><br /> picked up <br /> this request</span>`);
          setElementText("customCreated", listItem.get_item("Created").toLocaleString());
  
          setProgressClasses(status);
        },
        function (sender, args) {
          console.error("Error: " + args.get_message());
        }
      );
    }
  
    getItemDetails(listId, listItemId);
  });
  