// Bật modal
function openModal() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces/countries",
        success: function (data) {
            let content = ""
            for (let i = 0; i < data.length; i++) {
                content += ' <option value="'+ data[i].id +'">' + data[i].name  +
                    '</option>'
            }
            document.getElementById("select-room").innerHTML = content;
        }
    })
    $('#myModal').modal('show');
}
//Load dữ liệu
loadData()
//Hàm load dữ liệu của People trong database
function loadData() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces",
        success: function (data) {
          loadTable(data)
        }
    })
}


// Hàm tận dụng
function loadTable(list) {
    let content = "";
    for (let i = 0; i < list.length; i++) {
            content += "<tr>"
            content += "<th>"+ (i+1) +"</th>"
            content += "<th>"+ list[i].name +"</th>"
            content += "<th>"+ list[i].area +" Km2</th>"
            content += "<th>"+ list[i].population +" Người</th>"
            content += "<th>"+ list[i].gdp +" VNĐ</th>"
            content += "<th>"+ list[i].description +"</th>"
            content += "<th>"+ list[i].country.name +"</th>"
            content += "<th><a style='color: red'  href='detail.html' onclick='getId("+ list[i].id +")'>Chi tiết</a></th>"
            content += "<th><button onclick='getHuman("+ list[i].id +")'>Cập nhật</button></th>"
            content += "<th><button onclick='deleteHuman("+ list[i].id +")'>Xóa</button></th>"
            content += "</tr>"
    }
    document.getElementById("list-human").innerHTML = content;
}



// Delay time


// Tạo mới đối tượng Human
function createHuman() {
    let name = $('#name').val()
    let age = $('#age').val()
    let phone = $('#phone').val()
    let address = $('#address').val()
    let gdp = $('#gdp').val()
    let room_id = $('#select-room').val()
    let province = {
        name: name,
        area: age,
        population: phone,
        gdp: gdp,
        description: address,
        country:{
            id:room_id
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(province),
        //tên API
        url: "http://localhost:8080/api/provinces",
        //xử lý khi thành công
        success: function () {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tạo mới thành công',
                showConfirmButton: false,
                timer: 1500
            })
                setTimeout(openModalForm, 2500)
            setTimeout(loadData, 3000);

        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function openModalForm() { $('#myModal').modal('hide');}

function getId(idDetail) {
    localStorage.setItem("idDetail", idDetail)
}
// Lấy dữ liệu nhập vào form Update
function getHuman(idHuman) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/provinces/" + idHuman,
        success: function (data) {
            localStorage.setItem("id",idHuman)
            openModal()
            document.getElementById("name").value= data.name;
            document.getElementById("age").value = data.area;
            document.getElementById("phone").value = data.population;
            document.getElementById("gdp").value = data.gdp;
            document.getElementById("address").value =data.description;
            document.getElementById("select-room").value =data.country.name;
            document.getElementById("title-button").innerHTML = "Update";
            document.getElementById("title-button").setAttribute("onclick","updateHuman()");
        }
    })
}






function updateHuman() {
    let id = localStorage.getItem("id");
    console.log(id)
    let name = $('#name').val()
    let age = $('#age').val()
    let phone = $('#phone').val()
    let address = $('#address').val()
    let gdp = $('#gdp').val()
    let room_id = $('#select-room').val()
    let province = {
        id: id,
        name: name,
        area: age,
        population: phone,
        gdp: gdp,
        description: address,
        country:{
            id:room_id
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(province),
        //tên API
        url: "http://localhost:8080/api/provinces",
        //xử lý khi thành công
        success: function () {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cậpn nhật thành công',
                showConfirmButton: false,
                timer: 1500
            })
            clearForm()
            setTimeout(loadData,2000)
            setTimeout(openModalForm,2200)
        }
    });

}

function clearForm() {
    document.getElementById("name").value= "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("gdp").value = "";
    document.getElementById("address").value ="";
}
function deleteHuman(id) {
    Swal.fire({
        title: 'Bạn có chắc muốn xóa ?',
        text: "Bạn không thể khôi phục dữ liệu sau khi xóa  !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success',
                $.ajax({
                    type: "DELETE",
                    url: "http://localhost:8080/api/provinces/" + id,
                    success: function () {
                        Swal.fire({
                            position: 'center',
                                icon: 'success',
                            title: 'Xóa thành công',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        setTimeout(loadData,2000)
                    }

                })
            )
        }
    })


}