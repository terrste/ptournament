getPlayersWithPoints = function (users, plates){

    var players = []; 
      //console.log(users); 
      //console.log(plates);       
      for (var i = 0; i<users.length; i++){
        // console.log('user:' + i); 
        var points = 0; 
        var player = users[i];

        for(var j=0; j<plates.length; j++){

          points = points + getPointInHand(player._id,plates[j]);
          // console.log('plate:' + j);
          /*var pointInPlateForWinner = 0;  
          if(plates[j].winners){
            for(var k=0; k<plates[j].winners.length; k++){
              // console.log('winner:' + k); 
              //points++; 
              if(plates[j].winners[k].user != null && plates[j].winners[k].user != undefined){
                if(plates[j].winners[k].user._id == player._id){
                  pointInPlateForWinner++; 
                  //points++; 
                }
              }            
            }
            if (plates[j].winners.length == 1){
              if(pointInPlateForWinner == 1){
                points++; 
              }
            } else if (plates[j].winners.length == 2){
              if(pointInPlateForWinner == 1){
                points = points + 0.5; 
              } else if (pointInPlateForWinner == 2){
                points = points + 1.5; 
              }
            } else if (plates[j].winners.length == 3){
              if(pointInPlateForWinner == 1){
                points = points + 0.5; 
              } else if (pointInPlateForWinner == 2){
                points = points + 1; 
              } else if (pointInPlateForWinner == 3){
                points = points + 2; 
              }
            } else if (plates[j].winners.length == 4){
              if(pointInPlateForWinner == 1){
                points = points + 0.25; 
              } else if (pointInPlateForWinner == 2){
                points = points + 1; 
              } else if (pointInPlateForWinner == 3){
                points = points + 1.5; 
              } else if (pointInPlateForWinner == 4){
                points = points + 2; 
              }
            }
          }*/
        }
        player.points = points; 
        players.push(player); 
      }
      //console.log(players);   
    return players; 
}

getPointInHand = function(userId,hand){
  var pointInPlateForWinner = 0;  
  var points = 0;
  if(hand.winners){
    for(var k=0; k<hand.winners.length; k++){
      // console.log('winner:' + k); 
      //points++; 
      if(hand.winners[k].user != null && hand.winners[k].user != undefined){
        if(hand.winners[k].user._id == userId){
          pointInPlateForWinner++; 
          //points++; 
        }
      }            
    }
    if (hand.winners.length == 1){
      if(pointInPlateForWinner == 1){
        points++; 
      }
    } else if (hand.winners.length == 2){
      if(pointInPlateForWinner == 1){
        points = points + 0.5; 
      } else if (pointInPlateForWinner == 2){
        points = points + 1.5; 
      }
    } else if (hand.winners.length == 3){
      if(pointInPlateForWinner == 1){
        points = points + 0.5; 
      } else if (pointInPlateForWinner == 2){
        points = points + 1; 
      } else if (pointInPlateForWinner == 3){
        points = points + 2; 
      }
    } else if (hand.winners.length == 4){
      if(pointInPlateForWinner == 1){
        points = points + 0.25; 
      } else if (pointInPlateForWinner == 2){
        points = points + 1; 
      } else if (pointInPlateForWinner == 3){
        points = points + 1.5; 
      } else if (pointInPlateForWinner == 4){
        points = points + 2; 
      }
    }
  }
  return points;
}