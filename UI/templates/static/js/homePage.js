function logout(){
  window.location.href = "/logout"
}

function getLocations(){
    $.ajax({
      type: "POST",
      url: "/getLocation",
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
      // $("#hotelSearchResults").empty();
        // alert(JSON.stringify(data));
        // console.log(data)
        var data = data.location;
        stringToAppend = "";
        for (var i = 0; i < data.length; i++){
          stringToAppend+= "<option>"+data[i].City+"</option>";
        }
        // alert(stringToAppend);
        $("#From").append(stringToAppend);
        $("#To").append(stringToAppend);

        $("#location").append(stringToAppend);

    });

}

function hotelsMetaLoad(){
  getLocations();

  //Loading room Type
  $.ajax({
      type: "POST",
      url: "/getRoomType",
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
        var data = data.roomList;
        stringToAppend = "";
        for (var i = 0; i < data.length; i++){
          stringToAppend+= "<option>"+data[i].Accommodation_Type+"</option>";
        }
        // alert(stringToAppend);
        $("#accommodationType").append(stringToAppend);

    });

}

function searchFlights(){
  var flightFrom = $("#From").find(":selected").text();
  var flightTo = $("#To").find(":selected").text();
  var flightLeavingDate = $("#flightLeavingDate").val().toString();
  var flightClass = $("#flightClass").find(":selected").text();
  var flightPassengers = $("#flightPassengers").val();
  // alert(flightFrom + " " + flightTo+ " " + flightLeavingDate + " " + flightClass+ " "+ flightPassengers);
  var checkoutInfo = 
  {
    "resource":"flight",
    "flightFrom":flightFrom, 
    "flightTo":flightTo,
    "flightLeavingDate":flightLeavingDate,
    "flightClass":flightClass,
    "flightPassengers":flightPassengers
  };

  // alert(JSON.stringify(checkoutInfo));
  $.ajax({
      type: "POST",
      url: "/searchFlights",
      data: JSON.stringify(checkoutInfo),
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
      $("#flightSearchResults").empty();
        // alert(JSON.stringify(data));
      // console.log(data);
        var data = data.flightDetails;
        stringToAppend = "";
        for (var i = 0; i < data.length; i++){
          stringToAppend = 
            `<div class="card" style="width: 18rem;">
              <div class="card-body">
                  <div class="cardBodyFlight">` + data[i].Flight_Carrier +`</div>
                  <div class="cardBodyDeparture">TBD</div>
                  <div class="cardBodyPrice">$`+ data[i].Fare +`</div>
              </div>
            </div>`
        }

        $("#flightSearchResults").append(stringToAppend);
    });
 

}

function searchCruises(){
  // alert("TEST");
  var cruiseFrom = $("#From").find(":selected").text();
  var cruiseTo = $("#To").find(":selected").text();
  var cruiseLeavingDate = $("#cruiseLeavingDate").val().toString();
  var cruisePassengers = $("#cruisePassengers").val();
  // alert(cruiseFrom + " " + cruiseTo+ " " + cruiseLeavingDate + " "+ cruisePassengers);
  var checkoutInfo = 
  {
    "resource":"cruise",
    "cruiseFrom":cruiseFrom, 
    "cruiseTo":cruiseTo,
    "cruiseLeavingDate":cruiseLeavingDate,
    "cruisePassengers":cruisePassengers
  };

  // alert(JSON.stringify(checkoutInfo));
  $.ajax({
      type: "POST",
      url: "/searchCruises",
      data: JSON.stringify(checkoutInfo),
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
        // alert(JSON.stringify(data));
        $("#cruiseSearchResults").empty();
        var data = $.parseJSON(JSON.stringify(data)).cruiseDetails;
        stringToAppend = "";
        // {"cruiseDetails": [{"CruiseID": 9, "Cruise_Name": "Caribbean Princess", "Schedule_Date": "2018-03-31", "Src_Location": 1, "Dst_Location": 4, "Fare": 700.0}]}
        for (var i = 0; i < data.length; i++){
          stringToAppend = 
            `<div class="card" style="width: 18rem;">
              <div class="card-body">
                  <div class="cardBodyFlight">` + data[i].Cruise_Name +`</div>
                  <div class="cardBodyDeparture">` + data[i].Schedule_Date +`</div>
                  <div class="cardBodyPrice">$`+ data[i].Fare +`</div>
              </div>
            </div>`
        }
        // alert(data)

        $("#cruiseSearchResults").append(stringToAppend);
    });
 

}

