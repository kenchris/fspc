export async function main(argv, pwd) {
  const fileHandle = await pwd.getFileHandle(argv[0]);
  if (fileHandle) {
    const file = await fileHandle.getFile();
    const content = await file.text();
    console.log(content);
  }
}