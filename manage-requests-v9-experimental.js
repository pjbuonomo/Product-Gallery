$(document).ready(function() {
  loadListItems();
  getCount("Not-Started");
  getCount("In-Progress");
  getCount("In-Approval");
  getCount("Ordered");
  getCount("Completed");

  $(".stats-header").each(function() {
    $(this).prop("Counter", 0).animate({
      Counter: $(this).text()
    }, {
      duration: 1500,
      easing: "swing",
      step: function(now) {
        $(this).text(Math.ceil(now));
      }
    });
  });

  setTimeout(function() {}, 500);
});

window.onload = function() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
};

//click event for toggle
function addClickEvent() {}

function styleOverride() {}

function getCount(status) {
  var listName = "PurchaseRequests";
  var query = "$filter=(Status eq '" + status + "')";
  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + listName + "')/items?" + query;
  getListItems(url, function(data) {
    var items = data.d.results;
    $("#" + status).text(items.length);
  });
}

function loadListItems() {
  return new Promise(function(resolve, reject) {
    var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PurchaseRequests')/items?$select=*,AssignedTo/Title&$expand=AssignedTo";
    console.log(_spPageContextInfo);
    $.ajax({
      url: oDataUrl,
      type: "GET",
      dataType: "json",
      headers: {
        accept: "application/json;odata=verbose",
      },
      success: function(data) {
        successFunction(data);
        resolve(data);
      },
      error: function(error) {
        errorFunction(error);
        reject(error);
      }
    });
  });
}

