export async function main(argv, pwd) {
  if (!argv?.length) {
    return;
  }

  const fileHandle = await pwd.getFileHandle(argv[0]);
  if (fileHandle) {
    const file = await fileHandle.getFile();
    const content = await file.text();
    const reversedContent = content.split("").reverse().join("");

    const newName = file.name + ".reversed";
    const newFileHandle = await pwd.getFileHandle(newName, { create: true });
    const writableStream = await newFileHandle.createWritable({ keepExistingData: false });
    
    const defaultWriter = writableStream.getWriter();
    await defaultWriter.ready;
      
    defaultWriter.write(reversedContent);
    defaultWriter.close();
  }
}