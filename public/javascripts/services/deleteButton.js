require('angular');


angular
  .module('app')
  .service('DeleteButton', ['GetContacts','IndexOfObject',function(GetContacts, IndexOfObject){

    // this.contacts = get
    this.currentIndex = -1;

    this.getDeletePop = function(index){

      if (index == this.currentIndex){
        return 'templates/deletePopup.html'
      } else {
        return 'templates/contactCard.html'
      }
    };

    //changes class for flip animation on delete button press
    this.flipperClass = function(index){
      if (index == this.currentIndex){
        return 'flipper'
      } else {
        return ""
      }
    }

    this.pressDelete = function(index,id){
      this.currentIndex = index;
      this.currentID = id;
      console.log(this.currentIndex)
    };

    this.confirmDelete = function(bool, contacts){
      // return new Promise((resolve, reject)=>{
        if (bool){

          var actualIndex = IndexOfObject.getIndexID(contacts,this.currentID)

          contacts.splice(actualIndex, 1);
          GetContacts.deleteContact(this.currentID);
          this.currentIndex = -1;


        }   else {
        //  $scope.confirmDeleteClass = "hidden"
         this.currentIndex = -1;

        }

      // })

    }
  }])