function successFunction(data) {
  try {
    var dataTableExample = $("#pDashboard").DataTable();
    if (dataTableExample != "undefined") {
      dataTableExample.destroy();
    }

    dataTableExample = $("#pDashboard").DataTable({
      order: [
        [2, "desc"]
      ],
      autoWidth: true,
      dom: 'PQBlfs<"filters">r<"delete-btn">tip',
      buttons: ['copy', 'excel', 'pdf', 'print'],
      searchBuilder: {
        preDefined: {
          criteria: [{
            data: 'Status',
            condition: '!=',
            value: ['Completed']
          }]
        }
      },
      scrollY: '800px',
      searchPanes: true,
      searchPanes: {
        panes: [{
          header: 'Views',
          options: [{
              label: 'All Requests',
              value: function(rowData, rowIdx) {
                var displayName = web.get_currentUser().get_title();
                return rowData["Status"] !== "Completed";
              },
            },
            {
              label: 'Unassigned Requests',
              value: function(rowData, rowIdx) {
                var displayName = web.get_currentUser().get_title();
                console.log(rowData["AssignedTo"].Title);
                return rowData["AssignedTo"].Title === undefined;
              },
            },
            {
              label: 'Assigned To Me',
              value: function(rowData, rowIdx) {
                var displayName = web.get_currentUser().get_title();
                return rowData["AssignedTo"].Title === displayName && rowData["Status"] !== "Completed";
              },
            },
            {
              label: 'Completed Requests',
              value: function(rowData, rowIdx) {
                var displayName = web.get_currentUser().get_title();
                return rowData["Status"] === "Completed";
              },
            },
            /* Add more options as needed */
          ],
        }, ],
      },
      pageLength: 50,
      columnDefs: [{
          width: "0.5%",
          targets: [0],
        },
        {
          width: "0.5%",
          targets: [1],
        },
        {
          width: "2.5%",
          targets: [2],
        },
        {
          width: "5%",
          targets: [3],
        },
        {
          width: "3%",
          targets: [4],
        },
        {
          width: "1.5%",
          targets: [5],
        },
        {
          width: "2.50%",
          targets: [6],
        },
        {
          width: "0.50%",
          targets: [7],
        },
      ],
      select: {
        style: 'multi',
        selector: 'td:first-child'
      },
      aaData: data.d.results,
      aoColumns: [{
          mData: null,
          orderable: false,
          className: 'select-checkbox',
          data: null,
          defaultContent: "",
          targets: 0,
        },
        {
          mData: "ID",
          render: function(mData, type, row, meta, full) {
            var returnText = "";
            var url = _spPageContextInfo.webAbsoluteUrl + "/Lists/PurchaseRequests/EditForm.aspx?ID=" + mData;
            returnText = "<a target='_blank' href=" + url + ">" + "ESP" + mData + "</a>";
            return returnText;
          },
        },
        {
          mData: "Created",
          render: function(mData, type, row, meta) {
            const formattedDate = getDates(mData);
            if (type === "sort") {
              return mData;
            }
            const returnText = "<div>" + formattedDate + "</div>";
            return returnText;
          },
        },
        {
          mData: "Comment",
        },
        {
          mData: "Request_x0020_For",
        },
        {
          mData: "Status",
          render: function(data) {
            if (data === null) return "";
            else return "<label class='badge1 badge-" + data + "'>" + data + "</label>";
          },
        },
        {
          mData: "AssignedTo",
          render: function(mData, type, full, meta) {
            var returnText = "";
            var itemId = full.ID;
            if (mData.Title == undefined) return "<div class='fw-bold red-e3'>Unassigned</div>";
            else return mData.Title;
          },
        },
        {
          mData: null,
          orderable: false,
          render: function(mData, type, full, meta) {
            var itemId = full.ID;
            var assignedTo;
            var url = _spPageContextInfo.webAbsoluteUrl + "/Lists/PurchaseRequests/EditForm.aspx?ID=" + itemId;
            var viewDetailsButton = '<div class="col-sm"><button class="btn btn-info" onclick="viewDetails(' + itemId + ')"><i class="fa fa-eye"></i></button></div>';
            var personIcon = "<div id='takeIcon' class='col-sm'><button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#myModal' onclick='assignToMe(\"" + itemId + "\")'><i class='fa fa-user'></i></button></div>";
            var editIcon = "<div class='col-sm'><a href= " + url + ' style="text-decoration: none; color: #2e7dff;"><i class="fa-solid fa-pen-to-square"></i></a></div>';
            var trashIcon = '<div class="col-sm"><a href="#" onclick="confirmDelete(' + itemId + ');" style="text-decoration: none; color: black;"><i class="fa-solid fa-trash"></i></a></div>';

            if (full.AssignedTo.Title === undefined) {
              return viewDetailsButton + personIcon + editIcon;
            } else {
              return viewDetailsButton + editIcon;
            }
          },
        },
      ],
    });

    $('div.filters').html('<p><div class="button-container" style="display: flex; gap: 10px;"><a class="btn btn-danger filterButton" data-bs-toggle="collapse" href="#filterExample" role="button" aria-expanded="false" aria-controls="filterExample"> <i class="fa fa-filter"></i></a><div class="refresh-btn"></div></div> </p> <div class="collapse filterCollapse" id="filterExample"> <div class="card card-body filterExampleCard"> <div class="search-builder"> <div class="searchBuilderSection"></div> </div> <div class="searchPaneSection"> </div> <div class="row"> <div class="col-md-3"> </div> </div> </div> </div>');

    $('.dtsb-searchBuilder').appendTo('#filterExample .searchBuilderSection');
    $('.dtsp-panesContainer').appendTo('.searchPaneSection');

    $(".dt-buttons.btn-group.flex-wrap").addClass("col col col");
    $(".dt-buttons.btn-group.flex-wrap").each(function() {
      var $column = $(this);
      $column.append($(".delete-btn"));
      $column.append($(".buttons-collection"));
    });

    $('div.delete-btn').html('<a class="btn btn-danger" id="delete-button"><i class="fa-solid fa-trash"></i></a>');

    var refreshButton = $('<a class="btn btn-primary"><i class="fa-solid fa-arrows-rotate"></i></a>');
    $('div.refresh-btn').append(refreshButton);

    refreshButton.on('click', function() {
      $("#pDashboard").hide();
      refreshTable();
      $("#pDashboard").show();
    });

    $('#delete-button').click(function() {
      var itemIds = [];
      dataTableExample.rows('.selected').every(function() {
        var data = this.data();
        itemIds.push(data.ID);
      });

      confirmDelete(itemIds);
    });

    function confirmDelete(itemIds) {
      if (itemIds.length === 0) {
        alert("No cells selected.");
        return;
      }

      if (window.confirm("Are you sure you want to delete ('" + "Purchase Requests: " + itemIds + "') ?")) {
        var ctx = SP.ClientContext.get_current();
        var list = ctx.get_web().get_lists().getByTitle("PurchaseRequests");

        for (var i = 0; i < itemIds.length; i++) {
          var item = list.getItemById(itemIds[i]);
          item.deleteObject();
        }

        ctx.executeQueryAsync(function() {
          alert("Items deleted successfully.");
          loadListItems();
        }, function(sender, args) {
          alert("Error: " + args.get_message());
        });
      } else {}
    }

    $("#pDashboard").on('mouseenter', '.dropdown-toggle', function() {
      var rowData = dataTableExample.row($(this).parents('tr')).data();
      var formattedData = format(rowData);
      $(this).siblings('.dropdown-menu.hoverSummary').html(formattedData);
    });

  } catch (e) {
    //alert(e.message);
  }
}

function errorFunction(data, errCode, errMessage) {
  Console.log("Error: " + errMessage);
}

function numberFormat(data) {
  var s = data + "",
    a = s.split(""),
    out = "",
    iLen = s.length;

  for (var i = 0; i < iLen; i++) {
    if (i % 3 === 0 && i !== 0) {
      out = "," + out;
    }
    out = a[iLen - i - 1] + out;
  }

  return out;
}

