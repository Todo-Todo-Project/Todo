import {GoogleLogin} from 'react-google-login';

function LoginGoogle () {
    return (
        <div className='login_with_google'>
            <GoogleLogin
                clientId='680427218088-4n25jtmp99ed3es0jsp0c469uqut6m07.apps.googleusercontent.com'
                buttonText='Login with Google'
                onSuccess={this.responseGoogle}
                onFailure={this.reponseGoogle}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    )
}

export default LoginGoogle