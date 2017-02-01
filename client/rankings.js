
Template.rankings.helpers({
 /* plates:function(){
    var plates = Plates.find({"active":true}).fetch();
    return plates; 
  },*/

  settings: function () {
        return {
            /*collection: collection,*/
            rowsPerPage: 12,
            showFilter: true,
            fields: ['giocatore', 'mani', 'punti','MVP','MVPP','MVPT']
        };
    },

  rankings:function(){



  	var users = Meteor.users.find().fetch();

  	var tables = Tables.find({"active":true}).fetch();
  	var tablesId = [];
  	console.log("numero tavoli attivi:" + tables.length);
  	for(var i=0; i<tables.length; i++){
  		tablesId.push(tables[i]._id);
  	}
    var plates = Plates.find({"table": { "$in": tablesId }}).fetch();

    var tablePlayers = [];
    var players = [];
    for (var i=0; i<users.length; i++){
    	//calcolo delle mani giocate per ogni giocatore
    	var player = users[i];
    	var userHands = 0; 
    	var userPoints = 0; 
      var userTelesinaHands = 0; 
      var userTelesinaPoints = 0; 
      var userPokerHands = 0; 
      var userPokerPoints = 0; 

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

          //Calcolo punti telesina
          if (bIsUserInTable && (plates[platek].type==2) && (plates[platek].table == tables[tabj]._id)){
            userTelesinaHands++;
          }

          if (bIsUserInTable && (plates[platek].type==2) && (plates[platek].table == tables[tabj]._id)){
            userTelesinaPoints = userTelesinaPoints + getPointInHand(users[i]._id,plates[platek]);
          }

          //Calcolo punti poker
          if (bIsUserInTable && (plates[platek].type!=2) && (plates[platek].table == tables[tabj]._id)){
            userPokerHands++;
          }

          if (bIsUserInTable && (plates[platek].type!=2) && (plates[platek].table == tables[tabj]._id)){
            userPokerPoints = userPokerPoints + getPointInHand(users[i]._id,plates[platek]);
          }
	    	}	
    	}

    	player.userHands = userHands; 
    	player.userPoints = userPoints; 

      player.userTelesinaHands = userTelesinaHands; 
      player.userTelesinaPoints = userTelesinaPoints; 

      player.userPokerHands = userPokerHands; 
      player.userPokerPoints = userPokerPoints; 

    	player.userMean = userHands?parseFloat((userPoints/userHands)).toFixed(2):0; 
      player.userTelesinaMean = userTelesinaHands?parseFloat((userTelesinaPoints/userTelesinaHands)).toFixed(2):0; 
      player.userPokerMean = userPokerHands?parseFloat((userPokerPoints/userPokerHands)).toFixed(2):0; 
      
    	players.push(player); 

      /*var tablePlayer = {
        username:player.profile.username,
        userHands : player.userHands, 
        userPoints :player.userPoints, 
        userMean : player.userMean,
        userPokerMean : player.userPokerMean, 
        userTelesinaMean :player.userTelesinaMean 
      }*/

      var tablePlayer = {
        user:(player.profile.username.length > 8)?player.profile.username.substr(0,8):player.profile.username,
        mani : player.userHands, 
        punti :player.userPoints, 
        MVP : player.userMean,
        MVPP : player.userPokerMean, 
        MVPT :player.userTelesinaMean 
      }
      
      


      tablePlayers.push(tablePlayer); 
    }

    //console.log(JSON.stringify(players));

  	var result = {
      tablePlayers: tablePlayers,
  		players: players,
  		n_players: players.length,
  		hands: plates,
  		n_hands: plates.length
  	}

    console.log(JSON.stringify(tablePlayers)); 
    refreshTable(null,tablePlayers);

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




