import { Link } from "react-router-dom"
import Profile from "../Nav/Profile"
import { useSelector } from "react-redux"
const Nav = () => {
  const { isLoggedIn } = useSelector((state) => state.vendor)
  return (
    <section className={`mt-auto h-16 bg-primary`}>
      <nav className="m-auto flex h-full w-11/12 items-center justify-between p-3">
        <div className="clgLogoAndName">
          <Link to="" className="justiy-center flex items-center">
            <h3 className="text-center text-2xl font-bold leading-6 text-white">
              UDHARO
            </h3>
          </Link>
        </div>
        {isLoggedIn && (
          <div className="rightSideMenu">
            <Profile className={"mr-4"} />
          </div>
        )}
      </nav>
    </section>
  )
}

export default Nav
