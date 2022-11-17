import {BsFillBookmarksFill, BsJournalBookmark} from 'react-icons/bs';
import {FiSettings} from 'react-icons/fi';
import {FaBriefcaseMedical, FaMoneyCheck} from 'react-icons/fa';
import {AiFillDashboard} from 'react-icons/ai'

const navLinks = [
  {
    path: "/dashboard",
    icon: <AiFillDashboard className='w-5 h-5'/>,
    display: "Dashboard",
  },
  {
    path: "/admissions",
    icon: <BsFillBookmarksFill className='w-5 h-5' />,
    display: "Admission Status",
  },
  {
    path: "/school-fees",
    icon: <FaMoneyCheck className='w-5 h-5'/>,
    display: "School Fees",
  },
  {
    path: "/medical",
    icon: <FaBriefcaseMedical className='w-5 h-5'/>,
    display: "Medical",
  },
  {
    path: "/result",
    icon: <BsJournalBookmark className='w-5 h-5'/>,
    display: "Result",
  },
  {
    path: "/profile-setting",
    icon: <FiSettings className='w-5 h-5'/>,
    display: "Profile Settings",
  }
];

export default navLinks;



