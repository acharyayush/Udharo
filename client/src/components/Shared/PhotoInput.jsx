import { useEffect, useRef, useState } from "react"
import { BiPhotoAlbum } from "react-icons/bi"
import Button from "./Button"
const PhotoInput = ({ label, isOptional, className, setInputImage }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [showDropText, setShowDropText] = useState(false)
  const fileInput = useRef(null)
  const handleBrowseClick = () => {
    fileInput.current.click()
  }
  const handleFileSelection = (e) => {
    e.preventDefault()
    setSelectedFile(e.target.files?.[0] || e.dataTransfer?.files?.[0])
    setInputImage(e.target.files?.[0] || e.dataTransfer?.files?.[0])
    setShowDropText(false)
    e.stopPropagation()
  }
  useEffect(() => {
    const handleDragOver = (e) => {
      e.preventDefault()
      setShowDropText(true)
    }
    const handleOutsideFileDrop = (e) => {
      e.preventDefault()
      setShowDropText(false)
    }
    document.addEventListener("dragover", handleDragOver)
    document.addEventListener("drop", handleOutsideFileDrop)
    return () => {
      document.removeEventListener("dragover", handleDragOver)
      document.removeEventListener("drop", handleOutsideFileDrop)
    }
  }, [])
  return (
    <div className={`PhotoInput ${className}`}>
      <label className="block text-base font-medium text-gray-900 sm:text-sm">
        {label} {isOptional && "(optional)"}
      </label>
      <div
        className="photoContainer relative mt-1.5 h-[350px] rounded-lg border-2 border-dashed border-brightGreen p-6"
        onDrop={handleFileSelection}
      >
        {!selectedFile && !showDropText && (
          <div
            className="beforePreview text-center"
            onDragOver={() => setShowDropText(true)}
          >
            <BiPhotoAlbum className="mx-auto my-4 text-9xl text-brightGreen" />
            <input
              type="file"
              ref={fileInput}
              accept="image/*"
              hidden
              onChange={handleFileSelection}
            />
            <h3 className="text-2xl">Drag and drop image</h3>
            <span className="my-2 block text-xl">or</span>
            <Button
              value={"Browse Photo"}
              className={"mb-4 rounded-lg text-lg font-medium"}
              onClick={handleBrowseClick}
            />
          </div>
        )}
        {selectedFile && !showDropText && (
          <div className="afterPreview">
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="customer image"
              className="preview absolute left-0 top-0 h-full w-full rounded-md object-cover"
            />
          </div>
        )}
        {showDropText && (
          <div className="dropText absolute left-0 top-[40%] w-full scale-105 text-center text-7xl font-bold text-gray-500">
            DROP HERE
          </div>
        )}
        {/* if preview is on then show clear button */}
        {selectedFile && !showDropText && (
          <Button
            value={"Clear Image"}
            className={"absolute bottom-2 left-1/2 -translate-x-1/2 bg-red-500"}
            onClick={() => setSelectedFile(null)}
          />
        )}
      </div>
    </div>
  )
}

export default PhotoInput
