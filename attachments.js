<div id="customAttachments"></div>
function getItemDetails(listId, listItemId) {
    var clientContext = new SP.ClientContext.get_current();
    var list = clientContext.get_web().get_lists().getById(listId);
    var listItem = list.getItemById(listItemId);
    clientContext.load(listItem, 'AttachmentFiles'); // Add 'AttachmentFiles' here
    clientContext.executeQueryAsync(function() {
        var attachmentsX = listItem.get_item("Attachments");
        console.log(attachmentsX);

        // Add the following code to display the attachment files
        var attachments = listItem.get_attachmentFiles();
        var attachmentsHtml = "";
        for (var i = 0; i < attachments.get_count(); i++) {
            var attachment = attachments.getItemAtIndex(i);
            attachmentsHtml += '<a href="' + attachment.get_serverRelativeUrl() + '" target="_blank">' + attachment.get_fileName() + '</a><br>';
        }
        document.getElementById("customAttachments").innerHTML = attachmentsHtml;
        // End of new code

    }, function(sender, args) {
        console.error("Error: " + args.get_message());
    });
}



function displayAttachments(listId, listItemId) {
    var requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items(" + listItemId + ")/AttachmentFiles";
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function(data) {
            var attachmentsHtml = "";
            for (var i = 0; i < data.d.results.length; i++) {
                var attachment = data.d.results[i];
                attachmentsHtml += '<a href="' + attachment.ServerRelativeUrl + '" target="_blank">' + attachment.FileName + '</a><br>';
            }
            document.getElementById("customAttachments").innerHTML = attachmentsHtml;
        },
        error: function(sender, args) {
            console.error("Error: " + args.get_message());
        }
    });
}


function displayAttachments(listId, listItemId) {
    var requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items(" + listItemId + ")/AttachmentFiles";
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function(data) {
            var attachmentsHtml = "";
            for (var i = 0; i < data.d.results.length; i++) {
                var attachment = data.d.results[i];
                attachmentsHtml += '<a href="' + attachment.ServerRelativeUrl + '" target="_blank">' + attachment.FileName + '</a><br>';
            }
            document.getElementById("customAttachments").innerHTML = attachmentsHtml;
        },
        error: function(xhr, status, error) {
            console.error("Error: " + xhr.status + " - " + xhr.statusText);
        }
    });
}



function displayAttachments(listId, listItemId) {
    var requestUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists(guid'" + listId.replace("{", "").replace("}", "") + "')/items(" + listItemId + ")/AttachmentFiles";
    $.ajax({
        url: requestUrl,
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function(data) {
            var attachmentsHtml = "";
            for (var i = 0; i < data.d.results.length; i++) {
                var attachment = data.d.results[i];
                attachmentsHtml += '<a href="' + attachment.ServerRelativeUrl + '" target="_blank">' + attachment.FileName + '</a><br>';
            }
            document.getElementById("customAttachments").innerHTML = attachmentsHtml;
        },
        error: function(xhr, status, error) {
            console.error("Error: " + xhr.status + " - " + xhr.statusText);
        }
    });
}










<div id="pdfSidebar" style="width: 20%; float: left; border-right: 1px solid #ccc; padding: 10px;"></div>
<iframe id="pdfViewer" style="width: 80%; height: 500px; float: left; border: none;"></iframe>


function displayAttachments(listId, listItemId) {
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists(guid'" + listId + "')/items(" + listItemId + ")/AttachmentFiles",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
        },
        success: function (data) {
            var attachmentsContainer = $("#pdfSidebar");
            attachmentsContainer.empty();

            if (data.d.results.length > 0) {
                data.d.results.forEach(function (attachment) {
                    var attachmentName = attachment.FileName;
                    var attachmentUrl = attachment.ServerRelativeUrl;

                    var attachmentLink = $('<a href="#" class="attachment-link">' + attachmentName + '</a><br>');
                    attachmentLink.click(function (event) {
                        event.preventDefault();
                        $("#pdfViewer").attr("src", attachmentUrl);
                    });

                    attachmentsContainer.append(attachmentLink);
                });

                // Load the first attachment in the iframe
                $("#pdfViewer").attr("src", data.d.results[0].ServerRelativeUrl);
            } else {
                attachmentsContainer.append("<p>No attachments found</p>");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("Error: " + xhr.responseText);
        }
    });
}

$(document).ready(function() {
    displayAttachments(listId, listItemId);
});
