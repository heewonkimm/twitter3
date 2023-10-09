import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
import styled from "styled-components"
import auth from "../firebase.js"
import { useNavigate } from "react-router-dom"

const Button = styled.span`
  background-color: white;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 50px;
  border: 0;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
  color: black;
  cursor: pointer;
`
const Logo = styled.img`
  height: 25px;
`

function GithubButton() {
  const navigate = useNavigate();
  const onClick = async() => {
    try {
      const provider = new GithubAuthProvider();
      // await signInWithRedirect(auth, provider)
      await signInWithPopup(auth, provider)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <Button onClick={onClick}>
      <Logo src="/github-mark.svg"/>
      Continue with Github
    </Button>
  )
}

export default GithubButton