function getListItems(siteurl, success, failure) {
  $.ajax({
    url: siteurl,
    method: "GET",
    async: false,
    headers: {
      Accept: "application/json; odata=verbose",
    },
    success: function(data) {
      success(data);
    },
    error: function(data) {
      failure(data);
    },
  });
}

function getDates(data) {
  var retDate = "";
  if (data != null) {
    var date = new Date(data);
    var month = date.getMonth() + 1;
    retDate = formatDate(date);
  }
  return retDate;
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var formattedDateTime = hours + ":" + minutes + " " + period + " " + mm + "-" + dd + "-" + yyyy;
  return formattedDateTime;
}

function assignToMe(itemId) {
  var ctx = SP.ClientContext.get_current();
  var list = ctx.get_web().get_lists().getByTitle("PurchaseRequests");
  var item = list.getItemById(itemId);
  item.set_item("AssignedTo", _spPageContextInfo.userId);
  item.set_item("Status", "In-Progress");
  item.update();

  ctx.executeQueryAsync(function() {
    console.log("Item assigned to " + _spPageContextInfo.userId);
    refreshTable();
  }, function(sender, args) {
    console.log("Error: " + args.get_message());
  });
}

function getCurrentUserDisplayName(callback) {
  var clientContext = new SP.ClientContext.get_current();
  var web = clientContext.get_web();
  var currentUser = web.get_currentUser();

  clientContext.load(currentUser);
  clientContext.executeQueryAsync(function() {
    var displayName = currentUser.get_title();
    callback(displayName);
  }, function(sender, args) {
    console.error('Error getting current user: ' + args.get_message());
  });
}

function refreshTable() {
  if ($.fn.DataTable.isDataTable("#pDashboard")) {
    $("#pDashboard").DataTable().destroy();
  }

  $("#pDashboard tbody").empty();

  loadListItems().then(function(updatedData) {
    var table = $("#pDashboard").DataTable();
    table.clear().draw();
    table.rows.add(updatedData.d.results).draw();
  });
}

function viewDetails(itemId) {
  var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PurchaseRequests')/items(" + itemId + ")";
  $.ajax({
    url: oDataUrl,
    type: "GET",
    dataType: "json",
    headers: {
      accept: "application/json;odata=verbose",
    },
    success: function(data) {
      var item = data.d;
      var formattedData = format(item);
      $("#modalContent").html(formattedData);
    },
    error: function(error) {
      console.log("Error: " + JSON.stringify(error));
    },
  });
}

function format(d) {
  return '<div class="section">' +
    '<h4><i class="fa fa-list"></i> General Information</h4>' +
    '<div class="row px-2 pb-2">' +
    '<div class="col-md-6">' +
    '<div class="quick-view-data">' +
    '<span class="requestor-name">Requestor Name:<sup>*</sup></span><span class="quick-view-data">' + d.Request_x0020_For + '</span>' +
    '</div>' +
    '<div class="quick-view-data">' +
    '<span class="email">Email:<sup>*</sup></span><span class="quick-view-data">' + d.Email + '</span>' +
    '</div>' +
    '<div class="quick-view-data">' +
    '<span class="department">Department:<sup>*</sup></span><span class="quick-view-data">' + d.Department + '</span>' +
    '</div>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<div class="quick-view-data">' +
    '<span class="dier-code">DIER Code:<sup>*</sup></span><span class="quick-view-data">' + d.DIER_x0020_Code + '</span>' +
    '</div>' +
    '<div class="quick-view-data">' +
    '<span class="project-code">Project Code:</span><span class="quick-view-data">' + d.Project_x0020_Code + '</span>' +
    '</div>' +
    '<div class="quick-view-data">' +
    '<span class="starting-manager">Starting Manager:<sup>*</sup></span><span class="quick-view-data">' + d.Comment + '</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="section">' +
    '<h4><i class="fa fa-location-arrow"></i> Shipping & Location</h4>' +
    '<div class="row px-2 pb-2">' +
    '<div class="col-md-6">' +
    '<div class="quick-view-data">' +
    '<span class="ship-to-location">Ship To:<sup>*</sup></span><span class="quick-view-data">' + d.Ship_x0020_To + '</span>' +
    '</div>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<div class="quick-view-data">' +
    '<span class="attention-to">Attention To:<sup>*</sup></span><span class="quick-view-data">' + d.Attention_x0020_To + '</span>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="section">' +
    '<h4><i class="fa fa-info"></i> Order Summary<sup>*</sup></h4>' +
    '<div class="px-2 pb-2">' +
    '<h6>Briefly provide a summary of the purpose and reason for your order.<sup>*</sup></h6>' +
    '<div class="quick-view-data"><span class="purpose-of-order"></span><span class="quick-view-data">' + d.Comment + '</span></div>' +
    '</div>' +
    '</div>' +
    '</div>';
}