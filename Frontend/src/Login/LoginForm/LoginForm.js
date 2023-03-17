import './LoginForm.css'
import React from 'react'
import SubmitButton from '../SubmitButton/SubmitButton'
import UserStore from '../UserStore'
import InputField from '../InputField/InputField'
import assets from '../../assets'


class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }
  setInputValue(property, val) {
    val = val.trim();
    if (val.lengh > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }
  resetForm() {
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }
  async doLogin() {
    if (!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }
    this.setState({
      buttonDisabled: true
    })
    try {
      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });
      let result = await res.json();

            if (result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.username = result.username;
            }
            else if(result && result.success === false){
              this.resetForm();
              alert(result.msg)
            }
    }
    catch (e) {
      console.log(e);
      this.resetForm();
    }
  }
  render() {

    return (
      <div className="loginform">
        <img style={{width: "70%"}} src={assets.images.logo} />
        <InputField 
          type='text'
          placeholder='Username'
          value= {this.state.username ? this.state.username : ''}
          onChange={(val) => this.setInputValue('username',val)}
        />
        <br/>
        <InputField 
          type='password'
          placeholder='Password'
          value= {this.state.password ? this.state.password : ''}
          onChange={(val) => this.setInputValue('password',val)}
        />
        <br/>
        <SubmitButton
          text='Login'
          disabled={this.state.buttonDisabled}
          onClick={() => this.doLogin()}
        />

      </div>
    )
  }
}

export default LoginForm