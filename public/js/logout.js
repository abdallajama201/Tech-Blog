const logout = async () => {
    console.log("mmm")
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
if(document.querySelector('#logout') !== null) {
document.querySelector('#logout').addEventListener('click', logout);
}