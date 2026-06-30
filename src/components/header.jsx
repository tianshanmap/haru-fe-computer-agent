import { Link } from 'react-router-dom';
function Header(){
    return(
        <div className="header">
            <Link to="/">Home</Link>
            <Link to="/file-explorer">File Explorer</Link>
            <Link to="/videoman">Video Creator</Link>
            <Link to="/videolist">Video List</Link>
            <Link to="/textEditor">Text Editor</Link>
        </div>
    )
}
export default Header