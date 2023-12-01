// import { useEffect } from "react";
import { Button, Loader, Menu, Table } from "@mantine/core";
import { useGetContactQuery } from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
// import { addContacts } from "../redux/service/contactSlice";
import { FiHeart } from "react-icons/fi";
import {FaHeart} from "react-icons/fa"
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";
import { AiOutlineMenu,AiOutlineClose } from "react-icons/ai";
import {BsFillPersonFill} from "react-icons/bs"
import { toggleNavbar } from "../redux/service/navbarSlice";
import { removeFavourite } from "../redux/service/contactSlice";
// import 'animate.css';
import { Link,NavLink } from "react-router-dom";
import { toggleDarkMode } from "../redux/service/darkModeSlice";
import Navbar from "./Navbar";

const Favourite = () => {
  const token = Cookies.get("token");
  const { isLoading } = useGetContactQuery(token);
  const {mode} = useSelector(state=>state.darkMode);
  // const [deleteContact] = useDeleteContactMutation();
  // const contacts = useSelector((state) => state.contactSlice.contacts);
  const searched = useSelector((state) => state.contactSlice.searched);
  const isOpen = useSelector((state) => state.navbar.isOpen);
  const { favourite } = useSelector((state) => state.contactSlice);
  // console.log(favourite);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(addContacts(data?.contacts?.data));
  // }, [data, dispatch]);

  const rows = favourite
    ?.filter((item) => {
      if (searched === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searched.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    ?.map((contact) => {
      console.log(contact);

      return (
        <tr className="contact-list" key={contact?.id}>
          <td className="hidden md:table-cell">
            {contact?.name === null ? "exampleName" : contact?.name}
          </td>
          <td>
            {contact?.email === null ? "example@gmail.com" : contact?.email}
          </td>
          <td className="hidden lg:table-cell">
            {contact?.phone === null ? "-" : contact?.phone}
          </td>
          <td className="hidden lg:table-cell">
            {contact?.address === null ? "-" : contact?.address}
          </td>
          <td className="del-icon">
            <div className="flex justify-end">
              <Menu width={200} shadow="md">
                <Menu.Target>
                  <Button 
                      onClick={() => dispatch(removeFavourite(contact))} variant="outline">
                    <FiHeart
                      className=" text-2xl fill-blue-500"
                    />
                  </Button>
                </Menu.Target>
              </Menu>
            </div>
          </td>
        </tr>
      );
    });

  if (favourite.length === 0) {
    return (
      <>
        {/* nav  */}
       <nav className={`${mode ?"bg-white" : "bg-slate-900"} p-2 flex items-center w- justify-between space-x-5 cursor-pointer fixed z-40 top-0 left-0 right-0`}>
           <div className="flex items-center space-x-3">
           <div onClick={() => dispatch(toggleNavbar())} className="">
              {
                isOpen ? 

              <AiOutlineMenu className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/> 
              :
              <AiOutlineMenu className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}/>
              }
            </div>
           <img className='w-[40px] hidden md:block' src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png" alt="" />
           <h1 className='text-[#5f6368] text-2xl'>Friends</h1>
           {/* <div className="lg:space-x-24">
           <HiSearch onClick={() => setClick(!click)} className='absolute lg:top-[13px] md:top-[9px] top-[3px] lg:ms-[7rem] md:ms-3 hover:bg-[#3c404314] cursor-pointer w-12 h-12 lg:w-10 lg:h-10 p-3 hover:rounded-full duration-100'/><input type="text" placeholder='Search' className={`lg:w-[600px] md:w-[400px] w-[12rem] p-3 bg-[#3c404314] outline-none rounded-lg md:px-16 pe-1 cursor-pointer absolute top-[5px] left-0 md:static bg-white ms-2 lg:ms-auto shadow shadow-gray-950 ${click ? "hidden" : "block"} md:bg-transparent md:block`}/> 
           <AiOutlineClose onClick={() => setClick(!click)} className={`absolute top-[20px] left-[170px] md:static ${click ? "hidden" : "block"} md:hidden`}/>
           </div> */}
			<SearchInput />
           </div>
              <div className='flex items-center lg:space-x-5 space-x-2'>
                    <label htmlFor="toggleB" className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input onClick={()=>dispatch(toggleDarkMode())} type="checkbox" id="toggleB" className="sr-only" defaultChecked={!mode}/>
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                      </div>
                    </label>
                {/* <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='w-10 h-10' alt="" /> */}
                <UserMenu/>
              </div>
        </nav>
        {/* nav  */}

        <div 
				className={`w-[65%] md:w-[14rem] absolute h-screen lg:h-96 lg:top-[50px] z-50 text-center ${mode ?"bg-white" : "bg-slate-900"} shadow lg:shadow-none shadow-black cursor-pointer my-0 lg:my-5 ${
					isOpen ? "left-0" : "left-[-400px]"
				}`}
			>
				<Link to={"/create"}>
					<div
						className={`lg:flex lg:flex-row hidden items-center space-x-2 p-2 ms-0 rounded-3xl shadow shadow-black hover:text-blue-800 hover:bg-blue-100  ${mode ?"bg-white" : "bg-slate-900"} hover:shadow-md hover:shadow-black`}
		
					>
						<svg
							className="me-1"
							width="36"
							height="36"
							viewBox="0 0 36 36"
						>
							<path fill="#34A853" d="M16 16v14h4V20z"></path>
							<path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
							<path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
							<path fill="#EA4335" d="M20 16V6h-4v14z"></path>
							<path fill="none" d="M0 0h36v36H0z"></path>
						</svg>
						<h1 className="text-sm">Create Contacts</h1>
					</div>
				</Link>

				<div className="flex lg:hidden items-center ms-2 mt-2 space-x-3">
					<img
						src="https://logodownload.org/wp-content/uploads/2014/09/google-logo-1.png"
						className="h-6"
						alt=""
					/>
					<span className="text-2xl">Friends</span>
					<AiOutlineClose
						className="ms-2"
						onClick={() => dispatch(toggleNavbar())}
					/>
				</div>

				<div className="">
					<ul className="space-y-0 mt-6">
						<NavLink
							to="/"
							className="space-x-5 flex items-center p-3 px-5 text-sm"
						>
							<BsFillPersonFill className="" />
							<p className="">Contacts</p>
						</NavLink>
						<NavLink
							to="/favourite"
							className="space-x-5 flex items-center p-3 px-5"
						>
							<FaHeart className="" />
							<p className="">Favourite</p>
						</NavLink>
					</ul>
				</div>
			</div>

        <div className={`flex justify-center items-center h-screen`}>
          {/* <img
            className=" animate__animated animate-pulse"
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?size=626&ext=jpg&uid=R74182628&ga=GA1.2.647782033.1656313783&semt=ais"
            alt=""
          /> */}
          <iframe src="https://embed.lottiefiles.com/animation/85023" className=""></iframe>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="grape" variant="dots" />;
      </div>
    );
  }

  return (
    <>
      {/* nav  */}
      <Navbar/>

      {/* nav  */}

      <div className="flex justify-center md:justify-start">
        <div
          className={`absolute ${isOpen ? "lg:left-[305px]" : "lg:left-0"} ${
            isOpen ? "lg:px-0" : "lg:px-3"
          } duration-500 transition-all`}
        >
          <div className=" mt-10">
            <h3 className=" text-2xl">Your Favourite</h3>
          </div>
          <div className="lg:w-[75vw] w-screen  flex justify-start pt-0 md:pt-10 text-white">
            <Table className="">
              <thead className="">
                <tr className="">
                  <th className="hidden md:table-cell">Name</th>
                  <th className="">Email</th>
                  <th className="hidden lg:table-cell">Phone Number</th>
                  <th className="hidden lg:table-cell">Address</th>
                </tr>
              </thead>
              <tbody className="">{rows}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
