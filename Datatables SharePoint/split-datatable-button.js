<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>

<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

<!-- Bootstrap JavaScript (popper.js is required for the dropdown) -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/esm/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

{
    "mData": null,
    "render": function (data, type, row) {
      return '<div class="btn-group">' +
             '<button type="button" class="btn btn-primary">Action</button>' +
             '<button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
             '<span class="sr-only">Toggle Dropdown</span>' +
             '</button>' +
             '<div class="dropdown-menu">' +
             '<a class="dropdown-item" href="#">Action 1</a>' +
             '<a class="dropdown-item" href="#">Action 2</a>' +
             '</div>' +
             '</div>';
    }
  }