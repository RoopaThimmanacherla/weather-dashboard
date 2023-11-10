var currentDay = $("#currentDay");
var currentHour;
var currentBlockHour;

$(function () {
  // Added a listener for click events on the save button. This code should save the data to localstorage

  $(".saveBtn").on("click", function () {
    var time = $(this).parent().attr("id").substring(5);
    console.log(time);
    var text = $(this).siblings("textarea").val();
    console.log(text);
    localStorage.setItem(time, text);
  });

  // Added code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  updateTimeBlock();
  function updateTimeBlock() {
    currentHour = dayjs().hour();
    console.log(currentHour);
    $(".time-block").each(function () {
      currentBlockHour = parseInt($(this).attr("id").substring(5));
      if (currentBlockHour < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      }

      if (currentBlockHour === currentHour) {
        $(this).addClass("present");
        $(this).removeClass("past");
        $(this).removeClass("future");
      }

      if (currentBlockHour > currentHour) {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }
  //  Added code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.

  $("#hour-9 .description").val(localStorage.getItem("9"));
  $("#hour-10 .description").val(localStorage.getItem("10"));

  $("#hour-11 .description").val(localStorage.getItem("11"));

  $("#hour-12 .description").val(localStorage.getItem("12"));

  $("#hour-13 .description").val(localStorage.getItem("13"));

  $("#hour-14 .description").val(localStorage.getItem("14"));

  $("#hour-15 .description").val(localStorage.getItem("15"));

  $("#hour-16 .description").val(localStorage.getItem("16"));

  $("#hour-17 .description").val(localStorage.getItem("17"));

  //Added code to display the current date in the header of the page.

  currentDay.text(dayjs().format("dddd,MMMM DD"));
});
