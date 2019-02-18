window.addEventListener('load',init,false);
function init(){

    var name = document.getElementById('name');               
    var email = document.getElementById('email');    
    var phone = document.getElementById('phone');    
    var button = document.getElementById('btn');
    var form=document.getElementsByTagName('form')[0];
    


    var regexName = /^([A-Za-z\s]*)+$/;
    var regexMail = /[^@]+@[^\.]+\..+/;
    // var regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]$/;

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

    checkField(name, regexName, 'invalid name!');
    checkField(email, regexMail, 'invalid eMail!');

    form.addEventListener('submit',function(e){validate();e.preventDefault()});
   
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
        /*wenn true zurück gegeben wird, dann wird auch onsubmit ausgeführt*/
        else{
            alert("Thank you!")
            return true;
        }
    }
    // if (address.value == "")                               
    // { 
    //     window.alert("Please enter your address."); 
    //     name.focus(); 
    //     return false; 
    // } 
       
    // if (email.value == "")                                   
    // { 
    //     window.alert("Please enter a valid e-mail address."); 
    //     email.focus(); 
    //     return false; 
    // } 
   
    // if (email.value.indexOf("@", 0) < 0)                 
    // { 
    //     window.alert("Please enter a valid e-mail address."); 
    //     email.focus(); 
    //     return false; 
    // } 
   
    // if (email.value.indexOf(".", 0) < 0)                 
    // { 
    //     window.alert("Please enter a valid e-mail address."); 
    //     email.focus(); 
    //     return false; 
    // } 
   
    // if (phone.value == "")                           
    // { 
    //     window.alert("Please enter your telephone number."); 
    //     phone.focus(); 
    //     return false; 
    // } 
   
    // if (password.value == "")                        
    // { 
    //     window.alert("Please enter your password"); 
    //     password.focus(); 
    //     return flase; 
    // } 
   
    // if (what.selectedIndex < 1)                  
    // { 
    //     alert("Please enter your course."); 
    //     what.focus(); 
    //     return false; 
    // } 
}   