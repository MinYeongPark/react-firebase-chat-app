import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import firebase from '../../firebase';
import {getAuth} from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import md5 from 'md5';
import { getDatabase, ref, set, child } from "firebase/database";


function RegisterPage() {
  const { register, watch, formState: { errors }, handleSubmit } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const password = useRef();
  password.current = watch("password");
  
  const onSubmit = async (data) => {

    try {
      setLoading(true);
      const auth = getAuth();
      let createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password)

      console.log('createdUser', createdUser)

      await updateProfile(createdUser.user, {
        displayName: data.name,
        photoURL: `http:gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
      })

      const database = getDatabase();

      // firebase 데이터베이스에 저장해주기
      await set(child(ref(database, "users"), createdUser.user.uid), {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL
      })

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
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input 
          name="email"
          type="email"
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        {errors.email && <p>This email field is required</p>}

        <label>name</label>
        <input 
          name="name"
          {...register("name", {required: true, maxLength: 10})} 
        />
        {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
        {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum length</p>}

        <label>Password</label>
        <input 
          name="password"
          type="password"
          {...register("password", {required: true, minLength: 6})} 
        />
        {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p>Password must have at least 6 characters</p>}


        <label>Password Confirm</label>
        <input 
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) =>
              value === password.current // 같은지 비교해서 유효성 체크함
          })} 
        />
        {errors.confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
        {errors.confirm && errors.password_confirm.type === "validate" && <p>The passwords do not match</p>}

          {errorFromSubmit &&  // 에러가 있다면
            <p>{errorFromSubmit}</p>
          }

        <input type="submit" disabled={loading} />
        <Link style={{color:'gray', textDecoration:'none'}} to='../login'>이미 아이디가 있다면...</Link>

      </form>

    </div>
  )
}

export default RegisterPage
