angular
  .module('app')
  .service('BirthdayPicker', function(){

    this.values = {};
    this.values.toAdd = {};
    this.getValues = function(){
      return this.values;
    }


    this.values.toAdd.birthday = this.values.dt;


    this.values.changeDate = function(){
      this.values.birthday = this.values.dt
    }.bind(this)





      this.values.clear = function() {
        this.values.dt = null;
      }.bind(this);

      this.values.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
      };

      this.values.dateOptions = {
        // dateDisabled: disabled,
        formatYear: 'yy',
        assumeNearbyYear: 20,
        // maxDate: new Date(2020, 5, 22),
        // minDate: new Date(),
        startingDay: 1
      };

      // Disable weekend selection
      // function disabled(data) {
      //   var date = data.date,
      //     mode = data.mode;
      //   return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      // }

      // this.values.toggleMin = function() {
      //   this.values.inlineOptions.minDate = this.values.inlineOptions.minDate ? null : new Date();
      //   this.values.dateOptions.minDate = this.values.inlineOptions.minDate;
      // };
      //
      // this.values.toggleMin();
      this.values.popup1 = {
        opened: false
      };

      this.values.open1 = function() {
        console.log('called');
        console.log(this)
        this.values.popup1.opened = true;
      }.bind(this);


      this.values.setDate = function(year, month, day) {
        this.values.dt = new Date(year, month, day);
      }.bind(this);

      this.values.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','M/d/yyyy', 'd-M-yy'];
      this.values.format = this.values.formats[4];
      this.values.altInputFormats = ['M!/d!/yyyy'];




      // var tomorrow = new Date();
      // tomorrow.setDate(tomorrow.getDate() + 1);
      // var afterTomorrow = new Date();
      // afterTomorrow.setDate(tomorrow.getDate() + 1);
      // this.values.events = [
      //   {
      //     date: tomorrow,
      //     status: 'full'
      //   },
      //   {
      //     date: afterTomorrow,
      //     status: 'partially'
      //   }
      // ];

      function getDayClass(data) {
        var date = data.date,
          mode = data.mode;
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < this.values.events.length; i++) {
            var currentDay = new Date(this.values.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return this.values.events[i].status;
            }
          }
        }

        return '';
      }





      // this.values.addWindow = GetContacts.getModal();

      // this.values.openWindow = function(){
      //   this.values.addWindow = 'templates/addWindow.html';
      // }
      //
      //













  })
