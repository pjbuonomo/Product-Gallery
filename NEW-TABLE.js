$("#grid").jqGrid({
  url: oDataUrl,
  datatype: "json",
  colModel: [
    { name: "ID", width: 50 },
    { name: "Created", width: 100 },
    { name: "Request_x0020_For", width: 150 },
    { name: "Status", width: 100 },
    { name: "AssignedTo.Title", width: 150 }
  ],
  pager: "#pager",
  rowNum: 10,
  rowList: [10, 20, 30],
  sortname: "ID",
  sortorder: "asc",
  viewrecords: true,
  gridview: true,
  autoencode: true,
  height: "auto",
  caption: "Purchase Requests",
  loadonce: true, // Set to true if you want to load all data at once
  autowidth: true, // Adjusts the grid width automatically
  jsonReader: {
    repeatitems: false,
    root: "d.results",
    page: function (obj) { return 1; },
    total: function (obj) { return 1; },
    records: function (obj) { return obj.d.results.length; }
  },
  beforeProcessing: function (data) {
    // Optional: Pre-process the data before displaying it in the grid
  },
  onSelectRow: function (id) {
    // Optional: Handle row selection events
  }
});
