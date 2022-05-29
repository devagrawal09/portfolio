import fs from "fs"
import { Canvas, Image, loadImage } from "canvas"

const bgSrc = `${process.cwd()}/src/images/generated-card-bg.png`
const bgImage = loadImage(bgSrc)

interface Source {
  src: string
  img?: Image
  x?: number
  y?: number
  dWidth?: number
  dHeight?: number
}

const mergeImages = async (sources: Source[] = [], targetUrl: string) => {
  const images = await Promise.all(
    sources.map(async source => {
      if (source.img) {
        console.log(`Already loaded ${source.src}`)
        return source
      }
      console.log(`Loading image ${source.src}`)
      const img = await loadImage(source.src)
      source.img = img
      console.log(`Loaded image ${source.src}`)
      return source
    })
  )

  const canvas = new Canvas(1200, 627)

  const ctx = canvas.getContext("2d")

  images.forEach(({ img, ...source }) => {
    ctx.globalAlpha = 1

    return ctx.drawImage(
      img,
      source.x || 0,
      source.y || 0,
      source.dWidth ? source.dWidth : img.width,
      source.dHeight ? source.dHeight : img.height
    )
  })

  const buffer = canvas.toBuffer("image/png")

  return fs.promises.writeFile(targetUrl, buffer)
}

export const mergeWithBackground = async (fgImg, targetUrl) => {
  const fgSrc = fgImg.absolutePath
  if (!fgSrc) {
    throw new Error(`Source image for ${targetUrl} not found`)
  }

  const imageData = fgImg.childImageSharp.gatsbyImageData

  const maxHeight = 420
  const maxWidth = 1140
  const maxRatio = maxWidth / maxHeight

  let dWidth = imageData.width
  let dHeight = imageData.height

  const ratio = imageData.width / imageData.height

  if (ratio > maxRatio) {
    dWidth = maxWidth
    dHeight = maxWidth / ratio
  } else {
    dHeight = maxHeight
    dWidth = maxHeight * ratio
  }

  const x = (1200 - dWidth) / 2
  const y = (480 - dHeight) / 2 + 145

  console.log(`Merging ${fgSrc} with ${bgSrc}`)

  await mergeImages(
    [
      { src: bgSrc, x: 0, y: 0, img: await bgImage },
      { src: fgSrc, x, y, dWidth, dHeight },
    ],
    targetUrl
  )

  console.log(`Generated ${targetUrl}`)
}
