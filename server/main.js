 Meteor.startup(function () {
    if (!Meteor.users.findOne()){
      for (var i=1;i<9;i++){
        var email = "user"+i+"@test.com";
        var username = "user"+i;
        var avatar = "ava"+i+".png"
        console.log("creating a user with password 'test123' and username/ email: "+email);
        Meteor.users.insert({profile:{username:username, avatar:avatar}, emails:[{address:email}],services:{ password:{"bcrypt" : "$2a$10$I3erQ084OiyILTv8ybtQ4ON6wusgPbMZ6.P33zzSDei.BbDL.Q4EO"}}});
      }


      var players =  Meteor.users.find( {"profile.username": { "$in": ["user1","user2","user3","user4"] }}).fetch();

      var arrPlayers = [];
      for(var i=0; i<players.length; i++){
          arrPlayers.push(players[i]._id); 
      }

      console.log("arrPlayers: " +  JSON.stringify(arrPlayers)); 

      if(!Tables.findOne()){
        Tables.insert({
          "creator" : "sbaXB4xHfK6GavuiR",
          "date" : new Date("January 11, 2017 22:18:00"),
          "players" : arrPlayers,
          "state" : "running",
          "active" : true
        });
      }      
    } 
  });
