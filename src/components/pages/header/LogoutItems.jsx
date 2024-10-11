import { signOut } from 'next-auth/react';

import ExitIcon from '../../icons/ExitIcon';

const LogoutItems = ({userName}) => {
return (
    <section className="flex items-center">
            <button
              type="button"
              onClick={() => signOut()}
              className="px-1 py-1 rounded text-md border 
              hover:bg-red-600 hover:text-white mr-4"
            >
              <ExitIcon/>
            </button>
            <span className="text-yellow-200 py-1">
              <span className="hidden lg:inline">Hello, </span>
              {userName}
            </span>
          </section>
)
}
export default LogoutItems;