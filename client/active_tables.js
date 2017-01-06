Template.active_tables.helpers({
  activeTables:function(userId){
    var tables;
    if(!Session.get(tables)){
      tables  = Tables.find({active:true}).fetch();
      Session.set("active_tables", tables); 
    }        
    return Session.get("active_tables");
  },

  numberOfPlayers: function(tableId){
    var table = Tables.findOne({_id:tableId}); 
    return table.players.length; 
  },

  numberOfHands: function(tableId){
    //console.log("number of hands");
    //console.log(tableId);  
    var plates = Plates.find({table:tableId}).fetch(); 
    //console.log(plates); 
    return plates.length; 
  },

  players_names: function(tableId){
    var table = Tables.findOne({_id:tableId}); 
    var result = "";
    for  (var i=0; i<table.players.length; i++){

      var user = Meteor.users.findOne({_id: table.players[i]});
      var username = user.profile.username;

      result += username + " ";
    }
    return result;  
  },

  players: function(tableId){
    var table = Tables.findOne({_id:tableId}); 
    var players = [];
    for  (var i=0; i<table.players.length; i++){
      var user = Meteor.users.findOne({_id: table.players[i]});
      players.push(user); 
    }
    //console.log(players); 
    return players;  
  },

  getDate: function(tableDate){
    var time = tableDate.toLocaleTimeString().toLowerCase();
    var day = $.datepicker.formatDate("dd/mm/yy", tableDate); 
    return  day + " " + time;
  }
});