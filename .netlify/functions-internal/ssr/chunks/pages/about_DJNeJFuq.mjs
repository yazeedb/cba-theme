import '@astrojs/internal-helpers/path';
/* empty css                          */
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, e as createAstro, f as createComponent, g as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes, i as renderComponent, j as renderSlot, k as renderHead } from '../astro_B1jQg0ns.mjs';
import 'kleur/colors';
import 'html-escaper';
import cn from 'classnames';
import { i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_OHtJ4IHC.mjs';
import 'clsx';

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4)
    return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize)
    return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box)
      break;
    if (box.name === boxName)
      return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1)
      return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength)
      return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1)
      return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox)
      return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  // eslint-disable-next-line regexp/prefer-d
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_OHtJ4IHC.mjs'
    ).then(n => n.s).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default ?? await options.src : options.src
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalPath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : resolvedOptions.src;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions, propsToHash, originalPath);
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalPath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$b = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "/Users/yazeed/Desktop/projects/cba-website/node_modules/astro/components/Image.astro", void 0);

const $$Astro$a = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({ ...props, format, widths: props.widths, densities: props.densities })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(props.src) && specialFormatsFallback.includes(props.src.format)) {
    resultFallbackFormat = props.src.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "/Users/yazeed/Desktop/projects/cba-website/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const outDir = new URL("file:///Users/yazeed/Desktop/projects/cba-website/dist/");
					new URL("_astro", outDir);
					const getImage = async (options) => await getImage$1(options, imageConfig);

const CbaLogo = new Proxy({"src":"/_astro/cba-logo.D0sRbK7e.png","width":150,"height":152,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/yazeed/Desktop/projects/cba-website/src/assets/cba-logo.png";
							}
							
							return target[name];
						}
					});

const $$Astro$9 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Nav;
  const links = [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
    { text: "", href: "", isDummy: true },
    { text: "History", href: "/history" },
    { text: "Events", href: "/events" }
  ];
  const parsePathname = (pathname) => pathname.replace(/\//g, "");
  const pathnamesAreEqual = (p1, p2) => parsePathname(p1) === parsePathname(p2);
  return renderTemplate`${maybeRenderHead()}<nav class="relative px-5 py-3 md:p-0 bg-primary-green"> <div class="md:hidden flex items-center"> <button class="navbar-burger text-primary-header-light flex-grow-0"> <svg class="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path> </svg> </button> <a href="/" class="mx-auto"> ${renderComponent($$result, "Image", $$Image, { "id": "top-nav-mobile-logo", "src": CbaLogo, "alt": "CBA Logo", "class": "h-14 w-14" })} </a> </div> <ul class="hidden text-primary-header-light md:flex justify-between max-w-[600px] m-auto p-7 relative"> ${links.map((link) => renderTemplate`<li${addAttribute(cn({
    "text-cta-color font-bold": pathnamesAreEqual(
      link.href,
      Astro2.url.pathname
    )
  }), "class")}> <a${addAttribute(link.href, "href")}>${link.text}</a> ${link.isDummy ? renderTemplate`<a href="/"> ${renderComponent($$result, "Image", $$Image, { "id": "top-nav-desktop-logo", "src": CbaLogo, "alt": "CBA Logo", "class": "z-10 absolute top-2 left-[42%] w-[15%]" })} </a>` : null} </li>`)} </ul> </nav> <div class="navbar-menu relative z-50 hidden"> <div class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div> <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-primary-green overflow-y-auto"> <div class="flex items-center mb-8"> <a class="mr-auto text-3xl font-bold leading-none" href="/"> ${renderComponent($$result, "Image", $$Image, { "id": "side-nav-logo", "src": CbaLogo, "alt": "CBA Logo", "class": "h-14 w-14" })} </a> <button class="navbar-close"> <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> <div> <ul> ${links.filter((link) => !link.isDummy).map((link) => renderTemplate`<li class="mb-1 text-primary-header-light"> <a${addAttribute(link.href, "href")}${addAttribute(cn("block p-4 text-sm", {
    "text-cta-color font-bold": pathnamesAreEqual(
      link.href,
      Astro2.url.pathname
    )
  }), "class")}> ${link.text} </a> </li>`)} </ul> </div> </nav> </div> `;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/Nav.astro", void 0);

const $$Astro$8 = createAstro();
const $$Section = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Section;
  const { containerClass, innerSectionClass } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(cn(containerClass, "py-2"), "class")}> <section${addAttribute(cn("max-w-7xl m-auto py-6 px-4 section-layout", innerSectionClass), "class")}> ${renderSlot($$result, $$slots["default"])} </section> </section>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/Section.astro", void 0);

