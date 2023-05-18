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
    try { 
        var dataTableExample = $("#pDashboard").DataTable(); 
        
        if (dataTableExample != "undefined") { 
            dataTableExample.destroy(); 
        } 

        dataTableExample = $("#pDashboard").DataTable({ 
            order: [[1, 'desc']], 
            autoWidth: true, 
            dom: 'QBlfrtipP', 
            pageLength: 10, 
            columnDefs: [ 
                { orderable: false, className: 'select-checkbox', targets: 0 },
                { width: "3.5%", targets: [1], },
                { width: "5.0%", targets: [2], },
                { width: "5%", targets: [3], },
                { width: "3%", targets: [4], },
                { width: "2.5%", targets: [5], },
                { width: "0.50%", targets: [6], },
            ], 
            aaData: data.d.results,
            select: {
                style:    'os',
                selector: 'td:first-child'
            },
            searchPanes: {
                panes: [
                    {
                        header: 'Status',
                        options: [
                            {label: 'Option 1', value: function(rowData, rowIdx) { return rowData.Status === 'Option 1'; }},
                            {label: 'Option 2', value: function(rowData, rowIdx) { return rowData.Status === 'Option 2'; }},
                        ]
                    },
                    {
                        header: 'Assigned To',
                        options: [
                            {label: 'Option 1', value: function(rowData, rowIdx) { return rowData.AssignedTo === 'Option 1'; }},
                            {label: 'Option 2', value: function(rowData, rowIdx) { return rowData.AssignedTo === 'Option 2'; }},
                        ]
                    }
                ]
            },
            scrollY: '50vh',
            scrollCollapse: true,
            scroller: true,
            // Add your aoColumns here.
        });

        // Add the Date Range Filter.
        $('input[name="daterange"]').daterangepicker({
            opens: 'left'
        }, function(start, end, label) {
           
            // Function to handle date range selection
            dataTableExample.draw();
        });
        
        // Redraw the table according to the date range filter
        $.fn.dataTable.ext.search.push(
            function(settings, data, dataIndex) {
                var min = Date.parse($('input[name="daterange"]').data('daterangepicker').startDate.format('YYYY-MM-DD'));
                var max = Date.parse($('input[name="daterange"]').data('daterangepicker').endDate.format('YYYY-MM-DD'));
                var createdAt = Date.parse(data.Created); // Using the "Created" field
                
                if ((isNaN(min) && isNaN(max)) || (isNaN(min) && createdAt <= max) || (min <= createdAt && isNaN(max)) || (min <= createdAt && createdAt <= max)) {
                    return true;
                }
                return false;
            }
        );

        // Custom one for future use
        // dataTableExample.column(0).searchPanes.container().append('<button>Custom Button</button>');

        // End of try block
    } catch (e) { 
        //alert(e.message); 
    } 
}


{ mData: null, defaultContent: '' },