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
