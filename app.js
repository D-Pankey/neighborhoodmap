

var map;

//Locations that automatically show on map 
var locations =[
    {
      title: 'Brooklyn Bridge',
      location: {
        lat: 40.7713024,
        lng: -73.9632393
      } },

    {
      title: 'Central Park',
      location: {
        lat: 40.785091,
        lng: -73.968285
      } },

    {
      title: 'Madison Square Garden',
      location: {
        lat: 40.750298,
        lng: -73.993324
      }},

    {
      title: 'Broadway Theater',
      location: {
        lat: 40.753496986,
        lng: -73.985162726
      } },

    {
      title: 'The American Museum of Natural History ',
      location: {
        lat: 40.7813241,
        lng: -73.9739882
      }}];

//Alerts User that there was an error loading map
function maperror() {
    alert("There is a problem with Google Maps. Please reload page");
}
//Get Map to show up on page
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.7413549,
      lng: -73.99802439999996
    },
    zoom: 12
  });


 // An Info Window is created 
 var infowindow = new google.maps.InfoWindow();

 

 // The following group uses the location array to create an array of markers on initialize.
  locations.forEach(function(location,i) {
    // Get the position from the location array.
    this.position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      map: map,
      animation: google.maps.Animation.DROP,
      id: i,
      icon: 'images/rail.png'
    });
   
    locations[i].marker = marker;
    

    // This function populates the infowindow when the marker is clicked. 
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
    //foursquare api variables
var client_id = 'WNHYGVIHUYC25AUSWKYUP0EMCC4OSNTQMR5UYOJ51THYFXAB';
var client_secret = '1ZBNGSRKILX2G5T5VVHWOE1YSWVLUOPFKHX11UH5OQWMLKFO';


var fourSquareUrl = 'https://api.foursquare.com/v2/venues/search?ll=' + self.position.lat + ',' + self.position.lng + '&query=' + marker.title+'&client_id=WNHYGVIHUYC25AUSWKYUP0EMCC4OSNTQMR5UYOJ51THYFXAB&client_secret=1ZBNGSRKILX2G5T5VVHWOE1YSWVLUOPFKHX11UH5OQWMLKFO&v=20170824';
//Get JSON request to get data from FourSquare



        $.getJSON(fourSquareUrl).done(function(data) {
            console.log(data);
        var results = data.response.venues["0"];
        //Get title from foursquare
       
        this.zip=results.location.postalCode;
        this.address=results.location.formattedAddress;
        // console.log(this.zip);
          infowindow.setContent('<div><strong>' + locations[i].title +'<div>'+this.address+'</div>'+'</strong></div>');

    }).fail(function() {
        console.log(self.position);
        alert("There was an error with the Foursquare API call. Please refresh the page and try again to load Foursquare data.");
    });
        


          infowindow.open(map, marker);
          // sets animation to bounce 2 times when marker is clicked
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null);
                    }, 2130);

        };
      })(marker, i));

 
  });


 
 ko.applyBindings(new ViewModel())
};

var Loc = function(data) {
  this.title = data.title;
  this.location = data.location;
  this.marker = data.marker;
  
};

var ViewModel = function() {
  var self = this;


//filter the location
  self.listLoc = ko.observableArray();

  locations.forEach(function(locItem) {
    self.listLoc.push(new Loc(locItem))
  });

  self.filter = ko.observable('');

  self.filteredItems = ko.computed(function() {
    var filter = self.filter().toLowerCase();
    if (!filter) {
      ko.utils.arrayForEach(self.listLoc(), function (item) {
        item.marker.setVisible(true);
      });
      return self.listLoc();
    } else {
      return ko.utils.arrayFilter(self.listLoc(), function(item) {
    
     // set all markers visible (false)
        var result = (item.title.toLowerCase().search(filter) >= 0)
        item.marker.setVisible(result);
        return result;
      });
    }
  });
//Clicking a location on the list animates its associated map marker
  self.setLoc = function(clickedLoc) {
    console.log(clickedLoc)
//triggers Infowindow to open when item on list is clicked
    google.maps.event.trigger(clickedLoc.marker, 'click')
    clickedLoc.marker.setAnimation(google.maps.Animation.BOUNCE);
         setTimeout(function() {
        clickedLoc.marker.setAnimation(null);
      }, 2000);
  };
 
}
