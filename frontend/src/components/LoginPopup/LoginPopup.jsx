import React, { useState } from 'react';
import { useEffect } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
	const [currState, setCurrState] = useState('Sign Up');

	useEffect(() => {
		const handleKeyDown = event => {
			if (event.key === 'Escape') {
				setShowLogin(false);
			}
		};

		// Lắng nghe sự kiện phím trên document
		document.addEventListener('keydown', handleKeyDown);

		// Cleanup event listener khi component unmount
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [setShowLogin]);

	const handleOutsideClick = e => {
		if (e.target.classList.contains('login-popup')) {
			setShowLogin(false);
		}
	};

	return (
		<div className='login-popup' onClick={handleOutsideClick}>
			<form className='login-popup-container'>
				<div className='login-popup-title'>
					<h2>{currState}</h2>
					<img
						onClick={() => setShowLogin(false)}
						src={assets.cross_icon}
						alt=''
					/>
				</div>
				<div className='login-popup-inputs'>
					{currState === 'Sign Up' ? (
						<></>
					) : (
						<input type='text' placeholder='Your name' required />
					)}

					<input type='email' placeholder='Your emal' required />
					<input
						type='password'
						placeholder='Your password'
						required
					/>
				</div>
				<button>
					{currState === 'Sign Up' ? 'Create account' : 'Login'}
				</button>
				<div className='login-popup-condition'>
					<input type='checkbox' required />
					<p>
						By continuing, i agree to the terms of use & privacy
						policy
					</p>
				</div>
				{currState === 'Login' ? (
					<p>
						Create a new account?{' '}
						<span onClick={() => setCurrState('Sign Up')}>
							Click here
						</span>
					</p>
				) : (
					<p>
						Already have a account{' '}
						<span onClick={() => setCurrState('Login')}>
							Login here
						</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default LoginPopup;
