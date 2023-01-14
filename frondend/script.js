//user signup Register data pass to backend
$(document).ready(function () {
    $(".signup").on('click', () => {
        var username = $(".username").val();
        var email = $(".email").val();
        var password = $(".password").val();
        // if(email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi))
        let obj = {
            "username": username,
            "email": email,
            "password": password
        }
        // console.log(obj);
        $.ajax({
            method: "post",
            url: "http://localhost:5000/user/signup",
            data: JSON.stringify(obj),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                window.location.replace("http://127.0.0.1:5501/frondend/login.html");
            }
        })
    })
})
