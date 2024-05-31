import './style.css'
import { Link } from 'react-router-dom';

function LoginRegister() {
    return (
        <div className='PageWrapper'>
            <div className='Wrapper'>
                <form action="">
                    <h1> Login </h1>
                    <div className='InputBox'>
                        <input type="email" placeholder='Email...' />
                        <i className='bi-person-fill'></i>
                    </div> 
                    <div className='InputBox'>
                        <input type="password" placeholder='Password...' />
                        <i className='bi-lock-fill'></i>
                    </div>
                    <div className="RememberForgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#"> Forgot password? </a>
                    </div>
                    <Link to="/" style={{textDecoration: 'none'}}>
                    <button type='submit'> Login </button>
                    </Link>
                    <div className="ToRegister">
                        <p> 
                            Don't have an account yet? 
                            <a href="#"> Register </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        
    )
}

export default LoginRegister;