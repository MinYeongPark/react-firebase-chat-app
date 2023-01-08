import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import firebase from '../../firebase';
import {getAuth} from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword
} from "firebase/auth";


function LoginPage() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {

    try {
      setLoading(true);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);

      setLoading(false);
    } catch(error) {
      setErrorFromSubmit(error.message)
      setLoading(false);
      console.log(error.message)
      setTimeout(() => {
        setErrorFromSubmit("")
      }, 5000); // 5초 있다 사라지도록 설정
    }
    
  }

  return (
    <div className="auth-wrapper">
      <div style={{textAlign:'center'}}> 
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input 
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        {errors.email && <p>This email field is required</p>}

        <label>Password</label>
        <input 
          name="password"
          type="password"
          {...register("password", {required: true, minLength: 6})} 
        />
        {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}


        

          {errorFromSubmit &&  // 에러가 있다면
            <p>{errorFromSubmit}</p>
          }

        <input type="submit" disabled={loading} />
        <Link style={{color:'gray', textDecoration:'none'}} to='../register'>아직 아이디가 없다면...</Link>

      </form>

    </div>
  )
}

export default LoginPage
