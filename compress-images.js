const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images';

async function compressImage(inputPath, outputPath, quality = 80) {
  try {
    await sharp(inputPath)
      .jpeg({ quality: quality })
      .toFile(outputPath);
    console.log(`압축 완료: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`압축 실패: ${path.basename(inputPath)}`, error.message);
  }
}

async function compressAllImages() {
  console.log('이미지 압축을 시작합니다...');
  
  for (let i = 1; i <= 28; i++) {
    const inputFile = path.join(inputDir, `p${i}.jpg`);
    const outputFile = path.join(outputDir, `s${i}.jpg`);
    
    if (fs.existsSync(inputFile)) {
      await compressImage(inputFile, outputFile);
    } else {
      console.log(`파일이 없습니다: p${i}.jpg`);
    }
  }
  
  console.log('모든 이미지 압축이 완료되었습니다!');
}

// 스크립트 실행
compressAllImages().catch(console.error); 