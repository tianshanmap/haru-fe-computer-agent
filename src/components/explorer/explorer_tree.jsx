import styles from "./explorer_tree.module.css"
import { 
        bytesToMB,
      } from "../api/utils";

function ExplorerTree({data,
                      list,
                      handleSelection,
                      handleDownload,
                      handleUpload,
                      handleCopy,
                      handleMove,
                      handleDelete,
                      handleView,
                      handleNew,
                      handleNewNotes,
                      handleConvert,
                    }){

  const totalBytes = () => {
    const totalAmount = list.map(item => item.size).reduce((accumulator, currentPrice) => accumulator + currentPrice, 0);  
    return bytesToMB(totalAmount);    
  }
  const handleClickView = (event) => {
    handleView(event);  
  }  
  const handlePreConvert = (event) => {
    const filepath = event.target.getAttribute("name")
    if (filepath.endsWith(".MTS") || filepath.endsWith(".mts")){
      handleConvert(event);
    } else {
      alert("Only MTS file can be converted to mp4");
    }
  }
  const getFilename = (name) => {
    if (name.length > 50){
      return name.substring(1,50);
    } else {
      return name;
    }
  }

  const FileContent = ({name,parent}) => {
    if (name.endsWith(".MTS") || name.endsWith(".mts")){
      return(
        <td>
            <button name={name} parent={parent} onClick={handleClickView} className="link-button">View</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleDelete} className="link-button">Delete</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handlePreConvert} className="link-button">Convert</button>
        </td>);
    } else if (name.endsWith(".notes")) {
      return(
        <td>
            <button name={name} parent={parent} onClick={handleClickView} className="link-button">View</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleDelete} className="link-button">Delete</button>&nbsp;&nbsp;
        </td>);
    } else {
      return(
        <td>
            <button name={name} parent={parent} onClick={handleClickView} className="link-button">View</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
            <button name={name} parent={parent} onClick={handleDelete} className="link-button">Delete</button>&nbsp;&nbsp;
        </td>);
    }       
  }
  return (
    <div className={styles.explorer_container}>
      <div className={styles.explorer_tools}>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleDownload} className="link-button">Download</button>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleUpload} className="link-button">Upload</button>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleMove} className="link-button">Move</button>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleCopy} className="link-button">Copy</button>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleDelete} className="link-button">Delete</button>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleNew} className="link-button">New Folder</button>
          <button name={data.parent + "/" + data.name} parent={data.parent} onClick={handleNewNotes} className="link-button">New Notes</button>
      </div>
      <div className={styles.explorer_table_container}>
        <table className="explorer_table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.table_td_box}>Current Directory : {data.parent + "/" + data.name}</div>
              </td>
              <td>{totalBytes()}</td>
              <td></td>
            </tr>
            <tr>
              <td>
                <div className={styles.table_td_box}>Parent Directory : <a href="#" name={data.parent} onClick={handleSelection}>{data.parent}</a></div>
              </td>
              <td></td>
              <td></td>
            </tr>
            {/* 2. Use .map() to loop through the array and return table rows */}
            {list.map((item) => (
              <tr>
                {item.kind === 'folder' && <td><a href="#" name={item.path} onClick={handleSelection}>{item.name}</a></td>}
                {item.kind === 'folder' && <td></td>}
                {item.kind === 'folder' && <td></td>}
                {item.kind === 'file' && <td>{getFilename(item.name)}</td>}
                {item.kind === 'file' && <td>{bytesToMB(item.size)}</td>}
                {item.kind === 'file' && <td>{item.last_update}</td>}
                {item.kind === 'folder' && <td>
                                            <button name={item.path} parent={item.parent_path} onClick={handleDownload} className="link-button">Download</button>&nbsp;&nbsp;
                                            <button name={item.path} parent={item.parent_path} onClick={handleUpload} className="link-button">Upload</button>&nbsp;&nbsp;
                                            <button name={item.path} parent={item.parent_path} onClick={handleMove} className="link-button">Move</button>&nbsp;&nbsp;
                                            <button name={item.path} parent={item.parent_path} onClick={handleCopy} className="link-button">Copy</button>&nbsp;&nbsp;
                                            <button name={item.path} parent={item.parent_path} onClick={handleDelete} className="link-button">Delete</button>&nbsp;&nbsp;
                                            <button name={item.path} parent={item.parent_path} onClick={handleNew} className="link-button">New</button>
                                            </td>}
                {item.kind === 'file' && <FileContent name={item.path} parent={item.parent_path}/>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ExplorerTree;