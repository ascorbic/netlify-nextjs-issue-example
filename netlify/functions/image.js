const { builder } = require('@netlify/functions')
const sharp = require('sharp')
const fetch = require('node-fetch')
const imageType = require('image-type')
const isSvg = require('is-svg')
const etag = require('etag')
const imageSize = require('image-size')
// 6MB is hard max Lambda response size
const MAX_RESPONSE_SIZE = 6291456

function getImageType(buffer) {
  const type = imageType(buffer)
  if (type) {
    return type
  }
  if (isSvg(buffer)) {
    return { ext: 'svg', mime: 'image/svg' }
  }
  return null
}

const IGNORED_FORMATS = new Set(['svg', 'gif'])
const OUTPUT_FORMATS = new Set(['png', 'jpg', 'webp', 'avif'])

// Function used to mimic next/image
const handler = async (event) => {
  console.time("elapsed")
  const [, , url, w = 500, q = 75] = event.path.split('/')
  // Work-around a bug in redirect handling. Remove when fixed.
  const parsedUrl = decodeURIComponent(url).replace('+', '%20')
  const width = parseInt(w)
console.log({parsedUrl})
  if (!width) {
  console.timeEnd("elapsed")

    return {
      statusCode: 400,
      body: 'Invalid image parameters',
    }
  }

  const quality = parseInt(q) || 60

  let imageUrl
  let isRemoteImage = false
  // Relative image
  if (parsedUrl.startsWith('/')) {
    const protocol = event.headers['x-nf-connection-proto'] || event.headers['x-forwarded-proto'] || 'http'
    imageUrl = `${protocol}://${event.headers.host || event.hostname}${parsedUrl}`
  } else {
    isRemoteImage = true
    // Remote images need to be in the allowlist
    const allowedDomains = process.env.NEXT_IMAGE_ALLOWED_DOMAINS
      ? process.env.NEXT_IMAGE_ALLOWED_DOMAINS.split(',').map((domain) => domain.trim())
      : []

    if (!allowedDomains.includes(new URL(parsedUrl).hostname)) {
  console.timeEnd("elapsed")

      return {
        statusCode: 403,
        body: 'Image is not from a permitted domain',
      }
    }
    imageUrl = parsedUrl
  }

  console.log({imageUrl})
  console.timeLog("elapsed")

  const req = fetch(imageUrl)
  console.log(req)
  console.timeLog("elapsed")

  const imageData = await req
console.log("fetched")
console.timeLog("elapsed")
if (!imageData.ok) {
    console.error(`Failed to download image ${imageUrl}. Status ${imageData.status} ${imageData.statusText}`)
  console.timeEnd("elapsed")

    return {
      statusCode: imageData.status,
      body: imageData.statusText,
    }
  }
console.log("buffering")
console.timeLog("elapsed")

  const bufferData = await imageData.buffer()
  console.timeLog("elapsed")
console.log("buffered")
  const type = getImageType(bufferData)
  console.timeLog("elapsed")
  console.log("buffered")
  if (!type) {
  console.timeEnd("elapsed")

    return { statusCode: 400, body: 'Source does not appear to be an image' }
  }

  const dimensions = imageSize(bufferData)
  console.timeLog("elapsed")
console.log("got image size")
  if (width > dimensions.width) {
    console.log("too big. redirecting")
    // We won't upsize images, and to avoid downloading the same size multiple times,
    // we redirect to the largest available size
    const Location = `/nextimg/${url}/${dimensions.width}/${q}`
  console.timeEnd("elapsed")

    return {
      statusCode: 302,
      headers: {
        Location,
      },
    }
  }

  let { ext } = type

  // For unsupported formats (gif, svg) we redirect to the original
  if (IGNORED_FORMATS.has(ext)) {
    return {
      statusCode: 302,
      headers: {
        Location: isRemoteImage ? imageUrl : parsedUrl,
      },
    }
  }

  if (process.env.FORCE_WEBP_OUTPUT === 'true' || process.env.FORCE_WEBP_OUTPUT === '1') {
    ext = 'webp'
  }

  if (!OUTPUT_FORMATS.has(ext)) {
    ext = 'jpg'
  }
console.log("about to process")
  console.timeLog("elapsed")

  // The format methods are just to set options: they don't
  // make it return that format.
  const { info, data: imageBuffer } = await sharp(bufferData)
    .rotate()
    .jpeg({ quality, mozjpeg: true, force: ext === 'jpg' })
    .png({ quality, palette: true, force: ext === 'png' })
    .webp({ quality, force: ext === 'webp' })
    .avif({ quality, force: ext === 'avif' })
    .resize(width, null, { withoutEnlargement: true })
    .toBuffer({ resolveWithObject: true })
console.log("got buffer")
    console.timeLog("elapsed")

  if (imageBuffer.length > MAX_RESPONSE_SIZE) {
    return {
      statusCode: 400,
      body: 'Requested image is too large. Maximum size is 6MB.',
    }
  }
  console.timeEnd("elapsed")

  return {
    statusCode: 200,
    headers: {
      'Content-Type': `image/${info.format}`,
      etag: etag(imageBuffer),
    },
    body: imageBuffer.toString('base64'),
    isBase64Encoded: true,
  }
}

exports.handler = builder(handler)
