var fs = require( "fs" );
eval(fs.readFileSync('./backend/LinkedList.js')+'');


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
    }
}