function carMetaData(){
    $.ajax({
      type: "POST",
      url: "/getCarData",
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
      $("#carSearchResults").empty();
        var data1 = data.carCompany;
        var data2 = data.carType;
        stringToAppend1 = "";
        stringToAppend2 = "";
        for (var i = 0; i < data1.length; i++){
          stringToAppend1+= "<option>"+data1[i].Car_Company+"</option>";

        }
        for (var i = 0; i < data2.length; i++){
          stringToAppend2+= "<option>"+data2[i].Car_Type+"</option>";

        }

        $("#carCompany").append(stringToAppend1);
        $("#carType").append(stringToAppend2);

    });

}

function searchCars(){
  var carCompany = $("#carCompany").find(":selected").text();
  var carType = $("#carType").find(":selected").text();
  // alert(flightFrom + " " + flightTo+ " " + flightLeavingDate + " " + flightClass+ " "+ flightPassengers);
  var checkoutInfo = 
  {
    "resource":"car",
    "carType":carType, 
    "carCompany":carCompany
  };

  // alert(JSON.stringify(checkoutInfo));
  $.ajax({
      type: "POST",
      url: "/searchCars",
      data: JSON.stringify(checkoutInfo),
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
      $("#carSearchResults").empty();
        var data = $.parseJSON(JSON.stringify(data)).carDetails;
        stringToAppend = "";
        for (var i = 0; i < data.length; i++){
          // alert(data[i].Car_Company + " " + data[i].Car_Type + " " + data[i].Rent);
          stringToAppend = 
            `<div class="card" style="width: 18rem;">
              <div class="card-body">
                  <div class="cardBodyFlight">` + data[i].Car_Company +`</div>
                  <div class="cardBodyDeparture">` + data[i].Car_Type +`</div>
                  <div class="cardBodyPrice">$`+ data[i].Rent +`</div>
              </div>
            </div>`
        }

        $("#carSearchResults").append(stringToAppend);
    });
 

}

function searchHotels(){
  var guests = $("#guests").val();
  var location = $("#location").find(":selected").text();
  var accommodationType = $("#accommodationType").find(":selected").text();
  // alert(flightFrom + " " + flightTo+ " " + flightLeavingDate + " " + flightClass+ " "+ flightPassengers);
  // alert(accommodationType + " " + location + " " + guests)
  var checkoutInfo = 
  {
    "resource":"hotel",
    "guests":guests, 
    "location":location,
    "accommodationType":accommodationType
  };

  // alert(JSON.stringify(checkoutInfo));
  $.ajax({
      type: "POST",
      url: "/searchHotels",
      data: JSON.stringify(checkoutInfo),
      dataType: "json",
      contentType : "application/json"
    }).done(function (data, textStatus, jqXHR) {
      $("#hotelSearchResults").empty();
        // alert(JSON.stringify(data));
        var data = $.parseJSON(JSON.stringify(data)).hotelDetails;
        stringToAppend = "";
        for (var i = 0; i < data.length; i++){
          // alert(data[i].Car_Company + " " + data[i].Car_Type + " " + data[i].Rent);
          stringToAppend = 
            `<div class="card" style="width: 18rem;">
              <div class="card-body">
                  <div class="cardBodyFlight">` + data[i].Facilities +`</div>
                  <div class="cardBodyDeparture">` + data[i].Size +`</div>
                  <div class="cardBodyPrice">$`+ data[i].Rate +`</div>
              </div>
            </div>`
        }

        $("#hotelSearchResults").append(stringToAppend);
    });
}

function redirectTo(id){
  // alert(id);
  if (id === "cruise"){window.location.href = "/cruises"};
  if (id === "flight"){window.location.href = "/home"};
  if (id === "hotel"){window.location.href = "/hotels"};
  if (id === "car"){window.location.href = "/cars"};

}


