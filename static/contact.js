$("#contact-form").submit(function(){

    let name = $('#fname').val() +' '+ $('#lname').val();
    let email = $('#email').val();
    let msg = $('#msg').val();

    let content = {
        name: name,
        email: email,
        msg: msg
    }

    $.ajax({
        url:"/contact",
        type:"POST",
        data: JSON.stringify(content),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(res){
            if(res.status === 'success'){
                $('#status').html(`
                <div class="alert alert-success" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <b>Yay!</b> I'll get back to you soon.
                </div>`);
            }else{
                $('#status').html(`
                <div class="alert alert-danger" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <b>Something's not right.</b> Please review the information below and try again.
                    If the issue presists directly email public@dhruv.tech.
                </div>`);
            }
        }
    });
});