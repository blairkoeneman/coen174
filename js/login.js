var ID;
var password;
function div_show() {
document.getElementById("popupLogin").style.display = "block";
}
function div_hide(){
document.getElementById("popupLogin").style.display = "none";
}
function getValues(){
ID=document.getElementById("ID");
password=document.getElementById("Password");
}
function check_empty() {
if(document.getElementById('ID').value==""){
	document.getElementById('ID').style.border = "1px solid red";
}
if(document.getElementById('Password').value==""){
	document.getElementById('Password').style.border = "1px solid red";
}
if (document.getElementById('ID').value == "" || document.getElementById('Password').value == "") {
alert("Fill All Fields !");
} else {
getValues();
alert("Form Submitted Successfully...");
div_hide();
}
}

