var admintoken = localStorage.getItem('token');
console.log(admintoken);

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
var person = parseJwt(admintoken);
var personmail = person.email;
console.log(personmail);



$(document).ready(function () {
    $(".createplaylist").on("click", () => {
        var playlist = $(".playlist").val();
        // alert(personmail);
        const obj = {
            "playlist": playlist,
            "personmail": personmail
        }
        $.ajax({
            method: "post",
            url: "http://localhost:5000/playlist/create",
            headers: {
                token: admintoken
            },
            data: JSON.stringify(obj),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                // window.location.replace("http://127.0.0.1:5501/frondend/login.html");
            },
            error: (error) => {
                Swal.fire(error.responseText)
            }
        })
    })
})


$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:5000/playlist/list',
        headers: {
            token: admintoken
        },
        success: function (data) {
            var myplaylist = '';
            $.map(data, function (value) {
                if (personmail == value.personmail) {
                    myplaylist = myplaylist + '<tr>' + '<td>' +
                        value.personmail + '</td><td >' + '&nbsp;' + '&nbsp;' + '&nbsp;' +
                        value.playlist + '</td><td>' +
                        '<button  data-attr="' + value._id + '" class="delete">delete</button></td>' +
                        '<td><button  data-attr="' + value._id + '" class="view">View</button></td></tr>';
                }
            });
            $('.exitplaylist').append(myplaylist);
            $(".delete").on('click', function () {
                var deletedid = $(this).attr('data-attr')
                deleteRowhere(deletedid)
                $(this).parent().parent().hide()
            })

            $(".view").on('click', function () {
                const id = $(this).attr('data-attr');
                // alert(id)
                $.ajax({
                    method: "get",
                    url: `http://localhost:5000/playlist/listid/${id}`,
                    // headers: {
                    //     token: admintoken
                    // },
                    success: function (data) {
                        // console.log(data);
                        var slectedsongs = '';
                          $.map(data,function(seperate){
                                console.log(seperate);
                                slectedsongs = slectedsongs +'<tr>' +'<td>' +
                                seperate +'</td></tr>';
                            });
                            $('.exitsonglist1').append(slectedsongs);
                            // $(".songlist").on("click",function(){
                            //     // alert("hello basith")
                            //     var seperateid = $(this).attr('data-attr')
                            //     alert(seperateid)
                            //     deletesonglist(seperateid)
                            // })
                    }
                })
            })

            function deleteRowhere(id) {
                alert('Are u sure!..');
                $.ajax({
                    url: `http://localhost:5000/playlist/delete/${id}`,
                    headers: {
                        token: admintoken
                    },
                    type: "GET",
                    success: function (data) {
                        $("#table3").on('click', '#delete', function () {
                            $(this).remove()
                        })
                    },
                    error: function () {
                        console.log("error")
                    }
                })
            }

            function deletesonglist(getsongid){
                // alert(getsongid)
            }

        }
    })
})


$(document).ready(function () {
    const input = document.querySelector("input");
    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            var txtvalue = e.target.value;
            // console.log(txtvalue);
            var obj4 = {
                "textvalue": txtvalue
            }
            $.ajax({
                method: "post",
                url: 'http://localhost:5000/song/searchsong',
                data: JSON.stringify(obj4),
                contentType: 'application/json',
                dataType: 'json',
                // headers: {
                //     token: admintoken
                // },
                success: function (data) {
                    console.log(data);
                    // alert("hello")
                    var songnm = data[0].songname
                    var authornm = data[0].authorname
                    var movienm = data[0].moviename
                    Swal.fire(songnm, authornm);
                },
                error: (error) => {
                    Swal.fire(error.responseText)
                }
            })
        }
    })
})