Template.dateTime.helpers({
  formatDate: function(date) {
    return moment(date).format('DD/MM/YYYY');
  },
  formatDateAndTime: function(date) {
    return moment(date).format('ddd DD/MM/YYYY HH:mm');
  },
  formatMonth: function(date) {
    return moment(date).format('MM/YYYY');
  }
});