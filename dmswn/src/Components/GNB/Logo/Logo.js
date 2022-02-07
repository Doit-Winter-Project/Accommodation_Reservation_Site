
import './Logo.css';
import { Link, Route } from 'react-router-dom';


function Logo() {
  function Home(e){
    window.location.href = '/';
  }
  return (
    <div onClick = {Home} className="Logo">
        Logo
    </div>
  );
}

export default Logo;