const $$Astro$7 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer> ${renderComponent($$result, "Section", $$Section, { "containerClass": "text-sm bg-slate-950 text-paragraph-light font-bold md:text-base", "innerSectionClass": "justify-between md:flex-row" }, { "default": ($$result2) => renderTemplate` <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} Circassian Benevolent Association</p> <p>
Designed by
<a href="https://yazeedb.com" class="underline">Yazeed Bzadough</a> </p> ` })} </footer>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/Footer.astro", void 0);

const $$Astro$6 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Nav", $$Nav, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/layouts/Layout.astro", void 0);

const $$Astro$5 = createAstro();
const $$HeroCoverImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$HeroCoverImage;
  const { title, subtitle, backgroundImage } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center relative w-full h-screen bg-cover bg-center"${addAttribute(`background-image: url('${backgroundImage}');`, "style")}> <div class="flex items-center bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"> ${renderComponent($$result, "Section", $$Section, { "containerClass": "w-full", "innerSectionClass": "text-center max-w-[80%] md:max-w-[50%] mx-auto" }, { "default": ($$result2) => renderTemplate` <h1 class="text-3xl sm:text-4xl font-bold text-primary-header-light"> ${title} </h1> <p class="text-base sm:text-xl text-paragraph-light italic"> ${subtitle} </p> ` })} </div> </div>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/HeroCoverImage.astro", void 0);

const $$Astro$4 = createAstro();
const $$Flag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Flag;
  return renderTemplate`${maybeRenderHead()}<svg width="121" height="120" viewBox="0 0 121 120" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M33.8333 70C32.9493 70 32.1014 69.6488 31.4763 69.0237C30.8512 68.3986 30.5 67.5507 30.5 66.6667V33.3333C30.5 32.4493 30.8512 31.6014 31.4763 30.9763C32.1014 30.3512 32.9493 30 33.8333 30H57.1667C58.0459 30.0125 58.8846 30.372 59.5 31L65.2333 36.6667H90.5C91.071 36.6627 91.6335 36.8055 92.1335 37.0813C92.6335 37.3572 93.0543 37.7569 93.3554 38.242C93.6566 38.7272 93.828 39.2816 93.8533 39.8521C93.8787 40.4226 93.757 40.99 93.5 41.5L85.8667 56.6667L93.4333 71.8333C93.6878 72.3383 93.8097 72.8996 93.7875 73.4646C93.7653 74.0296 93.5997 74.5797 93.3063 75.063C93.013 75.5464 92.6015 75.9472 92.1105 76.2277C91.6196 76.5083 91.0654 76.6593 90.5 76.6667H63.8333C62.9541 76.6541 62.1154 76.2947 61.5 75.6667L55.7667 70H33.8333Z" fill="#84CC16"></path> <path d="M33.8333 30C33.8333 28.1591 32.3409 26.6667 30.5 26.6667C28.659 26.6667 27.1666 28.1591 27.1666 30V90C27.1666 91.841 28.659 93.3334 30.5 93.3334C32.3409 93.3334 33.8333 91.841 33.8333 90V30Z" fill="black"></path> </svg>;`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/Flag.astro", void 0);

