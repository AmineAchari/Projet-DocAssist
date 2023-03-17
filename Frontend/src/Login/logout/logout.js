import React from 'react'
import './Logout.css'
import SubmitButton from '../SubmitButton/SubmitButton'
import UserStore from '../UserStore'


class Logout extends React.Component {
    async dologout() {

        try{
            let res = await fetch('/logout', {
                method : 'post',
                headers: {
                    'Accept': 'application/json',
                    'content-type' : 'application/json'
                }    
            });
            let result = await res.json();

            if (result && result.success){
                UserStore.isLoggedIn = false;
                UserStore.username = '';
            }

            else{
                UserStore.loading = false;
                UserStore.isLoggedIn = false;
            }
        }

        catch(e) {

            console.log(e)

        }

    }
    render(){
        return (
            <>
                    <SubmitButton
                        text={'Logout'}
                        disabled={false}
                        onClick={() => this.dologout()}
                    />
            </>
        )

    }
    
}

export default Logout