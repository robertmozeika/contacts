angular
  .module('app')
  .service('BirthdayPicker', function(){
    //All necessary for bootstrap birthday picker
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

        formatYear: 'yy',
        assumeNearbyYear: 20,
        startingDay: 1
      };


      this.values.popup1 = {
        opened: false
      };

      this.values.open1 = function() {
    
        this.values.popup1.opened = true;
      }.bind(this);


      this.values.setDate = function(year, month, day) {
        this.values.dt = new Date(year, month, day);
      }.bind(this);

      this.values.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate','M/d/yyyy', 'd-M-yy'];
      this.values.format = this.values.formats[4];
      this.values.altInputFormats = ['M!/d!/yyyy'];



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


  })
