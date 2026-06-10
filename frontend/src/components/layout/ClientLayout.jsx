import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import WhatsappBot from "../whatsapp/WhatsappBot"

export default function ClientLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <WhatsappBot />
      <Footer />
    </>
  )
}
