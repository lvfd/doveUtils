// import $ from 'jquery'
import other from './other.js'

function component() {
   const element = document.createElement('div');
   element.innerHTML = 'Hello World111';

   return element;
 }

 document.body.appendChild(component());

 other()

 // console.log($);