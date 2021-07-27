(function () {
  var list = document.querySelector("#list"),
    form = document.querySelector("form"),
    item = document.querySelector("#item");

    form.addEventListener('submit',function(e){
        e.preventDefault();
        list.innerHTML += '<li>' + item.value + '</li>';
        store();
        item.value = ''
    },false)

    list.addEventListener('click',function(e){
        var t = e.target;
        if(t.classList.contains('checked')){
            t.parentNode.removeChild(t);
        }else{
            t.classList.add('checked');
        }
        store();
    },false)

    function store(){
        window.localStorage.myitems = list.innerHTML;
    }

    function getValues(){
        var storedValues = window.localStorage.myitems;
        if(!storedValues){
            list.innerHTML = '<li>Learn HTML, CSS</li>'+
            '<li>Learn Javascript</li>'+
            '<li>Make a task list </li>'+
            '<li>Hack NASA, Facebook and other social media web</li>'
        }else{
            list.innerHTML = storedValues;
        }
    }
    getValues()
})();
