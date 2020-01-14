import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import axios from '../../../node_modules/axios';
import { getUsers, deleteUser} from '../../actions/users';

import UserRow from '../../components/UserRow';

const style = {
  width: '60%',
  float: 'right'
};

const rowStyle = {
  margin: '10px',
  width: '300px',
  height: '100px',
  padding: '10px',
};

const sortAgeTypes = {
	up: {
		class: 'sort-up',
		fn: (a, b) => a.age - b.age
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => b.age - a.age
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
}

const sortFirstTypes = {
	up: {
		class: 'sort-up',
		fn: (a, b) =>{
      if (a.firstName > b.firstName) {
          return 1;
      }
      if (b.firstName > a.firstName) {
          return -1;
      }
      return 0;
      }
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => {
      if (a.firstName > b.firstName) {
          return -1;
      }
      if (b.firstName > a.firstName) {
          return 1;
      }
      return 0;
      }
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
}

const sortLastTypes = {
	up: {
		class: 'sort-up',
		fn: (a, b) =>{
      if (a.lastName > b.lastName) {
          return 1;
      }
      if (b.lastName > a.lastName) {
          return -1;
      }
      return 0;
      }
	},
	down: {
		class: 'sort-down',
		fn: (a, b) => {
      if (a.lastName > b.lastName) {
          return -1;
      }
      if (b.lastName > a.lastName) {
          return 1;
      }
      return 0;
      }
	},
	default: {
		class: 'sort',
		fn: (a, b) => a
	}
}

let maxPage;


class UserList extends Component {
  constructor(props) {
    super(props); // You have to run this before you init state
    this.state = {search: '', currentFirstSort: 'default', currentLastSort: 'default',currentAgeSort: 'default', sortType: 'default', currentPage: 1,
    usersPerPage: 3};
  }
 

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUsers());
  }

  handleSearch = e => {
    this.setState({search: e.target.value})
  };

  handleDelete = userId => {
    // axios
    // .delete('http://localhost:8080/api/users/' + userId)
    // .then(response => {
    //   console.log(response);
    //   if(response.request.status === 200) {
    //     window.location.reload(true);;
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    this.props.dispatch(deleteUser(userId));
  };

  onSortFirstChange = () => {
    const { currentFirstSort, currentLastSort, currentAgeSort, sortType} = this.state;
    // const {sortType} = this.state;
		let nextSort;
		
		if(currentFirstSort === 'down') nextSort = 'up';
		else if(currentFirstSort === 'up') nextSort = 'default';
		else if(currentFirstSort === 'default') nextSort = 'down';
		
		this.setState({
      currentFirstSort: nextSort,
      currentLastSort: 'default',
      currentAgeSort: 'default',
      sortType: 'firstName'
		})
  }
  
  onSortLastChange = () => {
    const { currentFirstSort, currentLastSort, currentAgeSort, sortType} = this.state;
    // const {sortType} = this.state;
		let nextSort;
		
		if(currentLastSort === 'down') nextSort = 'up';
		else if(currentLastSort === 'up') nextSort = 'default';
		else if(currentLastSort === 'default') nextSort = 'down';
		
		this.setState({
      currentFirstSort: 'default',
      currentLastSort: nextSort,
      currentAgeSort: 'default',
      sortType: 'lastName'
		})
	}

  onSortAgeChange = () => {
    const { currentFirstSort, currentLastSort,currentAgeSort, sortType} = this.state;
    // const {sortType} = this.state;
		let nextSort;
		
		if(currentAgeSort === 'down') nextSort = 'up';
		else if(currentAgeSort === 'up') nextSort = 'default';
		else if(currentAgeSort === 'default') nextSort = 'down';
		
		this.setState({
      currentFirstSort: 'default',
      currentLastSort: 'default',
      currentAgeSort: nextSort,
      sortType: 'age'
		})
  }
  
  handleClick= event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handlePre = () => {
    if(this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    } 
  }

  handleNext = () => {
    if(this.state.currentPage < maxPage) {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }  
  }
  
  render() {
    const {search, currentFirstSort, currentLastSort, currentAgeSort, sortType, currentPage, usersPerPage} = this.state;
    const { users } = this.props;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    
    

    const filteredUsers = users.data.filter(
      (user) => {
        return (user.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1) || (user.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        || (user.age.toString().indexOf(search) !== -1);
      }
    );

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    maxPage = pageNumbers.length;
    

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <td
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </td>
      );
    });

    let records;
    if(sortType === 'default') {
      records = (
        <tbody>  
            {filteredUsers.slice(indexOfFirstUser,indexOfLastUser).map(user => {
              return (
                <UserRow
                  key={user._id}
                  user={user}
                  handleDelete={this.handleDelete}
                />
              );
            })}
        </tbody>
      )
    } else if(sortType === 'age') {
      records = (
        <tbody>  
            {filteredUsers.sort(sortAgeTypes[currentAgeSort].fn).slice(indexOfFirstUser, indexOfLastUser).map(user => {
              return (
                <UserRow
                  key={user._id}
                  user={user}
                  handleDelete={this.handleDelete}
                />
              );
            })}
        </tbody>
      )
    } else if(sortType === 'firstName') {
      records = (
        <tbody>  
            {filteredUsers.sort(sortFirstTypes[currentFirstSort].fn).slice(indexOfFirstUser, indexOfLastUser).map(user => {
              return (
                <UserRow
                  key={user._id}
                  user={user}
                  handleDelete={this.handleDelete}
                />
              );
            })}
        </tbody>
      )
    } else if(sortType === 'lastName') {
      records = (
        <tbody>  
            {filteredUsers.sort(sortLastTypes[currentLastSort].fn).slice(indexOfFirstUser, indexOfLastUser).map(user => {
              return (
                <UserRow
                  key={user._id}
                  user={user}
                  handleDelete={this.handleDelete}
                />
              );
            })}
        </tbody>
      )
    }

    let usersUI;
    if (users.isLoading) {
      usersUI = <p>Loading</p>;
    } else if (users.error !== '') {
      usersUI = <p style={{ color: 'red' }}>{users.error}</p>;
    } else if (users.data.length !== 0) {
      usersUI = (
        <table>
          <thead>
            <tr>
              <th>Edit</th>
              <th>Delete</th>
              <th>
                First Name
                <button onClick={this.onSortFirstChange}>
								  <i className={`fas fa-${sortFirstTypes[currentFirstSort].class}`}></i>
							  </button>
              </th>
              <th>
                Last Name
                <button onClick={this.onSortLastChange}>
								  <i className={`fas fa-${sortLastTypes[currentLastSort].class}`}></i>
							  </button>
              </th>
              <th>
                Sex
              </th>
              <th>
                Age
                <button onClick={this.onSortAgeChange}>
								  <i className={`fas fa-${sortAgeTypes[currentAgeSort].class}`}></i>
							  </button>
              </th>
            </tr>
          </thead>
          {records}
          <div id="page-numbers">
            <table>
              <thead>
                <tr>
                  <button onClick={this.handlePre}>Pre</button>
                    {renderPageNumbers}
                  <button onClick={this.handleNext}>Next</button> 
                </tr>
              </thead>
            </table>
          </div>
        </table>
      );
    }
    return (
      <div style={style}>
        <h3>Users</h3>
        <div style={rowStyle}>
          <label>
            Search: 
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </label>
        </div>
        {usersUI}
        <Link to="/new">Add User</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(mapStateToProps)(UserList);
