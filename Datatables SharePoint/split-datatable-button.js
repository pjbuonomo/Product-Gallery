{
    "mData": null,
    "render": function(data, type, row, meta) {
      var dropdownHtml = '<div class="dropdown">' +
                          '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</button>' +
                          '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
                            '<a class="dropdown-item" href="#">Action 1</a>' +
                            '<a class="dropdown-item" href="#">Action 2</a>' +
                          '</div>' +
                        '</div>';
      return dropdownHtml;
    }
  }
  