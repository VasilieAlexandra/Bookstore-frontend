import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BookIcon from '@mui/icons-material/Book';
import OrdersIcon from '@mui/icons-material/LocalMall';
import { UserAccount } from "./UserAccount";
import { Link, Route, Routes } from "react-router-dom";
import { ExploreBooks } from "../HomePage/ExploreBooks";
import { ManageBooks } from "../../ManageBooks/ManageBooks";
import { Orders } from "./Orders";

interface Props {
  children: JSX.Element | null
}
export const AccountSidebar = ({ children }: Props) => {

    const { collapseSidebar } = useProSidebar();
    return( 
        <div id="sidebar" className="d-flex w-100 h-100 " >
            <Sidebar style={{ display: "flex",height: "91vh"}}>
                
        <Menu>
        <MenuItem
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            >
          </MenuItem>
          <MenuItem icon={<PeopleOutlinedIcon />}  component={<Link to="/account"/>} >Edit Account</MenuItem>
          <MenuItem icon={<BookIcon />} component={<Link to="/account/manageBooks"/>} >Manage Books</MenuItem>
          <MenuItem icon={<OrdersIcon />} component={<Link to="/account/orders"/>}>My Orders</MenuItem>

        </Menu>
 
      </Sidebar> 
      <main className="d-flex me-auto ms-auto justify-content-center aligne-items-center flex-grow-1 row">{children}</main>
        </div>

    );
}