import { useEffect, useState } from "react"
import logger from "global/logger"

type useImageUploadProps = {
    image?: File
}

type ImageData = {
  width: number
  height: number
}

export const useImageUpload = ({image}: useImageUploadProps) => {
  const  [imageData, setImageData] = useState<ImageData>()

  // Upload image and get image dimensions
  useEffect(() => {
    if(!image) return

    logger.info({msg: "Image data request started"})

    const body = new FormData()
    body.append("file", image)
    fetch("api/upload", {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        logger.info({msg: "Image data loaded", data})
        setImageData(data.imageData)
      })
      .catch((err) => {
        logger.error({msg: "Image data request failed", err})
      })

  }, [image])

  return imageData
}