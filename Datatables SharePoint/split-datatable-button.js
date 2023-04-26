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

"mData": null,
  "render": function (data, type, row) {
    var trashIcon = '<a href="www.example.com" style="text-decoration: none; margin-right: 10px;"><i class="fa fa-trash"></i></a>';
    var editIcon = '<a href="www.example.com" style="text-decoration: none; margin-right: 10px;"><i class="fa fa-pencil"></i></a>';
    var personIcon = '<a href="www.example.com" style="text-decoration: none;"><i class="fa fa-user"></i></a>';
    return trashIcon + editIcon + personIcon;