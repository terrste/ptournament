Meteor.methods({
  
  addTable:function(table){
    var tableId;
    if (!this.userId){// not logged in
      console.log("Add table: not logged in");
      return;
    }
    
    tableId = Tables.insert(table);
    return tableId;
  },
  
  updateTable:function(table){
    
    if (!this.userId){// not logged in
      console.log("Update table: not logged in");
      return;
    } else {
      Tables.update(table._id, table);
    }    
  }
})