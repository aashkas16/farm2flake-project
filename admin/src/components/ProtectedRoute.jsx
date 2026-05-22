import { Navigate } from "react-router-dom"

export default function ProtectedRoute({

  children

}) {

  const admin =
    sessionStorage.getItem("admin")



  if (!admin) {

    return <Navigate to="/login" />

  }



  return children

}