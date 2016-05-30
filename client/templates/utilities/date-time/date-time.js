Template.dateTime.helpers({
  formatDate: function(date) {
    return moment(date).format('DD/MM/YYYY');
  },
  formatDateAndTime: function(date) {
    return moment(date).format('DD/MM/YYYY hh:mm');
  },
});