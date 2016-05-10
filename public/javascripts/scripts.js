var socket = io.connect('http://127.0.0.1:80');

$(document).ready(function(){
  socket.emit('getAllPlates');
  //genera_tabla();
});

socket.on('allPlates', function(data) { 
  $('table').remove();
  var content = "<table><thead><tr><th>ID</th><th>Confidence</th><th>Img</th><th>Control</th></tr></thead>"
  for(i = 0; i < data.size; i++){
      content += generateNewPlateHTML(data.plates[i]);
  }
  content += "</table>"

  $('#table-container').append(content);
  $('table').addClass('table table-striped');
  $('table').attr('id','table');
  
})

socket.on('newPlate', function(data) { 
  $('#table tr:last').after(generateNewPlateHTML(data));
})

function generateNewPlateHTML( data){
  var html = '<tr><td>' + data.id + '</td><td>' + 
      data.confidence + 
      '</td><td><img src="images/' + data.uuid + 
      '.jpg" class="img-rounded" width=160 heigth=120 alt="Cinque Terre"></td>' + 
      '<td><div style="color:#04B404">PASÓ</tr>';

      return html;
}

//document.getElementById('messages').innerHTML = html;