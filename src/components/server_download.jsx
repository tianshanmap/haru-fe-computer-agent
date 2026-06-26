
const ServerDownload = ({name,remote_url,onConfirm,onProgress}) => {
  const chunkSizeBytes = 10*1024 * 1024;
  const createDownload = (blob,download_filename) => {
      const downloadUrl = URL.createObjectURL(blob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = downloadUrl;
      downloadAnchor.download = download_filename;
      
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      
      // Clean up memory
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(downloadUrl);
      console.log("Download complete!");
  }
  const handleDownload = async () => {
    try {
      const response = await fetch(remote_url);
 

      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger the click event
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); // Specify the file name
      document.body.appendChild(link);
      link.click();
      // Clean up the DOM and URL
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
    onConfirm();
  };

  const handleChunkDownload = async () => {
    try {
      // 1. Send a HEAD request to get the total file size
      const headResponse = await fetch(remote_url, { method: 'HEAD' });
      const totalSize = parseInt(headResponse.headers.get('content-length'), 10);
      
      if (isNaN(totalSize)) {
        throw new Error("Could not determine file size. Server must provide Content-Length.");
      }

      const chunks = [];
      let startByte = 0;

      // 2. Loop through the file and download chunk by chunk
      while (startByte < totalSize) {
        const endByte = Math.min(startByte + chunkSizeBytes - 1, totalSize - 1);
        
        console.log(`Downloading bytes: ${startByte}-${endByte} of ${totalSize}`);

        const response = await fetch(remote_url, {
          headers: {
            'Range': `bytes=${startByte}-${endByte}`
          }
        });

        if (!response.ok && response.status !== 206) {
          throw new Error(`Failed to download chunk: ${response.statusText}`);
        }

        // Read chunk data as an array buffer
        const chunkData = await response.arrayBuffer();
        chunks.push(chunkData);

        // Track progress
        const progress = Math.min((endByte / totalSize) * 100, 100);
        console.log(`Progress: ${progress.toFixed(2)}%`);

        startByte += chunkSizeBytes;
      }

      // 3. Assemble all chunks into a single Blob
      const finalBlob = new Blob(chunks, { type: headResponse.headers.get('content-type') });

      // 4. Trigger the browser download dialog
      createDownload(finalBlob);

    } catch (error) {
      console.error("Chunk download failed:", error);
    }
  }

  const downloadFileInChunks = async() => {
    // 1. Fetch the resource
    const response = await fetch(remote_url);
    
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    // 2. Get the stream reader and content length
    const reader = response.body.getReader();
    const contentLength = +response.headers.get('Content-Length');
    const download_filename = response.headers.get('filename');   
    let receivedLength = 0;
    const chunks = []; 
    response.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // 3. Read the stream chunk-by-chunk
    while(true) {
      const {done, value} = await reader.read();
      
      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      // Log progress if Content-Length header is present
      if (contentLength) {
        const progressx = ((receivedLength / contentLength) * 100).toFixed(2);
        // console.log(`Download progress: ${progressx}%`);
        onProgress(progressx);
      }
    }

    // 4. Combine chunks into a single Blob
    const blob = new Blob(chunks, { type: "application/octet-stream" });

    createDownload(blob,download_filename);
    // // 5. Trigger client-side browser download
    // const downloadUrl = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = downloadUrl;
    // a.download = name;
    
    // document.body.appendChild(a);
    // a.click();
    
    // // 6. Memory cleanup
    // document.body.removeChild(a);
    // URL.revokeObjectURL(downloadUrl);
  }

  return (
    <div>
      <button onClick={downloadFileInChunks}>
        Remotely Download {name}...
      </button>
    </div>
  );
};
export default ServerDownload;