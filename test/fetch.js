function mime2ext(mimeType) {
  switch(mimeType) {
    case 'text/html': return 'html';
  }
  return 'unknown';
}


export async function main(argv, pwd) {
  if (argv?.length) {
    const href = argv[0];

    try {
        const url = new URL(href);
        const paths = url.pathname.split('/');
        let fileName = paths[paths.length - 1];
        if (fileName == '') {
          fileName = 'download';
        }

        const response = await fetch(url.href, { mode: "cors"});
        const mime = response.headers.get("Content-Type").split(';')[0].split('+')[0];
        if (!fileName.includes('.')) {
          fileName += "." + mime2ext(mime);
        }

        const stream = response.body;

        const newFileHandle = await pwd.getFileHandle(fileName, { create: true });
        const writableStream = await newFileHandle.createWritable({ keepExistingData: false });

        await stream.pipeTo(writableStream);
    } catch (err) {
        console.log("Couldn't download file", err);
    }
  }
}