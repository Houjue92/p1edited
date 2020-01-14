import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../node_modules/axios';
import * as userActions  from '../../actions/users';

const style = {
  width: '50%',
  float: 'left'
};
const formStyle = {
  margin: 'auto',
  padding: '50px',
};
const rowStyle = {
  margin: '10px',
  width: '300px',
  height: '100px',
  padding: '10px',
};

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {firstName:'', lastName:'', sex:'', age:null, passWord:'', errors: {
      firstName: '',
      lastName: '',
      sex:'',
      age:'',
      password: '',
      repeat: ''
    }};
  }

  
  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch(createUser(user));
  };
  
  handleInputChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let errors = this.state.errors;

  switch (nam) {
    case 'firstName': 
      errors.firstName = 
        val.length < 3
          ? 'Frist Name must be at least 3 characters long!'
          : '';
      break;
    case 'lastName': 
      errors.lastName = 
        val.length < 3
          ? 'Last Name must be at least 3 characters long!'
          : '';
      break;
    case 'sex': 
      errors.sex = 
        (val.toString() === 'male' || val.toString() === 'female')
          ? ''
          : 'Input can only be male or female!';
      break;
    case 'age': 
      errors.age = 
        val.length < 1
          ? 'Age input can not be empty'
          : '';
      break;
    case 'passWord': 
      errors.password = 
        val.length < 3
          ? 'Password must be at least 3 characters long!'
          : '';
      break;
    case 'repeat': 
      // var firstInput = document.getElementById("first").value;
      // var secondInput = document.getElementById("second").value;
      errors.repeat = 
        val === this.state.passWord
          ? ''
          : 'Password must be match!';
      break;
    // case 'email': 
    //   errors.email = 
    //     validEmailRegex.test(value)
    //       ? ''
    //       : 'Email is not valid!';
    //   break;
    // case 'password': 
    //   errors.password = 
    //     value.length < 8
    //       ? 'Password must be 8 characters long!'
    //       : '';
    //   break;
    default:
      break;
  }
    this.setState({errors, [nam]: val});
  };
 
  
  handleSubmit = e => {
    e.preventDefault(); // prevent Default HTML action
    let user = { firstName: this.state.firstName, lastName: this.state.lastName,
      sex: this.state.sex, age: this.state.age, passWord: this.state.passWord
    }
    if(validateForm(this.state.errors)) {
      console.info('Valid Form');
      this.props.createUser(user,this.props.history);
    }else{
      alert('Invalid Form');
    }
    
    // axios
    // .post('http://localhost:8080/api/users', { firstName: this.state.firstName, lastName: this.state.lastName,
    // sex: this.state.sex, age: this.state.age, passWord: this.state.passWord })
    // .then(response => {
    //   console.log(response);
    //   if(response.request.status === 200) {
    //     this.props.history.push('/');
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  };


  render() {
    const {errors} = this.state;
    let currentUserUI;
    currentUserUI = (
      <form style={formStyle} onSubmit={this.handleSubmit}>
        <div style={rowStyle}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              //value={this.state.firstName}
              onChange={this.handleInputChange}
            />
            <div>
              {errors.firstName.length > 0 && <span className='error'>{errors.firstName}</span>}  
            </div>            
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              //value={this.state.lastName}
              onChange={this.handleInputChange}
            />
            <div>
              {errors.lastName.length > 0 && <span className='error'>{errors.lastName}</span>}  
            </div>
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Sex:
            <input
              type="text"
              name="sex"
              //value={this.state.sex}
              onChange={this.handleInputChange}
            />
            <div>
              {errors.sex.length > 0 && <span className='error'>{errors.sex}</span>}  
            </div>
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Age:
            <input
              type="number"
              name="age"
              //value={this.state.age}
              onChange={this.handleInputChange}
            />
            <div>
              {errors.age.length > 0 && <span className='error'>{errors.age}</span>}  
            </div>
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Password:
            <input
              type="password"
              id="first"
              name="passWord"
              //value={this.state.passWord}
              onChange={this.handleInputChange}
            />
            <div>
              {errors.password.length > 0 && <span className='error'>{errors.password}</span>}  
            </div>
          </label>
        </div>
        <div style={rowStyle}>
          <label>
            Repeat:
            <input
              type="password"
              id="second"
              name="repeat"
              //value={this.state.passWord}
              onChange={this.handleInputChange}
            />
            <div>
              {errors.repeat.length > 0 && <span className='error'>{errors.repeat}</span>}  
            </div>
          </label>
        </div>

        <div style={rowStyle}>
          <input type="submit" value="Save Changes" />
        </div>
      </form>
    );
    // const { currentUser } = this.props;
    // console.log(currentUser);
    // let currentUserUI;
    // if (currentUser.isLoading) {
    //   currentUserUI = <p>Loading</p>;
    // } else if (currentUser.error !== '') {
    //   currentUserUI = <p style={{ color: 'red' }}>{currentUser.error}</p>;
    // } else if (currentUser.data.id) {

    // }
    return (
      <div style={style}>
        <h3>Create User</h3>
        {currentUserUI}
      </div>
    );
  };
}



const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: (user, history) => {
      dispatch(userActions.createUser(user, history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);


