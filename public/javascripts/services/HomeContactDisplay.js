angular
  .module('app')
  .service('HomeContactDisplay', ['GetContacts','IndexOfObject',function(GetContacts, IndexOfObject){

    this.readBirthday = function(input){
      if (input){
        var newDate = new Date(input);
        return newDate.toLocaleString([], {day: '2-digit', month: '2-digit',year: '2-digit'});
      } else {
        return null
      }
    }

    this.getProfilePic = function(contacts, id){
      var index = IndexOfObject.getIndexID(contacts, id)

      if (contacts[index].profilePic){
        return contacts[index].profilePic
      } else {
        return "/images/Profile Avatar.jpg"
      }
    }

  }])
