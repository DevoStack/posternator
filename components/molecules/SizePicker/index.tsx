import { FC, useState } from "react"
import { SizeInput } from "components/atoms/SizeInput"
import { SizeInputStyled } from "./styles"
import { PosterSize, SizePickerProps } from "./types"

export const SizePicker: FC<SizePickerProps> = () => {
  const initialSize: PosterSize = {
    width: 0.40,
    height: 0.50,
  }
  const [size, setSize] = useState<PosterSize>(initialSize)
  const handleWidthChange = (width: number) => {
    setSize({
      ...size,
      width,
    })
  }

  const handleHeightChange = (height: number) => {
    setSize({
      ...size,
      height,
    })
  }
  return (
    <SizeInputStyled>
      <SizeInput
        id={"poster-size-width"}
        value={size.width}
        onChange={handleWidthChange } />
      <SizeInput
        id={"poster-size-height"}
        value={size.height}
        onChange={handleHeightChange} />
    </SizeInputStyled>
  )
}