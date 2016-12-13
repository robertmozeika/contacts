angular
  .module('app')
  .service('AddContact', ['ValidateFields','fileUpload', 'GetContacts','BirthdayPicker','$state',function(ValidateFields,fileUpload, GetContacts, BirthdayPicker, $state){

    console.log('add service called')
    this.profilePic = null;


    //values to be used for popover when someone enters info incorrectly on addContact.html
    this.popValues = {};
    this.popValues.emailPop = false;
    this.popValues.fnPop = false;
    this.popValues.lnPop = false;
    this.popValues.popoverEmailText = null;
    this.popValues.lnText = null;
    this.popValues.fnText = null;

    this.getPopValues = function(){
      return this.popValues
    }

    //values for modal when contact is created or cancelled in addContact.html
    this.modal = {};
    this.modal.popupText = null;
    this.modal.button1Text = null;
    this.modal.button1Class = null;
    this.modal.button2Class = null;
    this.modal.template = null;

    this.getModal = function(){
      return this.modal
    }




    //posts contact to db, will be given modified $scope.toAdd object from this.addContact function below
    function postContact(input){

        console.log('ran')
        console.log(input)
        return $http.post('/getContacts/add', input).then(function(result){
          console.log('succesfully added')
          return
        })

    }


    //all required to add contact to db from addContact.html
    this.addContact = function(toAdd, dateElement){

          //sets date correctly if it is added in an input that bootstrap datepicker doesn't convert, adds to toAdd object
          var toDate = [];
          var dt = BirthdayPicker.getValues().dt;
          console.log(dateElement)
          if (dt == undefined && dateElement !== ""){
            dateElement.split(',')[0].split("/").map(function(val, index, arr) {
              toDate.push(val)
              return val;
            });
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear()
            var setYear = Number(toDate[2]);
            var yearPlus = (setYear + 2000)
            if (currentYear > yearPlus){
              setYear = yearPlus
            }

            toAdd.birthday = new Date(setYear,Number(toDate[0]) - 1,Number(toDate[1]));

          } else {
            toAdd.birthday = dt;
          }

          //resets popover values to false
          this.popValues.emailPop = false;
          this.popValues.fnPop = false;
          this.popValues.lnPop = false;
          this.popValues.datePop = false;



          var validation = ValidateFields.add(toAdd);

          //validation returns 1 if everything properly validates
          if (validation == 1 ){
            var user = "username";
            var date = (new Date).getTime()

            var queuedImage = fileUpload.getQueuedImage();
            if (queuedImage) {
              console.log('ran');
              console.log(queuedImage)
              toAdd.profilePic = date
              fileUpload.uploadFiles(user,date);
            }

            this.modal.button1Text = "OK";
            this.modal.button2Class = "hidden";
            this.modal.confirmWindowClass = "";
            this.modal.button1Class = "btn-primary";

            //posts toAdd object to database
            GetContacts.addContact(toAdd);
            //clears birthday values so when going back to add contact it is not still there
            BirthdayPicker.values.clear();

            this.modal.popupText = "New user is created";
            this.modal.template = 'templates/addWindow.html';
          }
          //Returns 2 if email address wasn't set correctly
          else if (validation == 2){
            this.popValues.popoverEmailText = "Please enter a valid email address";
            this.popValues.emailPop = true;
            //returns 3 if data is not valid
          }  else if (validation == 3){
            this.popValues.popoverDateText = "Please enter a valid date  in this format: (mm/dd/yyyy)";
            this.popValues.datePop = true;

          }else {
            if (toAdd.email == undefined || toAdd.email == ""){
              this.popValues.emailPop = true;
              this.popValues.popoverEmailText = "Please enter an email address";
            }
            if (toAdd.firstName == undefined || toAdd.firstName == ""){
              this.popValues.fnPop = true;
              this.popValues.fnText = "Please enter the first name";
              this.popValues.popoverEmailText = "Please enter an email address";
            }
            if (toAdd.lastName == undefined || toAdd.lastName == "") {
              this.popValues.lnPop = true;
              this.popValues.lnText = "Please enter the last name";
            }


          }

    }


    this.cancel = function(){
      fileUpload.queuedImage = null;
      this.modal.button1Text = "Yes";
      // $scope.confirmWindowClass = "";
      this.modal.template = 'templates/addWindow.html';
      this.modal.button1Class = "btn-success";
      this.modal.button2Class = "btn-danger";
      this.modal.popupText = 'Are you sure you want to cancel?';
    }.bind(this)

    this.noCancel = function(){
      this.modal.template = null;    }.bind(this)

    this.redirectHome = function(toAdd){

      this.modal.template = null;
      $state.go('home')
    }.bind(this)

    this.clearFields = function(toAdd){

    }



  }])
