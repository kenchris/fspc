async function downloadFile(pwd, fileName, href) {
  const newFileHandle = await pwd.getFileHandle(fileName, { create: true });
  const writableStream = await newFileHandle.createWritable({ keepExistingData: false });

  const response = await fetch(new URL(fileName, href).href, { mode: "cors"});

  await response.body.pipeTo(writableStream);
}

export async function main(argv, pwd) {
  if (argv?.length) {
    const href = argv[0];

    try {
      const url = new URL("package.json", href).href;

      let response = await fetch(url, { mode: "cors"});

      if (! response.ok) {
        return console.log(`'${url} couldn't be found`);
      }

      const json = await response.json();

      const modulesHandle = await pwd.getDirectoryHandle("modules", { create: true });
      const projectHandle = await modulesHandle.getDirectoryHandle(json.name, { create: true });
      
      json.files.push("package.json");
      for (let file of json.files) {
        downloadFile(projectHandle, file, href);
      }
    } catch (err) {
        console.log("Couldn't download file", err);
    }
  }
}
