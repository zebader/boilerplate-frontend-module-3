import React, { Component } from "react";
import auth from "./auth-service";
const { Consumer, Provider } = React.createContext();

export { Consumer };

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {authStore => {
            return (
              <Comp
                login={authStore.login}
                signup={authStore.signup}
                user={authStore.user}
                logout={authStore.logout}
                isLoggedin={authStore.isLoggedin}
                isBusinessAccount={authStore.isBusinessAccount}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    isBusinessAccount: false,
    user: null,
    isLoading: true
  };

  componentDidMount() {
    auth
      .me()
      .then(user => {
        if(user.userType === 'business') {
          this.setState({
            isLoggedin: true,
          user,
          isLoading: false,
          isBusinessAccount: true,
          })
        } else {
          this.setState({
            isLoggedin: true,
            user,
            isLoading: false
          });
        }
      })
      .catch(() => {
        this.setState({
          isLoggedin: false,
          user: null,
          isLoading: false
        });
      });
  }

  signup = user => {
    const { username, password, email, location, userType } = user;
    auth
      .signup({ username, password, email, location, userType })
      .then(user => {
        if(user.userType === 'business') {
          this.setState({
            isLoggedin: true,
            user,
            isBusinessAccount: true,
          });
        } else {
          this.setState({
            isLoggedin: true,
            user
          });
        }
      })
      .catch(({ response: { data: error } }) => {
        this.setState({
          message: error.statusMessage
        });
      });
  };

  login = user => {
    const { username, password, userType } = user;
    console.log(userType)
    auth
      .login({ username, userType, password })
      .then(user => {
        if(user.userType === 'business') {
          this.setState({
            isLoggedin: true,
            user,
            isBusinessAccount: true,
          });
        } else {
          this.setState({
            isLoggedin: true,
            user
          });
        }
      })
      .catch(() => {});
  };

  logout = () => {
    auth
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: null,
          isBusinessAccount: false,
        });
      })
      .catch(() => {});
  };
  render() {
    const { isLoading, isLoggedin, user, isBusinessAccount } = this.state;
    return isLoading ? (
      <div>Loading</div>
    ) : (
      <Provider
        value={{
          isLoggedin,
          isBusinessAccount,
          user,
          login: this.login,
          logout: this.logout,
          signup: this.signup
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AuthProvider;
