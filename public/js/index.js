/////////////////////////code to post data/////////////////////////////////////


var url = window.location.search;

var userId;
// Sets a flag for whether or not we're updating a post to be false initially
var updating = false;
//var to get the id to delete, update and open 
var taskId; 
userId = url.split("=")[1];
console.log(userId);


userIdToAll = "/?user_id=" + userId;


$.get("/api/task" + userIdToAll, function(data) {
  console.log(data.length);

  for(var i=0; i < data.length ; i++){
 var fecha=moment(data[i].date_at).format("YYYY-MM-DD");

  var inputName = data[i].title;
  var inputDate = fecha;
  var inputNotes = data[i].description;
  var inputTag = data[i].event;
taskId=data[i].id;
  dataCel.each(function() {
  
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }
      fillEventSidebar($(this));
    }
  });
}
});



//global variables
var monthEl = $(".c-main");
var dataCel = $(".c-cal__cel");
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var monthText = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var indexMonth = month;
var todayBtn = $(".c-today__btn");
var addBtn = $(".js-event__add");
var saveBtn = $(".js-event__save");
var closeBtn = $(".js-event__close");
var winCreator = $(".js-event__creator");
var inputDate = $(this).data();
today = year + "-" + month + "-" + day;


// ------ functions control -------


//button of the current day
todayBtn.on("click", function() {
  if (month < indexMonth) {
    var step = indexMonth % month;
    movePrev(step, true);
  } else if (month > indexMonth) {
    var step = month - indexMonth;
    moveNext(step, true);
  }
});

//higlight the cel of current day
dataCel.each(function() {
  if ($(this).data("day") === today) {
    $(this).addClass("isToday");
    fillEventSidebar($(this));
  }
});

//window event creator
addBtn.on("click", function() {
  winCreator.addClass("isVisible");
 $(".overlay").css("visibility", "visible");
  dataCel.each(function() {
    if ($(this).hasClass("isSelected")) {
      today = $(this).data("day");
      document.querySelector('input[type="date"]').value = today;
    // } 
    }
  });
});
closeBtn.on("click", function() {
  winCreator.removeClass("isVisible");
  $(".overlay").css("visibility", "hidden");
});



saveBtn.on("click", function() {

   $(".overlay").css("visibility", "hidden");  
  var inputName = $("input[name=name]").val();
  var inputDate = $("input[name=date]").val();
  var inputNotes = $("textarea[name=notes]").val();
  var inputTag = $("select[name=tags]")
    .find(":selected")
    .text();
   


 var newTask = {
   title:inputName,
   date_at:inputDate,
   description:inputNotes,
   event:inputTag,
   UserId:userId
 };

 // Wont submit the post if we are missing a body, title, or author
 if (newTask.title=="" || newTask.date_at=="" || newTask.UserId==undefined) {
   alert("You need to login!!");
   return;
 }

 // If we're updating a post run updatePost to update a post
 // Otherwise run submitPost to create a whole new post
 if (updating) {
  // newTask.id = taskId;
   console.log("poster: "+taskId);
   UpdateTask(taskId,newTask);
 }
 else {
  $.ajax({
    type: 'POST',
    url: 'api/taskNew',
    data: newTask,
    dataType: 'json'
}).then(function(data) {

  console.log("el entrado:"+data);
  taskId=data.id;
 debugger;
dataCel.each(function() {
  
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }
      fillEventSidebar($(this));
    }
  });

});

}

  winCreator.removeClass("isVisible");
  $("body").removeClass("overlay");
  $("#addEvent")[0].reset();
});

function completeForm(result){
  
  $("input[name=name]").val(result.title);
  $("input[name=date]").val(moment(result.date_at).format("YYYY-MM-DD"));
  $("textarea[name=notes]").val(result.description);
  $("select[name=tags]").append(result.event);

}

//funtion to get the task when you click on see task

function getTaskData(id) {
      
  $.ajax("/api/task/" + id,{
    type:"GET",
  }).then(function(result) {
    if (result) {
     console.log(result);
    completeForm(result);
    userId=result.UserId;  
       taskId = result.id;
       updating = true;
    }
  });
  winCreator.addClass("isVisible");
  $(".overlay").css("visibility", "visible");
}

