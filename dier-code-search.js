// Replace 'your_list_name' with the actual name of your SharePoint list
const listName = 'your_list_name';

// Input value: Replace 'inputValue' with the actual value you want to search for
const inputValue = '00-06-08-01-01-14';

// Sanitize input value by removing hyphens
const sanitizedInputValue = inputValue.replace(/-/g, '');

// Build the SharePoint REST API query URL
const url = _spPageContextInfo.webAbsoluteUrl + `/_api/web/lists/getbytitle('${listName}')/items?$select=ID,Title`;

// Fetch the data from the SharePoint list
fetch(url, {
  headers: {
    'Accept': 'application/json;odata=verbose'
  },
  credentials: 'same-origin'
})
  .then(response => response.json())
  .then(data => {
    const items = data.d.results;

    // Search for the item in the SharePoint list
    items.forEach(item => {
      const lastTwelveChars = item.Title.slice(-12);

      if (lastTwelveChars === sanitizedInputValue) {
        console.log(`Found item: ${item.Title}`);

        // Set the HTML element's ID to the found item's ID
        const htmlElement = document.getElementById('your_element_id');
        if (htmlElement) {
          htmlElement.id = `item-${item.ID}`;
        }
      }
    });
  })
  .catch(error => {
    console.error(`Error fetching SharePoint list data: ${error}`);
  });
