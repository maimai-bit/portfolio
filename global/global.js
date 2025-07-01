function confirmEmailRedirect(e) {
    e.preventDefault(); 
    const confirmed = confirm("You are being redirected to your email. Proceed?");
    if (confirmed) {
      
      window.location.href = "mailto:maikellyjordan@gmail.com?subject=Contact&body=Hi%20Maikelly%2C";
    }
  }

  