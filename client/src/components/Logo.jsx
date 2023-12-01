import React from "react"
import logo from "../assets/images/tgn_logo.png"

const Logo = ({ container, image }) => {
  return (
    <div className={container}>
      <img src={logo} alt='tgn_logo' className={image} />
    </div>
  )
}

export default Logo
