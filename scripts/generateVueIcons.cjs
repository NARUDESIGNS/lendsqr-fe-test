const fs = require("fs");
const path = require("path");

const svgDir = path.resolve(__dirname, "../src/assets/icons");
const outputDir = path.resolve(__dirname, "../src/assets/vue-icons");

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Remove all existing .vue files in the output directory
fs.readdirSync(outputDir).forEach((file) => {
  if (file.endsWith(".vue")) {
    fs.unlinkSync(path.join(outputDir, file));
  }
});

// Utility to convert hyphen-case to PascalCase and append "Icon"
function toComponentName(filename) {
  return (
    filename
      .replace(/\.svg$/, "")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("") + "Icon"
  );
}

// Recursively walk through directories to find .svg files
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, callback);
    } else if (file.endsWith(".svg")) {
      callback(fullPath, file);
    }
  });
}

walkDir(svgDir, (svgPath, file) => {
  const svgContent = fs
    .readFileSync(svgPath, "utf8")
    .replace(/<\?xml.*?\?>\s*/g, "")
    .replace(/<!DOCTYPE.*?>\s*/gi, "");

  const componentName = toComponentName(file);
  const vueFileName = `${componentName}.vue`;
  const vueFilePath = path.join(outputDir, vueFileName);

  const vueContent = `<template>
${svgContent.trim()}
</template>
<script setup lang="ts">
// ${componentName} generated from ${file}
</script>
`;

  fs.writeFileSync(vueFilePath, vueContent, "utf8");
  console.log(`Generated: ${vueFileName}`);
});
