var socket = io.connect('http://127.0.0.1:80');

$(document).ready(function(){
  socket.emit('getAllPlates');
  //genera_tabla();
});

socket.on('allPlates', function(data) { 
  $('table').remove();
  var content = "<table><thead><tr><th>ID</th><th>Confidence</th></tr></thead>"
  for(i = 0; i < data.size; i++){
      content += '<tr><td>' +  data.plates[i].id + '</td><td>' +  data.plates[i].confidence + '</td></tr>';
  }
  content += "</table>"

  $('#table-container').append(content);
  $('table').addClass('table table-striped');
  $('table').attr('id','table');
  
})

socket.on('newPlate', function(data) { 
  $('#table tr:last').after('<tr><td>' + data.id + '</td><td>' + data.confidence + '</td></tr>');
})

//document.getElementById('messages').innerHTML = html;