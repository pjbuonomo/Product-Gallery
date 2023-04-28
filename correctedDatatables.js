dataTableExample = $('#pDashboard').DataTable({
  autoWidth: true,
  dom: 'Blfrtip',
  "pageLength": 7,
  columnDefs: [
    { "width": "0.5%", "targets": [0] },
    { "width": "0.5%", "targets": [1] },
    { "width": "1.5%", "targets": [2] },
    { "width": "5%", "targets": [3] },
    { "width": "3%", "targets": [4] },
    { "width": "3%", "targets": [5] },
    { "width": "3%", "targets": [6] },
    { "width": "1.5%", "targets": [7] }
  ],
  "aaData": data.d.results,
  "aoColumns": [
    { "className": 'details-control', "orderable": false, "data": null, "defaultContent": '' },
    { "mData": "ID", "render": function(mData, type, row, meta) {
        var returnText = "";
        var url = _spPageContextInfo.webAbsoluteUrl + "/Lists/PurchaseRequests/EditForm.aspx?ID=" + mData;
        returnText = "<a target='_blank' href=" + url + ">" + "ESP" + mData + "</a>";
        return returnText;
      }
    },
    { "mData": "Created" },
    { "mData": "Comment" },
    { "mData": "Request_x0020_For" },
    { "mData": "Status", "render": function(data) {
        if (data === null) return "";
        else return "<label class='badge1 badge-" + data + "'>" + data + "</label>"
      }
    },
    { "mData": "AssignedTo", "render": function(mData, type, full, meta) {
        var returnText = "";
        var itemId = full.ID;
        if (mData.Title == undefined)
          return "<style>#takereq { font-weight: bold; text-align: right; } </style>" + "<a id=takereq href='#' onclick=\"assignToMe('" + itemId + "')\">Take</a>";
        else
          return mData.Title;
      }
    },
    {
      "mData": null, "render": function(mData, type, full, meta) {
        var itemId = full.ID;
        var assignedTo;
        var url = _spPageContextInfo.webAbsoluteUrl + "/Lists/PurchaseRequests/EditForm.aspx?ID=" + itemId;
        var personIcon = '<a href="www.example.com" style="text-decoration: none; color: #2e7dff; margin-right: 10px;"><i class="fa fa-user"></i></a>';
        var editIcon = '<a href= ' + url + ' style="text-decoration: none; color: #8b8b8b; margin-right: 10px;"><i class="fa fa-pencil"></i></a>';
        var trashIcon = '<a href="#" onclick="confirmDelete(' + itemId + ');" style="text-decoration: none; margin-right: 10px;"><i class="fa fa-trash"></i></
        if (full.AssignedTo.Title === undefined) {
          return /*personIcon +*/ editIcon + trashIcon;
        } else {
          return editIcon + trashIcon;
        }
        //return personIcon + editIcon + trashIcon;
      }
    }
  ],
  buttons: [
  { extend: "csv", text: "Export to CSV", className: "btn btn-primary" },
  { extend: "excel", text: "Export to Excel", className: "btn btn-primary" },
  { extend: "pdf", text: "Export to PDF", className: "btn btn-primary" },
  { extend: "print", text: "Print", className: "btn btn-primary" },
  ]
  });