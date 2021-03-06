/* IMPORT CSS */
import '../scss/NavBar.scss';

/* IMPORT NODE MODULES & COMPONENTS*/
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Gear } from 'react-bootstrap-icons';

/* IMPORT CONTEXTS */
import AppContext from '../contexts/AppContext';


/* IMPORT INTERFACES */
import IUser from '../Interfaces/IUser';


const NavBar = () => {

    // *appContext* contains all the shared values between the components
    const [appContext, setAppContext] = useContext(AppContext);
  
    // *search* function do the search into the context
    const search = (e : React.ChangeEvent<HTMLInputElement>) => {

      //Get the value of the field
      let theValue : string = e.target.value.toLowerCase();

      //Copy the starting clean list loaded
      let newFilteredUserList : Array<IUser> = [...appContext.usersList];

      //set the parameter to recognize if the search is active
      let filterIsActive : boolean = appContext.filterIsActive;

      //Filter the list and put it into the *filteredUsersList* in the context
      if(theValue !== "")
      {
          filterIsActive = true;
          //this filters searching into the first OR lastname
          newFilteredUserList = newFilteredUserList.filter((user:IUser)=> user.name.first.toLowerCase().startsWith(theValue) || user.name.last.toLowerCase().startsWith(theValue));
          // if you want to filter on first+last do this:
          // newFilteredUserList = newFilteredUserList.filter((user:IUser)=> `${user.name.first.toLowerCase()} ${user.name.last.toLowerCase()} `.startsWith(theValue));
      }
      else
      {
          filterIsActive = false;
      }

      //put it into the *filteredUsersList* in the context
      setAppContext({...appContext, filteredUsersList: newFilteredUserList, filterIsActive});
    }

    return <div id="navbar" className="navbar navbar-light bg-light w-100 d-flex justify-content-center justify-content-md-between">
              <Link to="/" className="navbar-brand d-none d-md-inline"><span className="subtitle">UserList Code Challenge</span></Link>
              <div className="d-flex justify-content-center justify-content-md-between align-items-center">
                <input id="SearchField" className="search-field form-control mr-sm-2" type="search" onChange={(e)=>search(e)} placeholder="Search" aria-label="Search" />
                <Link to="/settings" title="Settings" className="settings-link"><Gear className="gear-icon" /></Link>
              </div>
            </div>
}

export default NavBar;