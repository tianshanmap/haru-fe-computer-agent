import { useNavigate } from 'react-router-dom';
function Header(){
  const navigate = useNavigate();
    return(
        <div className="header">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/file-explorer")}>File Explorer</button>
            <button onClick={() => navigate("/videoman")}>Video Creator</button>
        </div>
    )
}
export default Header