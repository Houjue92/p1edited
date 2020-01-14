const faker = require('faker');
const axios = require('axios');

const fakeMyData = num => {
    for(let n = 1; n < num; n++) {
        const newUser = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            age: faker.random.number({min: 10, max: 50, precision: 1}),
            sex: faker.random.boolean() ? "male" : "female",
            passWord: faker.internet.password(7)
        };
        postUser(newUser);
    }
}

const postUser = user => {
    axios.post('http://localhost:8080/api/users/', user, {headers : {
        "Content-Type": "application/json"
    }}).then(res => console.log(res.data))
    .catch(err => console.log(err))
}

fakeMyData(10);