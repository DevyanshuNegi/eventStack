
import { v2 as cloudinary } from 'cloudinary'
// import '@/envConfig.ts'

console.log('Cloudinary Config:', {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export async function uploadImage(file: File): Promise<string> {

  const buffer = await file.arrayBuffer()
  const base64 = Buffer.from(buffer).toString('base64')
  const dataURI = `data:${file.type};base64,${base64}`
  console.log("HELO WOLRD")
  console.log("api kes ", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  )

  // console.log("cloudinary ", cloudinary);
  try {
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'vit-bhopal-events',
    })
    // console.log("result ", result);
    return result.secure_url
  }
  catch (error) {
    console.error("cloudinary error ", error)
    return "Error";
  }
  // const result = await cloudinary.uploader.upload(dataURI, {
  //   folder: 'vit-bhopal-events',
  // })
  // return result.secure_url
}

