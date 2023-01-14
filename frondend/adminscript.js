$(document).ready(function () {
    $(".loginbtn").on('click', () => {
        var emailget = $(".emailadmin").val();
        var passwordget = $(".passwordadmin").val();
        let obj1 = {
            "email": emailget,
            "password": passwordget
        }
        $.ajax({
            method: "post",
            url: "http://localhost:5000/admin/login",
            data: JSON.stringify(obj1),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                let tokendata = data.token
                console.log(tokendata);
                localStorage.setItem('token',tokendata);
               window.location.replace("http://127.0.0.1:5501/routes/Adminmain.html");
            },
            error: (err) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: err.responseText,
                    showConfirmButton: false,
                    timer: 1500,
                  })
            //  console.log(err.responseText);
            // // alert("invalid Email or password...!")
            }
        })
    })
})