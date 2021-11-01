export async function dataUrlToFile(dataUrl) {
  const fileName = Math.random().toString(36).substr(2, 5) + ".png";

  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: "image/png" });
}
