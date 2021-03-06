import { FC, useEffect, useState } from "react"
import { SizeInput } from "components/atoms/SizeInput"
import { SizeInputStyled } from "./styles"
import { Size, SizePickerProps } from "./types"
import { calculateSizeFromHeight, calculateSizeFromWidth } from "./utils"

const initialSize: Size = {
  width: 0.80,
  height: 0.50,
}

export const SizePicker: FC<SizePickerProps> = ({imageSize, onChange}) => {

  const [size, setSize] = useState<Size>(initialSize)
  const maxSize = 5 // meters
  const decimalRoundFactor = 100000
  const aspectRation = imageSize && Math.round(imageSize.width / imageSize.height * decimalRoundFactor) / decimalRoundFactor

  useEffect(() => {
    if(!aspectRation)
      return

    const width = initialSize.width
    const newSize =  calculateSizeFromWidth({width, maxSize, aspectRation})
    setSize(newSize)

    if(onChange && newSize.width && newSize.height)
      return onChange(newSize)
  }, [aspectRation, onChange])

  const handleWidthChange = (width: number) => {
    if(!aspectRation)
      return

    const newSize =  calculateSizeFromWidth({width, maxSize, aspectRation})
    setSize(newSize)

    if(onChange && newSize.width && newSize.height)
      return onChange(newSize)
  }

  const handleHeightChange = (height: number) => {
    if(!aspectRation)
      return

    const newSize =  calculateSizeFromHeight({height, maxSize, aspectRation})
    setSize(newSize)

    if(onChange && newSize.width && newSize.height)
      return onChange(newSize)
  }

  return (
    <SizeInputStyled>
      <SizeInput
        id={"poster-size-width"}
        value={size.width}
        label={"width"}
        onChange={handleWidthChange } />
      <SizeInput
        id={"poster-size-height"}
        value={size.height}
        label={"height"}
        onChange={handleHeightChange} />
    </SizeInputStyled>
  )
}

export type { Size }
