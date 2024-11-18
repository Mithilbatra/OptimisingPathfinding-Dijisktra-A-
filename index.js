var map;
var index = 0;
var curr_marker = null;
var markers = [];
var paths = [];
var specialPaths = []
var adjacencyMatrix = [];
var distanceMatrix = [];
var markerList = $("#markerList");
var pathList = $("#pathList");
var startSelect = $("#startSelect");
var endSelect = $("#endSelect");

function initMap() {
	var itb = {lat: 28.816951410542046, lng: 77.13283715396899};

    map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: itb,
          styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
        }); 

	map.addListener('click', function(event) {
		addMarker(event.latLng, map)
	});
}
function getUniqueLabel() {
	return (index++);		
}

function addMarker(location, map) {

	var marker_label = getUniqueLabel();

	var marker = new google.maps.Marker({
		position: location,
		label: marker_label.toString(),
		map: map
		});
	markers.push({
		marker: marker,
		data: {
			position: marker['position'],
			label: marker_label
		}
	});

	updateMarkerList();
	updateSelect();

	marker.addListener('click', function() {
		addPath(marker);
	});
}

function removeMarkers() {
	for (var i = 0; i < markers.length; i++) {
	  markers[i]['marker'].setMap(null);
	}
	markers = [];
	index = 0;
}

function addPath(marker) {
	if (curr_marker == null) {
		curr_marker = marker;
		toggleBounce(marker);
	}
	else if (curr_marker == marker) {
		curr_marker = null;
		disableAnimation();
	}
	else {
		disableAnimation();

		if (!checkPath(curr_marker, marker)) {
			var path = new google.maps.Polyline({
	          path: [curr_marker['position'], marker['position']],
	          strokeColor: '#FF0000',
	          strokeOpacity: 1.0,
	          strokeWeight: 2
	        });
	        path.setMap(map);

	        paths.push({
	        	path: path,
	        	data: {
	        		first: curr_marker['label'],
	        		second: marker['label']
	        	}
	        });

	        updatePathList();
	    }
	    else {
	    	alert("Path already selected!");
	    }

        curr_marker = null;
	}
}


function checkPath(first, second) {
	for (var i = 0; i < paths.length; i++) {
		if (((paths[i]['data']['first'] == first['label'] && paths[i]['data']['second'] == second['label'])) ||
			((paths[i]['data']['first'] == second['label'] && paths[i]['data']['second'] == first['label']))) {
				return true;
		}
	}
	return false;
}

function removePaths() {
	for (var i = 0; i < paths.length; i++) {
		paths[i]['path'].setMap(null);
	}
  paths = [];
  curr_marker = null;
}

function addSpecialPath(first, second) {
  var path = new google.maps.Polyline({
            path: [markers[first]['data']['position'], markers[second]['data']['position']],
            strokeColor: '#2196F3',
            strokeOpacity: 1.0,
            strokeWeight: 4
          });
          path.setMap(map);

  specialPaths.push({
    path: path
  });
}

function removeSpecialPaths() {
  for (var i = 0; i < specialPaths.length; i++) {
    specialPaths[i]['path'].setMap(null);
  }
  specialPaths = [];
}

$('#resetButton').on('click', function() {
  removeMarkers();
  removePaths();
  removeSpecialPaths();
  removeMarkerList();
  removePathList();
  removeSelect();
});

$('#submitButton').on('click', function() {
  removeSpecialPaths();
  createMatrix();
  createJSON();

  $.ajax ({
    url: '/submit',
    data: createJSON(),
    type: 'POST',
    success: function(response) {
      displayOnMap(response);
      displayResult(response);
    },
    error: function(error) {
      alert("Error "+error);
    }
  });
});

function displayOnMap(result) {
  for (var i = 1; i < result.length; i++) {
    var path = paths.find(function(x) {
      return (x['data']['first'] == result[i] && x['data']['second'] == result[i-1]) || 
      (x['data']['first'] == result[i-1] && x['data']['second'] == result[i])
    });

    if (path != null) {
      addSpecialPath(result[i], result[i-1]);
    }
  }
}

function displayResult(result) {
  var text = "Shortest Path: ";
  var total_distance = 0.0;
  for (var i = 0; i < result.length; i++) {
    if (i != 0) {
      text = text.concat("- ");
      total_distance += distanceMatrix[result[i-1]][result[i]];
    }
    text = text.concat(result[i]+" ");
  }
  text = text.concat("| Total Distance: "+total_distance.toFixed(2).toString()+" m");

  $('.toastBox').text(text).fadeIn(400);
}

$('.toastBox').on('click', function() {
  $('.toastBox').fadeOut(400);
});

function getDistance(latLng_1, latLng_2) {
  return google.maps.geometry.spherical.computeDistanceBetween(latLng_1,latLng_2);
}

function createMatrix() {
  distanceMatrix = [];
  adjacencyMatrix = [];

  for (var i = 0; i < markers.length; i++) {
    var row = [];
    var row_init = [];
    for (var j = 0; j < markers.length; j++) {
      row.push(getDistance(markers[i]['data']['position'], markers[j]['data']['position']));
      row_init.push(0);
    }
    distanceMatrix.push(row);
    adjacencyMatrix.push(row_init);
  }


  for (var i = 0; i < paths.length; i++) {
    adjacencyMatrix[parseInt(paths[i]['data']['first'])][parseInt(paths[i]['data']['second'])] = 1;
    adjacencyMatrix[parseInt(paths[i]['data']['second'])][parseInt(paths[i]['data']['first'])] = 1;
  }
}

function createJSON() {
  return JSON.stringify ({
    adjacency: adjacencyMatrix,
    distance: distanceMatrix,
    start: $(startSelect).val(),
    end: $(endSelect).val()
  });
}

function toggleBounce(marker) {
	marker.setAnimation(google.maps.Animation.BOUNCE);
}

function disableAnimation() {
	for (var i = 0; i < markers.length; i++) {
		markers[i]['marker'].setAnimation(null);
	}
}

function updateSelect() {
	startSelect.empty();
	endSelect.empty();

	for (var i = 0; i < markers.length; i++) {
		$(startSelect).append($("<option></option>")
                    .attr("value", markers[i]['data']['label'])
                    .text(markers[i]['data']['label'].toString()));
		$(endSelect).append($("<option></option>")
                    .attr("value", markers[i]['data']['label'])
                    .text(markers[i]['data']['label'].toString()));
	}
}

function removeSelect() {
  startSelect.empty();
  endSelect.empty();
}

function updateMarkerList() {
	markerList.empty();
	for(var i = 0; i < markers.length; i++) {
		$( "<li>"+markers[i]['data']['label']+": ("+markers[i]['marker'].getPosition().lat().toFixed(5)+", "
			+markers[i]['marker'].getPosition().lng().toFixed(5)+")"+"</li>" ).appendTo(markerList);
	}
}

function removeMarkerList() {
  markerList.empty();
}

function updatePathList() {
	pathList.empty();
	for(var i = 0; i < paths.length; i++) {
		$( "<li>"+paths[i]['data']['first']+" <--> "+paths[i]['data']['second']+"</li>" ).appendTo(pathList);
	}
}

function removePathList() {
  pathList.empty();
}