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
  },

  removePlate:function(plateId){
    console.log("removePlate method");
    //console.log(table);
    if (!this.userId){// not logged in
      return;
    } else {
      Plates.remove(plateId); 
    }    
  },

  addPlate: function(plate){
    var plateId;
    if (!this.userId){// not logged in
      console.log("not logged in");
      return;
    }
    //set timestamp for plate
    plate.date = new Date();
    plateId = Plates.insert(plate);
    return plateId;
  }

})