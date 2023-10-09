import React, { useState } from "react"
import auth from "../firebase.js"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Input, Switcher, Title, Wrapper, Error, Form } from "../components/auth-components.js"
import GithubButton from "../components/github-btn"
// import { Form } from "react-router-dom"

const errors = {
  "auth/email-already-in-use" : "That email already exits."
}


function CreateAccount(){ 

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{// HTML Input 개체의 React.ChangEvent가 됨
  const { target: {name, value} } = e;
    if(name === "email"){
      setEmail(value)
    } else if(name === "password") {
      setPassword(value)
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setError("");
    if(isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(e){
      
      if(e instanceof FirebaseError){
        setError(e.message)
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <Wrapper>
      <Title>Log Into 🍕</Title>
      <Form onSubmit={onSubmit}>
        <Input 
          onChange={onChange}
          name="email" 
          value={email} 
          placeholder="Email" 
          type="email" 
          required
        />
        <Input 
          onChange={onChange}
          name="password"
          value={password}
          placeholder="password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Login"}/>
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account? <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <GithubButton/>
    </Wrapper>
  )
}

export default CreateAccount