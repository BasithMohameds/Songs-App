$(document).ready(function () {
    $(".loginbtn").on('click', () => {
        var emailget = $(".emaillogin").val();
        var passwordget = $(".passwordlogin").val();
        let obj1 = {
            "email": emailget,
            "password": passwordget
        }
        $.ajax({
            method: "post",
            url: "http://localhost:5000/user/signin",
            data: JSON.stringify(obj1),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                let usertoken = data.token
                console.log(usertoken);
                localStorage.setItem('token',usertoken);
               window.location.replace("http://127.0.0.1:5501/frondend/done.html");
            },
            error: (err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: err.responseText,
                    showConfirmButton: false,
                    timer: 1500,
                  })
             console.log(err.responseText);
            // alert("invalid Email or password...!")
            }
        })
    })
})