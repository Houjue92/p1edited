import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import UserList from '../UserList';
import UserDetail from '../UserDetail';
import CreateUser from '../CreateUser';




/* App component */
class App extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact={true} path="/" component={UserList} />
              <Route path="/new" component={CreateUser}/>
              <Route path="/:userId" component={UserDetail} />
            </Switch>
          </div>
        </BrowserRouter>
      );
    }
  }




export default App;