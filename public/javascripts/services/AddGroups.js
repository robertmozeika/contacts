
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
        console.log(this)
        currentGroup.buttonClass = "btn-primary";
        this.addedGroups.push(currentGroup.value)
        currentGroup.selected = true;
      } else {
        currentGroup.buttonClass = "btn-default";
        this.addedGroups.splice(this.addedGroups.indexOf(currentGroup.value), 1);
        currentGroup.selected = false;

      }

    }

    this.clearGroups = (()=>{
      console.log('cleared groups')
      this.groups.forEach((element)=>{
        element.selected = false;
        element.buttonClass = "btn-default";
        this.addedGroups = [];

      })
    })





});
