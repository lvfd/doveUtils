// import $ from 'jquery'
// import other from './other.js'
import test from './public/test.bower'

function component() {
   const element = document.createElement('div');
   element.innerHTML = 'Hello World111';

   return element;
 }
 const test2 = () => {
   console.log('test2')
 }

 document.body.appendChild(component());
 test()

 // other()

 // console.log($);