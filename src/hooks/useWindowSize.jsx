import { useEffect,useState } from "react";
import React from 'react'

const useWindowSize = () => {
    const [windowSize,setWindowSize] = useState({
        width: undefined,
        height:undefined
    })

    useEffect(() =>{
        const handleResize = () =>{
            setWindowSize({
                width:innerWidth,
                height:innerHeight
            })
        }
        handleResize()

        window.addEventListener("resize",handleResize)

        //this is to prevent a memory leak
        const cleanUp = () =>{
            //console.log('runs if a useeffect dependency changes')
            window.removeEventListener('resize',handleResize)
        }

        return cleanUp;
    },[])
  return windowSize;
}

export default useWindowSize
