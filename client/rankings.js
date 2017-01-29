
Template.rankings.helpers({
 /* plates:function(){
    var plates = Plates.find({"active":true}).fetch();
    return plates; 
  },*/

  rankings:function(){

  	var users = Meteor.users.find().fetch();

  	var tables = Tables.find({"active":true}).fetch();
  	var tablesId = [];
  	console.log("numero tavoli attivi:" + tables.length);
  	for(var i=0; i<tables.length; i++){
  		tablesId.push(tables[i]._id);
  	}
    var plates = Plates.find({"table": { "$in": tablesId }}).fetch();

    var players = [];
    for (var i=0; i<users.length; i++){
    	//calcolo delle mani giocate per ogni giocatore
    	var player = users[i];
    	var userHands = 0; 
    	var userPoints = 0; 
    	for (var tabj=0; tabj<tables.length; tabj++){
    		var bIsUserInTable = isUserInTable(users[i]._id,tables[tabj]); 
	    		
	    	for (var platek=0; platek < plates.length; platek++){
	    		//se il giocatore è nel tavolo e la mano appartiene al tavolo
	    		if (bIsUserInTable && (plates[platek].table == tables[tabj]._id)){
	    			userHands++;
	    		}

	    		if (bIsUserInTable && (plates[platek].table == tables[tabj]._id)){
	    			userPoints = userPoints + getPointInHand(users[i]._id,plates[platek]);
	    		}
	    	}	
    	}
    	player.userHands = userHands; 
    	player.userPoints = userPoints; 
    	player.userMean = userHands?parseFloat((userPoints/userHands)).toFixed(2):0; 
    	players.push(player); 

    }

    console.log(JSON.stringify(players));

  	var result = {
  		players: players,
  		n_players: players.length,
  		hands: plates,
  		n_hands: plates.length
  	}

  	

    return result;
  }
 
});


isUserInTable = function(userId,table){
	var players = table.players;
	for(var i=0; i< players.length; i++){
		if(players[i] == userId){
			return true; 
		}
	}
	return false;
}