function UpdateTask(id, taskNew){
// If this post exists, prefill our cms forms with its data
console.log(taskNew);
$.ajax("/api/task/" + id,{
  type:"PUT",
  data:taskNew
}).then(function(){
  updating = false;
  //location.reload();
  dataCel.each(function() {
    
    if ($(this).data("day") === inputDate) {
      if (inputName != null) {
        $(this).attr("data-name", inputName);
      }
      if (inputNotes != null) {
        $(this).attr("data-notes", inputNotes);
      }
      $(this).addClass("event");
      if (inputTag != null) {
        $(this).addClass("event--" + inputTag);
      }
      fillEventSidebar($(this));
    }
  });
});
}

function deleteTask(id){
  $.ajax("/api/task/" + id,{
    type:"DELETE",
    }).then(function(){
       location.reload();
  });
}


//fill sidebar event info
function fillEventSidebar(self) {
  //debugger;
  var selfId=self.id;
  console.log("este es self:"+selfId);
  var thisName = self.attr("data-name");
  var thisImportant = self.hasClass("event--important");
  var thisBirthday = self.hasClass("event--birthday");
  var thisFestivity = self.hasClass("event--festivity");
  var thisEvent = self.hasClass("event");

  var btnUpdate="<button class='btn btn-primary borrar' data-task='" + taskId + "' onclick=getTaskData('" + taskId + "')>" +
  "<span class='glyphicon glyphicon-pencil'></span>" +
  "</button>";

  var btnDelete="<button class='btn btn-danger borrar' data-task='" + taskId + "' onclick=deleteTask('" + taskId + "')>" +
  "<span class='glyphicon glyphicon-trash'></span>" +
  "</button>";

  
  switch (true) {
    case thisImportant:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--important'>" +
        thisName +"</p>"
      );
     $(".c-aside__eventList").append(
        "<p>"+
        " <span> • " +
        btnUpdate +
        " <span> • " +
        btnDelete +
        "</span></p>"
      );
      break;
    case thisBirthday:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--birthday'>" +
        thisName+"</p>"
      );
      $(".c-aside__eventList").append(
        "<p>" +
       " <span> • " +
        btnUpdate +
        " <span> • " +
        btnDelete +
        "</span></p>"
      );
      break;
    case thisFestivity:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event c-aside__event--festivity'>" +
        thisName +"</p>"
      );
      $(".c-aside__eventList").append(
        "<p>" +
       " <span> • " +
        btnUpdate +
        " <span> • " +
        btnDelete +
        "</span></p>"
      );
      break;
    case thisEvent:
      $(".c-aside__eventList").append(
        "<p class='c-aside__event'>" +
        thisName +"</p>"
      );
      $(".c-aside__eventList").append(
        "<p>" +
       " <span> • " +
        btnUpdate +
        " <span> • " +
        btnDelete +
        "</span></p>"
      );
      break;
   }
  
};






//function for move the months
function moveNext(fakeClick, indexNext) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "-=100%"
    });
    $(".c-paginator__month").css({
      left: "-=100%"
    });
    switch (true) {
      case indexNext:
        indexMonth += 1;
        break;
    }
  }
}
function movePrev(fakeClick, indexPrev) {
  for (var i = 0; i < fakeClick; i++) {
    $(".c-main").css({
      left: "+=100%"
    });
    $(".c-paginator__month").css({
      left: "+=100%"
    });
    switch (true) {
      case indexPrev:
        indexMonth -= 1;
        break;
    }
  }
}

//months paginator
function buttonsPaginator(buttonId, mainClass, monthClass, next, prev) {
  switch (true) {
    case next:
      $(buttonId).on("click", function() {
        if (indexMonth >= 2) {
          $(mainClass).css({
            left: "+=100%"
          });
          $(monthClass).css({
            left: "+=100%"
          });
          indexMonth -= 1;
        }
        return indexMonth;
      });
      break;
    case prev:
      $(buttonId).on("click", function() {
        if (indexMonth <= 11) {
          $(mainClass).css({
            left: "-=100%"
          });
          $(monthClass).css({
            left: "-=100%"
          });
          indexMonth += 1;
        }
        return indexMonth;
      });
      break;
  }
}

buttonsPaginator("#next", monthEl, ".c-paginator__month", false, true);
buttonsPaginator("#prev", monthEl, ".c-paginator__month", true, false);

//launch function to set the current month
moveNext(indexMonth - 1, false);

//fill the sidebar with current day
$(".c-aside__num").text(day);
$(".c-aside__month").text(monthText[month - 1]);



