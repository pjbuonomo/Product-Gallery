var dataTable;

function loadListItems() {
    var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('PurchaseRequests')/items?$select=ID,Created,Modified,Title,DIER_x0020_Code,Project_x0020_Code,TestIDField,Approver,Department,Ship_x0020_To,Attention_x0020_To,Request_x0020_For,Status,Comment,Item_x0020_Details,Item_x0020_Details,Created,Modified,AssignedTo/Title&$expand=AssignedTo"; 
    console.log(_spPageContextInfo); 

    $.ajax({ 
        url: oDataUrl, 
        type: "GET", 
        dataType: "json", 
        headers: { 
            accept: "application/json;odata=verbose", 
        }, 
        success: successFunction, 
        error: errorFunction, 
    }); 
}

function successFunction(data) {
    var listItems = data.d.results;
    populateDataTable(listItems);
}

function errorFunction(data, errorCode, errorMessage) {
    console.log(errorMessage);
}

function populateDataTable(listItems) {
    dataTable = $('#myTable').DataTable({
        dom: 'Blfrtip',
        data: listItems,
        select: {
            style:    'os',
            selector: 'td:first-child'
        },
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print',
            {
                text: 'Custom Button',
                action: function ( e, dt, node, config ) {
                    alert('Custom Button Clicked!');
                }
            }
        ],
        columns: [
            { 
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },
            { data: "ID" },
            { data: "Created" },
            { data: "Comment" },
            { data: "Request_x0020_For" },
            { data: "Status" },
            { data: "AssignedTo.Title", defaultContent: "" }
        ],
        order: [[ 1, 'asc' ]],
        searchPanes: {},
        searchBuilder: {},
        scrollY: '50vh',
        scrollCollapse: true,
        paging: true,
        pageLength: 30,
        deferRender: true
    });

    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            var min = $('#min').datepicker("getDate");
            var max = $('#max').datepicker("getDate");
            var createdAt = new Date(data[2] || 0); 

            if ((isNaN(min) && isNaN(max)) ||
                (isNaN(min) && createdAt <= max) ||
                (min <= createdAt && isNaN(max)) ||
                (min <= createdAt && createdAt <= max)) {
                return true;
            }
            return false;
        }
    );
    
    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').datepicker({ format: 'mm/dd/yyyy',}).on('changeDate', function() {
        dataTable.draw();
    });
}

















