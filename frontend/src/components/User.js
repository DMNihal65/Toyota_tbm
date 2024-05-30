import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { fetchUserFail, fetchUserRequest, fetchUserSuccess } from "../redux";

function User(props) {
 
  const { fetchUsers } = props;
  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, users, error } = props.users;
  return (
    <div>
      User
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>have error {error}</h1>
      ) : (
        users.map((user) => {
          return <h1>{user.id}</h1>;
        })
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(fetchUsers());
    },
  };
};

const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((result) => {        
        dispatch(fetchUserSuccess(result.data));
      })
      .catch((err) => {
        console.log("have error", err);
        dispatch(fetchUserFail(err.message));
      });
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
