var admintoken = localStorage.getItem('token');

if(admintoken == null)
{
    Swal.fire("Invalid Token...!");
}
else{
console.log(admintoken);

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
}
var person = parseJwt(admintoken);
var existmail = person.email;
console.log(existmail);

// console.log(admintoken);
$(document).ready(function () {
    $(".viewdata").on('click', () => {
        $.ajax({
            url: 'http://localhost:5000/user/alldata',
            headers: {
                token: admintoken
            },
            success: function (data) {
                var details = '';
                $.map(data, function (value) {
                    details = details + '<tr>' + '<td>' +
                        value._id + '</td>' + '<td>' +
                        value.username + '</td>' + '<td>' +
                        value.email + '</td>' + '<td>' +
                        value.password + '</td><td ><button  data-attr="' + value._id + '" class="delete">delete</button></td></tr>';
                });
                $('#table').append(details);
                $(".delete").on('click', function () {
                    var deletedid = $(this).attr('data-attr')
                    deleteRow(deletedid)
                    $(this).parent().parent().hide()
                })
                function deleteRow(id) {
                    alert('Are u sure!..');
                    $.ajax({
                        url: `http://localhost:5000/user/delete/${id}`,
                        type: "GET",
                        success: function (data) {
                            $("#table").on('click', '#delete', function () {
                                $(this).remove()
                            })
                        },
                        error: function () {
                            console.log("error")
                        }
                    })
                }
            },
            error: function (error) {
                Swal.fire(error.responseText);
            }
        })
    })
})




$(document).ready(function () {
    $(".viewsongs").on('click', () => {
        $.ajax({
            url: 'http://localhost:5000/song/allsongs',
            headers: {
                token: admintoken
            },
            success: function (data) {
                var allsongs = '';

                $.map(data, function (value) {
                    allsongs = allsongs + '<tr>' + '<td>' +
                        value.songname + '</td>' + '<td>' +
                        value.authorname + '</td>' + '<td>' +
                        value.moviename + '</td><td ><button  data-attr="' + value._id + '" class="delete">delete</button></td></tr>';
                });
                $('#table2').append(allsongs);
                $(".delete").on('click', function () {
                    var deletedid = $(this).attr('data-attr')
                    deletesongRow(deletedid)
                    $(this).parent().parent().hide()
                })

                $('.insert').on('click', function () {
                    var insertsongname = $(this).attr('data-attr')
                    // alert(insertsongname);
                    // deletesongRow(deletedid)
                    // $(this).parent().parent().hide()
                    $.ajax({
                        method: "get",
                        url: 'http://localhost:5000/playlist/list',
                        headers: {
                            token: admintoken
                        },
                        success: function (data) {
                            console.log(data);
                            $.map(data, function (basith) {
                                if(basith.personmail == existmail)
                                {
                                allplaylist = allplaylist + '<button  data-attr="' + basith._id + '" class="addsongplaylist">"' + basith.playlist + '" </button>';
                                }
                            });
                            $('#allplaylist').append(allplaylist);
                            $(".addsongplaylist").on('click', function () {
                                // alert("hello basith")
                                alert(insertsongname)
                                var obj5 = {
                                    "insertsongname":insertsongname
                                }
                                $.ajax({
                                    method: "post",
                                    url: 'http://localhost:5000/playlist/create',
                                    headers: {
                                        token: admintoken
                                    },
                                    data: JSON.stringify(obj5),
                                    contentType: 'application/json',
                                    dataType: 'json',
                                    success: function (data) {
                                        console.log(data);
                                    }
                                })
                                
                            })
                            
                        }
                    })
                })

                function deletesongRow(id) {

                    alert('Are u sure!..');
                    $.ajax({
                        url: `http://localhost:5000/song/delete/${id}`,
                        type: "GET",
                        success: function (data) {
                            $("#table").on('click', '#delete', function () {
                                $(this).remove()
                            })
                        }
                    })
                }
            },
            error: function (error) {
                Swal.fire(error.responseText);
            }
        })
    });
})