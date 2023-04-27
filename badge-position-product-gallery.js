$(document).ready(function() { 
    var oDataUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('Products')/items?$select=Title,Price,Category,Description,ProductImage0&$orderby=Title"; 
    $.ajax({ 
      url: oDataUrl, 
      type: "GET", 
      headers: { "accept": "application/json;odata=verbose" }, 
      success: function(data) { 
        var items = data.d.results; 
        var html = ""; 
        var hasPopular = false;
        var hasSustainable = false;
        for (var i = 0; i < items.length; i++) { 
          var category = items[i].Category.results.join(" ");
          var badgeHtml = "";
          if (category.indexOf("Popular") !== -1) { // Check if category includes Popular
            badgeHtml += "<div class='hot-badge'></div>";
            hasPopular = true;
          }
          if (category.indexOf("Sustainable") !== -1) { // Check if category includes Sustainable
            badgeHtml += "<div class='sustainable-badge'></div>";
            hasSustainable = true;
          }
          html += "<div class='col-sm-6 col-md-4 col-lg-3 product-item' data-category='" + category + "' data-price='" + items[i].Price + "'>";
          html += "<div class='card mb-4'>" + badgeHtml;
          html += "<img class='card-img-top' src='" + items[i].ProductImage0.Url + "'>"; 
          html += "<div class='card-body'>"; 
          html += "<h5 class='card-title'>" + items[i].Title + "</h5>"; 
          html += "<p class='card-text card-description-text'>" + items[i].Description + "</p>"; 
          html += "<a href='' class='btn btn-danger' style='color: white;' role='button'>View Details</a>"; 
          html += "</div></div></div>"; 
        } 
        $(".product-gallery").html(html);
        if (hasPopular && hasSustainable) {
          $(".hot-badge").css("top", "20px");
          $(".sustainable-badge").css("top", "60px");
        } else {
          $(".hot-badge, .sustainable-badge").css("top", "20px");
        }
      }, 
      error: function(error) { 
        console.log(JSON.stringify(error)); 
      } 
    }); 
  });
  