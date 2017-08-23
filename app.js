var locations =[
    {
      title: 'Brooklyn Bridge',
      location: {
        lat: 40.7713024,
        lng: -73.9632393
      },
      address:'Bridge St, Brooklyn, NY 11201',
      subway:'4,5,6'

    },

    {
      title: 'Central Park',
      location: {
        lat: 40.785091,
        lng: -73.968285
      },
      address:'59th Street and 5th Ave, NY, NY 10020',
      subway: 'A, B, C, D, 1'

    },

    {
      title: 'Madison Square Garden',
      location: {
        lat: 40.750298,
        lng: -73.993324
      },
      address: '4 Pennsylvania Plaza, NY, NY ',
      subway: 'A, C, E, 1, 2, 3'
    },

    {
      title: 'Broadway Theater',
      location: {
        lat: 40.753496986,
        lng: -73.985162726
      },
      address:'1681 Broadway NY, NY 10019',
      subway:'B, D, E'

    },

    {
      title: 'The American Museum of Natural History ',
      location: {
        lat: 40.7813241,
        lng: -73.9739882
      },
      address:'Central Park West at 79th Street NY,NY 10024',
      subway:'A, B, C'

    }];


function initMap() {
  mrMap = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.7413549,
      lng: -73.99802439999996
    },
    zoom: 12
  });
 
 var infowindow = new google.maps.InfoWindow();

 
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      position: position,
      title: title,
      map: mrMap,
      animation: google.maps.Animation.DROP,
      id: i,
      icon: 'images/rail.png'
    });
    locations[i].marker = marker;
    
     google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<div><strong>' + locations[i].title+'</strong><br>' + locations[i].address + '<br>' +'Subway:' + locations[i].subway +'</div>');
          infowindow.open(map, marker);
        };
      })(marker, i));

  };

 
 
 ko.applyBindings(new ViewModel())
};

var Loc = function(data) {
  this.title = data.title;
  this.location = data.location;
  this.marker = data.marker;
};

var ViewModel = function() {
  var self = this;

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

  self.setLoc = function(clickedLoc) {
    clickedLoc.marker.setAnimation(google.maps.Animation.BOUNCE);
  };
}