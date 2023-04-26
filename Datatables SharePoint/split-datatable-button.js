<html>
  <head>
  

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
</head>
<body>
 <div class="btn-group">
  <button type="button" class="btn btn-primary">Regular Button</button>
  <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Link 1</a></li>
    <li><a class="dropdown-item" href="#">Link 2</a></li>
    <li><a class="dropdown-item" href="#">Link 3</a></li>
  </ul>
</div> 
</body>

</html>



// Add the onclick event to the trashIcon
var trashIcon = '<a style="text-decoration: none; color: red; cursor: pointer;" onclick="openDeleteModal(' + full.ID + ');"><i class="fa fa-trash" data-bs-toggle="modal" data-bs-target="#deleteRequestModal"></i></a>';

// Declare a global variable to store the item ID
var itemToDelete;

// Open the delete modal and store the item ID
function openDeleteModal(itemId) {
  itemToDelete = itemId;
  var deleteRequestModal = new bootstrap.Modal(document.getElementById('deleteRequestModal'));
  deleteRequestModal.show();
}

// Event listener for the "Yes" button
document.getElementById("confirmDelete").addEventListener("click", deleteItem);

// Function to delete the item
function deleteItem() {
  if (itemToDelete) {
    // Call your delete function here, for example:
    // deleteListItem(itemToDelete);
    console.log("Item to delete:", itemToDelete);
  }
}
