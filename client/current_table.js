Template.current_table.helpers({
  activeTable: function(){
    return Session.get("tableId"); 
  },

  /*users:function(){
    return Meteor.users.find();
  },*/

  players: function(){

    var players = []; 
    if (!Session.get("players")){

      var tableId = Session.get("tableId"); 
      var table = Tables.findOne({_id:tableId});
      var usersId = table.players; 

      var users = Meteor.users.find( {"_id": { "$in": usersId }}).fetch();
   

      //console.log(users); 
      var plates = Plates.find({table: tableId}).fetch();
      //console.log(plates); 
      
players = getPlayersWithPoints(users, plates);


      /*for (var i = 0; i<users.length; i++){
        // console.log('user:' + i); 
        var points = 0; 
        var player = users[i];

        for(var j=0; j<plates.length; j++){
          // console.log('plate:' + j); 
          for(var k=0; k<plates[j].winners.length; k++){
            // console.log('winner:' + k); 
            //points++; 
            if(plates[j].winners[k].user != null && plates[j].winners[k].user != undefined){
              if(plates[j].winners[k].user._id == player._id){
                points++; 
              }
            }            
          }
        }
        player.points = points; 
        players.push(player); 
      }*/
      console.log(players); 

    } else {
      players = Session.get("players"); 
    }
    return players; 
  }
});


Template.current_table.events({

  "click .js-close-table": function () {

    /*console.log(this); 
    alert("close table"); */
    //console.log("current_table IN"); 
    var tableId = Session.get("tableId"); 
    var table = Tables.findOne({_id:tableId});
    table.state = "closed"; 
    Meteor.call("updateTable", table);
    Session.set("current_table", table); 
    //console.log("current_table OUT"); 
    Router.go('/active_tables');
  }
});