const axios = require('axios');
const userId = "5e09eeedb2f3bd20dcb82cf4";

axios
    .delete('http://localhost:8080/api/users/' + userId)
    .then(response => {
      console.log(response);
      // if(response.request.status === 200) {
      //   this.props.history.push('/');
      // }
    })
    .catch(err => {
      console.log(err);
    });