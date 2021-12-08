async function listFiles(handle, indent) {
  for await (const entry of handle.values()) {
    let output = entry.name;
    if (entry.kind == 'directory') {
      output += '/';
      const dirHandle = await handle.getDirectoryHandle(entry.name, { create: false });
      listFiles(dirHandle, indent + "  ");
    }
    console.log(indent + output);
  }
}

export async function main(_, pwd) {
  listFiles(pwd, '');
}