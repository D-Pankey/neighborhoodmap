
/*=======MODEL========*/
var mrMap;
var markers = [];
// The following function to initializes the map
function initMap() {
  mrMap = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.7413549,
      lng: -73.99802439999996
    },
    zoom: 12
  });


  //These are the markers that will be shown to the users
  var locations = [{
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
    }


  ];


/*============View Model==========*/
var infowindow = new google.maps.InfoWindow();


// var marker, i;

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i].location),
    map: mrMap,
    animation: google.maps.Animation.DROP,
    icon: 'images/rail.png'
 });
    //Extend the boundaries of map for wach marker
   

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<div><strong>' + locations[i].title+'</strong><br>' + locations[i].address + '<br>' +'Subway:' + locations[i].subway +'</div>');
          infowindow.open(map, marker);
        }
      })(marker, i));

   //this puts the info content into each marker refer to






    // Create a marker per location, and put into markers array.
    // var marker = new google.maps.Marker({
    //   map: mrMap,
    //   position: position,
    //   title: title,
    //   animation: google.maps.Animation.DROP,
    //   icon: 'images/rail.png',
    //   id: i,
    // });
  
   //Push the marker to our array of markers.

   markers.push(marker);







   // When you click on each marker and infoWindow will open
    
    
  //this function is going to tell the infowidow to open at that marker 
  //and show info specific to that marker.  Each times a marker is clicked function is called
  //and it sets content of infor window



  }
}


// var brooklynBridge = {
//     lat: 40.706086,
//     lng: -73.996864
// // }
// var image = 'images/rail.png'
//     var markers = new google.maps.Marker({
//         position: { lat: 40.706086, lng: -73.996864},
//         map: mrMap,
//         title: 'Hello Brooklyn! Brooklyn Bridge, New York, NY 10038',
//         icon: 'images/rail.png'
//     });