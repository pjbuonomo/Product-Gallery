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
  






  function animateGradient(progressPercentage) {
    orderProgress.style.background = `linear-gradient(90deg, red ${progressPercentage}%, #dfdfdf 0%)`;
  }
  
  if (status === 'Not-Started') {
    animateGradient(0);
    stepRequestSubmitted.classList.add('active-track-step');
    statusBadge.classList.add('badge-Not-Started');
    console.log("NS True");
  } else if (assignedToX !== 'undefined') {
    animateGradient(25);
    stepRequestSubmitted.classList.add('active-track-step');
    stepAssignedTo.classList.add('active-track-step');
    console.log("IP True");
  } else if (status === 'In-Progress') {
    animateGradient(50);
    stepRequestSubmitted.classList.add('active-track-step');
    stepAssignedTo.classList.add('active-track-step');
    stepInProgress.classList.add('active-track-step');
    statusBadge.classList.add('badge-In-Progress');
    console.log("IP2 True");
  } else if (status === 'Ordered') {
    animateGradient(75);
    stepRequestSubmitted.classList.add('active-track-step');
    stepAssignedTo.classList.add('active-track-step');
    stepInProgress.classList.add('active-track-step');
    stepOrdered.classList.add('active-track-step');
    statusBadge.classList.add('badge-Ordered');
    console.log("O True");
  } else if (status === 'Completed') {
    animateGradient(100);
    stepRequestSubmitted.classList.add('active-track-step');
    stepAssignedTo.classList.add('active-track-step');
    stepInProgress.classList.add('active-track-step');
    stepOrdered.classList.add('active-track-step');
    stepCompleted.classList.add('active-track-step');
    statusBadge.classList.add('badge-Completed');
    console.log("C True");
  }

  