const $$Astro$3 = createAstro();
const $$People = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$People;
  return renderTemplate`${maybeRenderHead()}<svg width="127" height="120" viewBox="0 0 127 120" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_214_753)"> <path d="M63.5 64.3478C63.5 60.8885 64.8668 57.5708 67.2997 55.1247C69.7326 52.6786 73.0323 51.3044 76.473 51.3044H93.7703C97.2109 51.3044 100.511 52.6786 102.944 55.1247C105.376 57.5708 106.743 60.8885 106.743 64.3478V77.3913C106.743 78.5444 106.288 79.6503 105.477 80.4657C104.666 81.2811 103.566 81.7391 102.419 81.7391H67.8243C66.6774 81.7391 65.5775 81.2811 64.7666 80.4657C63.9556 79.6503 63.5 78.5444 63.5 77.3913C63.5 78.5444 63.0444 79.6503 62.2334 80.4657C61.4225 81.2811 60.3226 81.7391 59.1757 81.7391H24.5811C23.4342 81.7391 22.3343 81.2811 21.5233 80.4657C20.7124 79.6503 20.2568 78.5444 20.2568 77.3913V64.3478C20.2568 60.8885 21.6236 57.5708 24.0565 55.1247C26.4894 52.6786 29.7891 51.3044 33.2297 51.3044H50.527C53.9677 51.3044 57.2674 52.6786 59.7003 55.1247C62.1332 57.5708 63.5 60.8885 63.5 64.3478ZM41.8784 46.9565C38.4377 46.9565 35.138 45.5823 32.7051 43.1362C30.2722 40.6901 28.9054 37.3724 28.9054 33.913C28.9054 30.4537 30.2722 27.136 32.7051 24.6899C35.138 22.2438 38.4377 20.8696 41.8784 20.8696C45.319 20.8696 48.6188 22.2438 51.0517 24.6899C53.4846 27.136 54.8514 30.4537 54.8514 33.913C54.8514 37.3724 53.4846 40.6901 51.0517 43.1362C48.6188 45.5823 45.319 46.9565 41.8784 46.9565ZM85.1216 46.9565C81.681 46.9565 78.3812 45.5823 75.9483 43.1362C73.5154 40.6901 72.1486 37.3724 72.1486 33.913C72.1486 30.4537 73.5154 27.136 75.9483 24.6899C78.3812 22.2438 81.681 20.8696 85.1216 20.8696C88.5623 20.8696 91.862 22.2438 94.2949 24.6899C96.7278 27.136 98.0946 30.4537 98.0946 33.913C98.0946 37.3724 96.7278 40.6901 94.2949 43.1362C91.862 45.5823 88.5623 46.9565 85.1216 46.9565Z" fill="#475569"></path> <path d="M63.5 64.3478C60.0594 64.3478 56.7596 62.9736 54.3267 60.5275C51.8938 58.0814 50.5271 54.7637 50.5271 51.3043C50.5271 47.845 51.8938 44.5273 54.3267 42.0812C56.7596 39.6351 60.0594 38.2609 63.5 38.2609C66.9407 38.2609 70.2404 39.6351 72.6733 42.0812C75.1062 44.5273 76.473 47.845 76.473 51.3043C76.473 54.7637 75.1062 58.0814 72.6733 60.5275C70.2404 62.9736 66.9407 64.3478 63.5 64.3478ZM50.5271 68.6957H76.473C79.9136 68.6957 83.2134 70.0699 85.6463 72.516C88.0792 74.9621 89.446 78.2798 89.446 81.7391V94.7826C89.446 95.9357 88.9904 97.0416 88.1794 97.857C87.3684 98.6724 86.2685 99.1304 85.1216 99.1304H41.8784C40.7315 99.1304 39.6316 98.6724 38.8206 97.857C38.0097 97.0416 37.5541 95.9357 37.5541 94.7826V81.7391C37.5541 78.2798 38.9209 74.9621 41.3538 72.516C43.7867 70.0699 47.0864 68.6957 50.5271 68.6957Z" fill="#1E293B"></path> </g> <defs> <clipPath id="clip0_214_753"> <rect width="86.4865" height="80" fill="white" transform="translate(20.2568 20)"></rect> </clipPath> </defs> </svg>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/People.astro", void 0);

const $$Astro$2 = createAstro();
const $$Book = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Book;
  return renderTemplate`${maybeRenderHead()}<svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M40.5 70C38.7347 69.9926 37.0445 69.2853 35.8 68.0333L33.0333 65.3C32.4131 64.6761 31.6756 64.1811 30.8632 63.8436C30.0508 63.5061 29.1797 63.3326 28.3 63.3333H13.8333C12.9493 63.3333 12.1014 62.9821 11.4763 62.357C10.8512 61.7319 10.5 60.8841 10.5 60V13.3333C10.5 12.4493 10.8512 11.6014 11.4763 10.9763C12.1014 10.3512 12.9493 10 13.8333 10H27.1667C29.7541 10 32.306 10.6024 34.6202 11.7595C36.9345 12.9167 38.9475 14.5967 40.5 16.6667V70Z" fill="#7C2D12"></path> <path d="M40.5 70V16.6667C42.0525 14.5967 44.0655 12.9167 46.3798 11.7595C48.694 10.6024 51.2459 10 53.8333 10H67.1667C68.0507 10 68.8986 10.3512 69.5237 10.9763C70.1488 11.6014 70.5 12.4493 70.5 13.3333V60C70.5 60.8841 70.1488 61.7319 69.5237 62.357C68.8986 62.9821 68.0507 63.3333 67.1667 63.3333H52.7C51.8203 63.3326 50.9491 63.5061 50.1368 63.8436C49.3244 64.1811 48.5869 64.6761 47.9667 65.3L45.2 68.0333C43.9555 69.2853 42.2653 69.9926 40.5 70Z" fill="#7C2D12"></path> </svg>`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/Book.astro", void 0);

