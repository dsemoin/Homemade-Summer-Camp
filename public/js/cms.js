

$(document).ready(function() {
    
    // Adding an event listener for when the form is submitted
    $(".js-event__save").on("click", handleFormSubmit);
   
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    var url = window.location.search;
    var taskId;
    var userId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("task_id") !== -1) {
      taskId = url.split("=")[1];
      getTaskData(taskId, "post");
    }
    // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    else if (url.indexOf("user_id") !== -1) {
        console.log("este es el taskid: "+url);
      userId = url.split("=")[1];
      console.log(userId);
    }

  
    // Getting the authors, and their posts
    // getUser();
  
    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
       debugger;
      event.preventDefault();
      
    var title=$("#name").val();
    var date=$("#date").val();
    var time=$("#hour").val();
    var description=$("#notes").val();
    var event=$("#tags").find(":selected").text();

      var newTask = {
        title:title,
        date_at:date,
        hour_at:time,
        description:description,
        event:event,
        UserId:userId
      };

     

      // Wont submit the post if we are missing a body, title, or author
      if (newTask.title=="" || newTask.date_at=="") {
        return;
      }
      
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newTask.id = taskId;
        updateTask(newTask);
      }
      else {
        $.post("/api/taskNew", newTask).then(function(data) {
                   console.log("poster: "+data);
                window.location.href = "/calendar";
              });
        // submitTask(newTask);
      }
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitTask(task) {
        // var takCreate={
        //     "title":task.title,
        //     "date_at": task.date_at,
        //     "hour_at": task.hour_at,
        //     "description":task.description,
        //     "event":task.event,
        //     "UserId":task.UserId
        // }
        console.log("el post: "+ task);
       
    //    $.post("/api/task", task).then(function(data) {
    //        console.log("poster: "+data);
    //     window.location.href = "/calendar";
    //   });
    }
  
    // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
    function getTaskData(id, type) {
      var queryUrl;
      switch (type) {
      case "task":
        queryUrl = "/api/task/" + id;
        break;
      case "user":
        queryUrl = "/api/user/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
        //   console.log(data.UserId || data.id);
          // If this post exists, prefill our cms forms with its data
        //   titleInput.val(data.title);
        //   bodyInput.val(data.body);
        console.log(data);
          userId = data.id;
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // A function to get Authors and then render our list of Authors
    // function getUser() {
    //   $.get("/api/user", renderAuthorList);
    // }
    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
    // function renderAuthorList(data) {
    //   if (!data.length) {
    //     window.location.href = "/authors";
    //   }
    //   $(".hidden").removeClass("hidden");
    //   var rowsToAdd = [];
    //   for (var i = 0; i < data.length; i++) {
    //     rowsToAdd.push(createAuthorRow(data[i]));
    //   }
    //   authorSelect.empty();
    //   console.log(rowsToAdd);
    //   console.log(authorSelect);
    //   authorSelect.append(rowsToAdd);
    //   authorSelect.val(userId);
    // }
  
    // Creates the author options in the dropdown
    // function createAuthorRow(author) {
    //   var listOption = $("<option>");
    //   listOption.attr("value", author.id);
    //   listOption.text(author.name);
    //   return listOption;
    // }
  
    // Update a given post, bring user to the blog page when done
    // function updateTask(post) {
    //   $.ajax({
    //     method: "PUT",
    //     url: "/api/task",
    //     data: post
    //   })
    //     .then(function() {
    //       window.location.href = "/blog";
    //     });
    // }
  });
  