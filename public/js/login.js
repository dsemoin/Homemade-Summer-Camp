$(function() {


//function login
 $(".login").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

      var userN={
		 email:$("#inputEmail").val().trim(),
		password:$("#inputPassword").val().trim(),
	}
		$.post("/api/login", userN).then(function(data){
			if(data==null){
			alert("Incorrect credentials or your need to create an new user!");
			$("#inputPassword").val("");
		}
		else{
			$.ajax("/api/email/"+ userN.email, {
				type:"GET"
			}).then(function(data){
			$("#navCalendar").attr("href","/calendar?user_id="+data.id);
			$("#inputEmail").val("");
			$("#inputPassword").val("");
		});
		}
		
	});
});

 //funtion register
 $(".register").on("submit", function(event) {
 // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var email=$("#inputEmail").val().trim();

        var newUser={
        	name:$("#inputName").val().trim(),
        	email: email,
		    password:$("#inputPassword").val().trim(),
		 };

       $.ajax("/api/email/"+ email, {
			type:"GET"
		}).then(function(data){
			console.log(data);
			if(data==null){
				 $.post("/api/user",newUser).then(function(data){
				 console.log("created new user: "+ data);
				$("#navCalendar").attr("href","/calendar?user_id="+data.id);
                // window.location.href = "/calendar";
      		  });
			}
			else{
				alert("this email exist");
			}
		});

		$("#inputName").val("");
		$("#inputEmail").val("");
        $("#inputPassword").val("");
	  });
	  
	  $("#signUp").on("click", function(event){
		event.preventDefault();
		window.location.href = "/";
	  })

});