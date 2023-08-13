import { FC, useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import User from './User'

const NavBar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const menuItems = ['Profile', 'Dashboard', 'Log Out']

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className=" absolute bg-black bg-opacity-80 z-40"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link to="/" className="font-bold tracking-wide text-lg text-white">
            AI Real State
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link to="/dashboard" className="text-primary text-md">
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <User
            name="John Smith"
            description="Customer"
            src="https://avatars.githubusercontent.com/u/30373425?v=4"
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-black bg-opacity-70 text-white">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="text-white py-1 tracking-wide  hover:text-primary transition delay-100"
              to=""
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default NavBar