const $$Astro$1 = createAstro();
const $$Heart = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Heart;
  return renderTemplate`${maybeRenderHead()}<svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M46.2772 14.9416C47.9862 13.1075 50.0472 11.6364 52.3371 10.6161C54.627 9.59576 57.099 9.04713 59.6055 9.00291C62.112 8.95868 64.6018 9.41976 66.9263 10.3587C69.2507 11.2975 71.3623 12.695 73.135 14.4677C74.9076 16.2403 76.3051 18.3519 77.244 20.6764C78.1829 23.0008 78.644 25.4906 78.5997 27.9972C78.5555 30.5037 78.0069 32.9756 76.9866 35.2655C75.9663 37.5555 74.4952 39.6164 72.6611 41.3254L45.2194 68.8294C44.6409 69.4126 43.9527 69.8755 43.1944 70.1914C42.4361 70.5074 41.6228 70.67 40.8013 70.67C39.9799 70.67 39.1665 70.5074 38.4082 70.1914C37.65 69.8755 36.9617 69.4126 36.3833 68.8294L8.94156 41.3254C7.10746 39.6164 5.63638 37.5555 4.61607 35.2655C3.59576 32.9756 3.04713 30.5037 3.00291 27.9972C2.95868 25.4906 3.41977 23.0008 4.35866 20.6764C5.29755 18.3519 6.69501 16.2403 8.46768 14.4677C10.2403 12.695 12.3519 11.2975 14.6764 10.3587C17.0008 9.41976 19.4906 8.95868 21.9972 9.00291C24.5037 9.04713 26.9756 9.59576 29.2656 10.6161C31.5555 11.6364 33.6164 13.1075 35.3254 14.9416L40.8013 20.4175L46.2772 14.9416Z" fill="#F87171"></path> </svg>;`;
}, "/Users/yazeed/Desktop/projects/cba-website/src/components/svgs/Heart.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const tenants = [
    {
      title: "Cultural Preservation",
      icon: $$Flag,
      description: "To safeguard and share the Circassian culture, language, and traditions through various educational and cultural programs."
    },
    {
      title: "Community Engagement",
      icon: $$Heart,
      description: "To strengthen the Circassian community by organizing events, support groups, and initiatives that foster unity and mutual support."
    },
    {
      title: "Outreach and Education",
      icon: $$Book,
      description: "To educate the wider public about Circassian history and culture, promoting diversity and intercultural dialogue."
    },
    {
      title: "Youth Empowerment",
      icon: $$People,
      description: "To invest in the younger generation, providing them with opportunities to learn, participate, and lead within the community."
    }
  ];
  const res = await fetch(
    "http://localhost:8888/wordpress/wp-json/wp/v2/board_members?per_page=100"
  );
  const posts = await res.json();
  const boardMembers = posts.map((p) => p.acf);
  const teamMap = /* @__PURE__ */ new Map();
  for (const member of boardMembers.reverse()) {
    if (teamMap.has(member.team)) {
      teamMap.get(member.team)?.push(member);
    } else {
      teamMap.set(member.team, [member]);
    }
  }
  const subtitle = `\u201C\u2026study and foster all matters pertaining to the welfare of the
            Circassians in America\u2026 and to strengthen the cooperative ties among
            the Circassians wherever they may be to preserve and nurture the
            Circassian heritage.\u201D`;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> ${renderComponent($$result2, "HeroCoverImage", $$HeroCoverImage, { "title": "Our Mission", "subtitle": subtitle, "backgroundImage": "/cba-photo.jpeg" })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "bg-slate-100" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading text-primary-header-dark">Vision</h2> <p class="section-paragraph text-paragraph-dark">
We envision a world where Circassian culture is widely recognized and
        celebrated, and where our community members are empowered to thrive in a
        multicultural society. Our aim is to build bridges of understanding and
        cooperation, ensuring that the unique traditions and values of the
        Circassian people continue to enrich our diverse world.
</p> ` })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "text-paragraph-light" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading text-primary-header-dark">Tenants</h2> <ul class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${tenants.map((tenant) => renderTemplate`<li class="rounded shadow-md border-2 border-slate-300 p-6 flex justify-center flex-col items-center text-center"> ${renderComponent($$result3, "tenant.icon", tenant.icon, {})} <h3 class="section-heading text-primary-header-dark py-2"> ${tenant.title} </h3> <p class="section-paragraph text-paragraph-dark"> ${tenant.description} </p> </li>`)} </ul> ` })} ${renderComponent($$result2, "Section", $$Section, { "containerClass": "bg-slate-100" }, { "default": ($$result3) => renderTemplate` <h2 class="section-heading text-primary-header-dark">Organization</h2> ${Object.entries(Object.fromEntries(teamMap)).map(
    ([team, members], index) => renderTemplate`<section${addAttribute(cn("ml-3", { "py-6": index > 0 }), "class")}> <h3 class="section-heading-minor text-slate-800 mb-3">${team}</h3> <ul class="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 ml-3"> ${members.map((member) => renderTemplate`<li> <span class="text-slate-700 block font-bold"> ${member.first_name} ${member.last_name} </span> <span class="text-slate-600">${member.position}</span> </li>`)} </ul> </section>`
  )}` })} </main> ` })} `;
}, "/Users/yazeed/Desktop/projects/cba-website/src/pages/about.astro", void 0);

const $$file = "/Users/yazeed/Desktop/projects/cba-website/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, $$HeroCoverImage as a, $$Section as b, $$Picture as c, about as d, getConfiguredImageService as g, imageConfig as i };
