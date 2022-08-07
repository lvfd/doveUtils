import $ from 'jquery'

function component() {
   const element = document.createElement('div');

   
   element.innerHTML = 'Hello World111';

   return element;
 }

 document.body.appendChild(component());

 console.log($);