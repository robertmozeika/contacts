
angular
  .module('app')
  .service('AddGroups', function ($http) {
    this.groups = [
      {
        value:"Friend",
        buttonClass: "btn-default",
        selected: false,
      },
      {
        value:"Family",
        buttonClass: "btn-default",
        selected: false,
      },
      {
        value:"Colleague",
        buttonClass: "btn-default",
        selected: false,
      },
      {
        value:"Associate",
        buttonClass: "btn-default",
        selected: false,
      },
    ];

    this.addedGroups = [];

    this.getAddedGroups = function(){
      return this.addedGroups;
    }

    this.getGroups = function(){
      return this.groups
    };

    this.addGroup = function(index){
      var currentGroup = this.groups[index]
      if (currentGroup.selected == false){
        currentGroup.buttonClass = "btn-primary";
        this.addedGroups.push(currentGroup.value)
        currentGroup.selected = true;
      } else {
        currentGroup.buttonClass = "btn-default";
        this.addedGroups.splice(this.addedGroups.indexOf(currentGroup.value), 1);
        currentGroup.selected = false;

      }

    }

    //when user opens add window, previous values need to be cleared
    this.clearGroups = (()=>{
      this.groups.forEach((element)=>{
        element.selected = false;
        element.buttonClass = "btn-default";
        this.addedGroups = [];

      })
    })





});
