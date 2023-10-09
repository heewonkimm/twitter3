import * as React from "react"
import { Navigate } from "react-router-dom";
import auth from "../firebase.js";


function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = auth.currentUser; // 유저가 로그인 했는지 여부를 알려줌(유저가 로그인 되어 있다면 firebase가 유저 정보를 줄거임, 로그인 되어 있지 않다면 null값을 줄거임)
  console.log(user)
  if(user === null){
    return <Navigate to="/login"/> // user가 null 이라면 login 페이지로 리다이렉트 시켜줌
  }
  return children
}



// ProtectedRoute 주로 인증된 사용자만 특정 페이지나 컴포넌트에 접근할 수 있도록 하는데 사용(하나의 프로퍼티 children 사용)

export default ProtectedRoute
