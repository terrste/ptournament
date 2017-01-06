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

