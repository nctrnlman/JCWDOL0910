import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function NavbarDashboardDrawer() {
  return (
    <div className="flex-none lg:hidden">
      <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
        <GiHamburgerMenu />
      </label>
    </div>
  );
}

export default NavbarDashboardDrawer;
