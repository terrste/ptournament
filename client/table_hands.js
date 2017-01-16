Template.table_hands.helpers({
  hands:function(){
    var hands = Session.get("table_hands"); 
    console.log("SESSION HANDS"); 
    console.log(hands); 
    return hands; 
  },
  isStud: function(hand, point_height){
    var result = false;
    if (hand.value > 6 || ((hand.value==6) && (point_height.value > 10))){
      result = true; 
    } 
    return result; 
  }
});
Template.table_hands.events({

  "click .js-remove-table-hand": function (event) {
    var plateId = event.currentTarget.getAttribute('data-id');
    console.log(event.currentTarget.getAttribute('data-id')); 

    Meteor.call("removePlate", plateId, function(error, result){
      if(error){
        console.log(error.reason);
        return;
      }
      
      var tableId = Session.get("tableId"); 
      var plates = Plates.find({table: tableId}).fetch();
      Session.set("table_hands",plates); 

    });   

    
  }
});
