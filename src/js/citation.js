export function setvalue(a) {
  alert(a);
    // console.log(a);
  //  const b= document.getElementById('root__anyof_select').value = '2';
    // console.log(b);
  }
  if (document.readyState === 'complete') {

    alert("aass");
  }

//   window.load(function () {
//     alert('page is loaded');

//     setTimeout(function () {
//         alert('page is loaded and 1 minute has passed');   
//     }, 60000);

// });

  let stateCheck = setInterval(() => {
    if (document.readyState === 'complete') {
      clearInterval(stateCheck);
      // document ready
      alert("onreadystatechange");
    }
  }, 100);