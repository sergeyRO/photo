import React from 'react'
import { useState } from 'react'
import canceled from '../assets/canceled.svg'

export default function DownLoaderFiles() {
    const [fileUrls, setUrls] = useState([])
  
    const fileToDataUrl = file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
      
        fileReader.addEventListener('load', evt => {
          //console.log(evt)
          resolve(evt.currentTarget.result);
        });
        
        fileReader.addEventListener('error', evt => {
          reject(new Error(evt.currentTarget.error));
        });
        
        fileReader.readAsDataURL(file);
      });
    }
    
    const handleSelect = async (evt) => {
        const files = [...evt.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
        urls.map(url => fileUrls.push(url))
        setUrls([...fileUrls])
      }
    const handleRemove = (index) => {
      fileUrls.splice(index, 1)
      setUrls([...fileUrls])
    }


  return (
    <form>
        <label htmlFor='file'> 
        <div style={{
          pointerEvents: 'none', 
          border:'1px solid black', 
          borderRadius:'5px', 
          width: '600px', 
          height: '75px'
          }}>
          <br/>
          Click to select
        </div>
        </label>
            <input type='file' id='file' accept="image/*" style={{display: "none"}} multiple onChange={handleSelect}/>   
            {
                fileUrls.map((url,index) => 
                <>
                  <div key={index} style={{ position:"relative", marginLeft:"30px", marginTop:"20px", float:"left" }}>
                    <img src={canceled} style={{position:"absolute", margin:"-15px 0 0 120px"}} onClick={() => {handleRemove(index)}}/>
                    <img src={url} style={{width:"150px",height:"150px"}} />
                  </div>
                </>
                )
            }
            
    </form>
  )
}
