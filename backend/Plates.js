var fs = require( "fs" );
eval(fs.readFileSync('./backend/LinkedList.js')+'');
var json2csv = require('json2csv');


//list of string
var ops = new List();

var gettingIndex = 1;
var alreadySended = 0;

module.exports = {
    add:function(newElem){
        ops.add(newElem);
    },

    getNext:function(){
        var toR = ops.get(gettingIndex);
        gettingIndex++;
        return toR;
    },

    hasNext:function(){
        return gettingIndex <= ops.size();
    },

    isEmpty:function(){
        return ops.size() == 0;
    },

    lastCoord:function(){
        return (gettingIndex == ops.size());
    },

    toString:function(){
        var toR = "";
        for(var i = 0; i < ops.size(); i++){
            toR += ops.get( i + 1);
            toR += ";";
        }
        return toR;
    },

    getLast:function(){
        if(ops.size() > 0){
            return ops.get(ops.size());
        }
        return {'id' : 'null'};
    },

    toJSON:function(){
        var json = {
            "size" : "" + ops.size(),
            "alreadySended" : "" + alreadySended,
            "plates" : []
        }
        for(var i = 0; i < ops.size(); i++){
            json.plates.push(ops.get( i + 1));
            alreadySended++;
        } 
        return json;
    },

    generateCSV:function(){
        var fields = ['id', 'confidence'];
        var myPlates = [];
        for(var i = 0; i < ops.size(); i++){
            myPlates.push(ops.get( i + 1));
        } 

        json2csv({ data: myPlates, fields: fields }, function(err, csv) {
            if (err) console.log(err);
            fs.writeFile('file' + Math.random() + '.csv', csv, function(err) {
                if (err) throw err;
                console.log('file saved');
            });
        });
    }
}