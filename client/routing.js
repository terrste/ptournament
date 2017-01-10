Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  console.log("rendering home /");
  this.render("navbar", {to:"header"});
  this.render("landing_page", {to:"main"});
});


Router.route('/active_tables', function () {
  console.log("active tables");
  this.render("navbar", {to:"header"});
  this.render("active_tables", {to:"main"});
});

Router.route('/edit_table/:_id', function () {
  
	if (!Meteor.userId()){// not logged in
      alert("please log in!"); 
      this.render("navbar", {to:"header"});
      this.render("landing_page", {to:"main"});
  } else {

  	var tableId; 
	  if (this.params._id == "new"){

	    var newTable = {
	      creator: Meteor.userId(),
	      date: new Date(),
	      players: [],
	      state: "created",
	      active: true
	    };    

	    tableId = Meteor.call("addTable", newTable ,function(err, res){
	      if (!err){// all good
	        //console.log("event callback received id: " + res);
	        Session.set("tableId", res);   
	        var tables  = Tables.find({active:true}).fetch();
	        Session.set("active_tables", tables); 
	        var currentTable  = Tables.findOne({_id:tableId});
	  		Session.set("current_table", currentTable); 
	      }
	    }); 

	  } else {
	    var tableId = this.params._id; 
	    Session.set("tableId", tableId);  
	  
	  }

	  var currentTable  = Tables.findOne({_id:tableId});
	  Session.set("current_table", currentTable); 

	  this.render("navbar", {to:"header"});
	  this.render("edit_table", {to:"main"});
  }
});

Router.route('/current_table/:_id', function () {
  console.log("current table: " + this.params._id);

  Session.set("tableId", this.params._id); 

  var tableId = Session.get("tableId"); 
  var table = Tables.findOne({_id:tableId});
  Session.set("current_table", table); 
  //table.state = "running"; 
  //Meteor.call("updateTable", table);

  this.render("navbar", {to:"header"});
  this.render("current_table", {to:"main"});
});


Router.route('/current_table', function () {
  console.log("current table: " + this.params._id);
  this.render("navbar", {to:"header"});
  this.render("current_table", {to:"main"});
});



Router.route('/hands_list/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var winnerUserId = this.params._id;
    var winner = Meteor.users.findOne({_id:winnerUserId});
    Session.set("userWinner",  winner);   
    console.log("hands list " + winnerUserId);
    this.render("navbar", {to:"header"});
    this.render("hands_list", {to:"main"});
  });

Router.route('/table_hands', function () {
  console.log("table hands");
  this.render("navbar", {to:"header"});
  this.render("not_implemented", {to:"main"});
  //this.render("table_hands", {to:"main"});
});

Router.route('/point_height/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var handId = this.params._id;
    
    var  hand; 
    for (var i=0; i<hands.length; i++){
      if(hands[i].id==handId){
        hand = hands[i]; 

      }
    }

    Session.set("hand", hand)
    console.log("point height " + hand);
    this.render("navbar", {to:"header"});
    this.render("point_heights", {to:"main"});
  });


Router.route('/suits_list/:_id', function () {
    // the user they want to chat to has id equal to 
    // the id sent in after /chat/... 
    var handId = this.params._id;
    
    var  hand; 
    for (var i=0; i<hands.length; i++){
      if(hands[i].id==handId){
        hand = hands[i]; 
      }
    }
    Session.set("hand", hand)
    
    this.render("navbar", {to:"header"});
    this.render("suits_list", {to:"main"});
  });
