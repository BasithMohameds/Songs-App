var admintoken = localStorage.getItem('token');
console.log(admintoken)
$(document).ready(function () {
    $(".submitsong").on('click', () => {
        const songname = $(".songname").val();
        const authorname = $(".authorname").val();
        const moviename = $(".moviename").val();
        const songfile = $(".songfile").val();

        // alert(songname)
        // alert(authorname)
        // alert(moviename)
        // alert(songfile)

    //     if(!songname && !authorname && !songfile && !moviename){
    // // alert("Empty..!");
    // Swal.fire("Empty..!");
    //     }
    //  else{
        let obj2 = {
            "songname": songname,
            "authorname": authorname,
            "moviename": moviename,
            "songfile":songfile
        }
        console.log(obj2)
        $.ajax({
            method: "post",
            url: "http://localhost:5000/song/add",
            headers: {
                token: admintoken
            },
            data: JSON.stringify(obj2),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                //    window.location.href = "http://127.0.0.1:5501/frondend/done.html";
            },
            error: function (error) {
                Swal.fire(error.responseText);
            }
        })

    })
})
