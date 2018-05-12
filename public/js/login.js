$(function() {

 $(".login").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

      var userN={
		 email:$("#inputEmail").val().trim(),
		password:$("#inputPassword").val().trim(),
	}
				

		$.post("/api/login", userN).then(function(data){
			if(data==null){
		    alert("Incorrect credentials.");
		}
		else{
			$("#inputEmail").val("");
            $("#inputPassword").val("");
			window.location.href = "/calendar";
		}
		
	});
});

 
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
        		 console.log("created new user");
                // Reload the page to get the updated list
                window.location.href = "/calendar";
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

});