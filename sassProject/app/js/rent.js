window.addEventListener('load',init,false);
function init(){

    var name = document.getElementById('name');               
    var email = document.getElementById('email');    
    var phone = document.getElementById('phone');    
    var button = document.getElementById('btn');
    var form=document.getElementsByTagName('form')[0];
    var modal = document.getElementById('modal');
    var rent = document.getElementById('rent');
    var back = document.getElementById('btn-back');


    var regexName = /^([A-Za-z\s]*)+$/;
    var regexMail = /[^@]+@[^\.]+\..+/;
    // var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]$/

    checkField(name, regexName, 'invalid name!');
    checkField(email, regexMail, 'invalid eMail!');


    form.addEventListener('submit',function(e){
        validate();
        e.preventDefault()
    });
    back.addEventListener('click', function(e){
        modal.style.display = 'none';
    });

    rent.addEventListener('click', function(){
        modal.style.display = 'block';
    })

    function checkField(elem, regex, err){
        elem.onblur = function() {
          if (!regex.test(elem.value)) { 
            elem.className = "error";
            error.innerHTML = err;
          }
        };

        elem.onfocus = function() {
          if (elem.className == 'error') { 
            elem.className = "";
            error.innerHTML = "";
          }
        };
    }




    
   
    function validate(){
        console.log('in validate')
        if(name.value===''){
            name.className = "error";
            error.innerHTML = 'Please fill the name!'
            return false;
        }

        else if(!regexName.test(name.value)){
            name.className = "error";
            error.innerHTML = 'Invalid Name!'
            return false;
        }

        else if(email.value===''){
            email.className = "error";
            error.innerHTML = 'please fill email!'
            return false;
        }

        else if(!regexMail.test(email.value)){
            email.className = "error";
            error.innerHTML = 'Invalid email!'
            return false;
        }

        else{
            alert("Thank you!")
            return true;
        }
    }

}   