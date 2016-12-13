require('angular');


angular
  .module('app')
  .service('DeleteButton', ['GetContacts','IndexOfObject',function(GetContacts, IndexOfObject){

    // Current index is for changing the ng-include to the delete window when its $index matches the current index
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
    };

    this.confirmDelete = function(bool, contacts){
        if (bool){

          var actualIndex = IndexOfObject.getIndexID(contacts,this.currentID)

          contacts.splice(actualIndex, 1);
          GetContacts.deleteContact(this.currentID);
          this.currentIndex = -1;


        }   else {
         this.currentIndex = -1;

        }


    }
  }])
