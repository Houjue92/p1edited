import React from 'react';
import {Link} from 'react-router-dom'

const UserRow = props => {
  return (
    <tr>
      <td 
        // style={{ cursor: 'pointer' }}
        //onClick={props.getUserDetail.bind(this, props.user._id)}
        // onclick={props.handleDelete(props.user._id)}
      >
        <Link to={"/" + props.user._id}>Edit</Link>
      </td>
      <td >
        <button
           onClick={() => props.handleDelete(props.user._id)}
        >
          DELETE
        </button>
      </td>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.sex}</td>
      <td>{props.user.age}</td>
    </tr>
  );
};

export default UserRow;
