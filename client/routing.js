Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  console.log("rendering home /");
  this.render("navbar", {to:"header"});
  this.render("landing_page", {to:"main"});
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

