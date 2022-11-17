import {useState} from 'react'


const NarBar = () => {

    const [open, setopen] = useState(true);

    const Menus = [
        { title: "Dashboard", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Chart.png?raw=true" },
        { title: "Inbox", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Folder.png?raw=true" },
        { title: "Accounts", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/User.png?raw=true", gap: true },
        { title: "Schedule ", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Calendar.png?raw=true" },
        { title: "Search", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Search.png?raw=true" },
        { title: "Analytics", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Chart_fill.png?raw=true" },
        { title: "Files ", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Chat.png?raw=true", gap: true },
        { title: "Setting", src: "https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/Setting.png?raw=true" },
      ];

  return (
    <div className='flex'>
      <div className={`${open ? 'w-72' : 'w-20'} duration-500 w-72  h-screen bg-blue-900 relative `}>
      <img 
      src='https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/control.png' alt='logo' 
      className= {`absolute cursor-pointer -right-3 top-9 w-7 border-2 rounded-full ${!open && 'rotate-180'}`}
      onClick={()=> setopen(!open)}
      />
      <div className='flex gap-x-4 items-center m-6'>
       <img
       src='https://github.com/Sridhar-C-25/sidebar_reactTailwind/blob/main/src/assets/logo.png?raw=true'
       alt='logo'
       className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`}
       />
       <h1  className={`text-white origin-left font-medium text-xl duration-200 ${ !open && "scale-0" }`}> Designer </h1>
      </div>

      <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-gray-800 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={Menu.src} className='ml-4' />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='p-7 text-2xl border-blue-300 font-semibold flex-1 h-screen'>
        <h1>Home page</h1>
      </div>
    </div>
  )
}

export default NarBar


