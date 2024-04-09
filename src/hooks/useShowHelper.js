import { useEffect, useState } from "react"

export const useShowHelper = () => {

  const [showDropDown, setShowDropDown] = useState(false)
  const [firstClickOut, setFirstClickOut] = useState(0)

  const handleClose = () => {

    setFirstClickOut(prev => prev + 1)

    if(firstClickOut > 1){
      
      setShowDropDown(!showDropDown)
      setFirstClickOut(0)
    }
  }

  const handleOpen = () => {

    setShowDropDown(true)
    setFirstClickOut(prev => prev + 1)
  }

  useEffect(() => {

    if(!showDropDown) return

    document.addEventListener('click',handleClose)

    return () => document.removeEventListener('click',handleClose)


  },[showDropDown, firstClickOut])

  return { showDropDown, handleOpen }
}
