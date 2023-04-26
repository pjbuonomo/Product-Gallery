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