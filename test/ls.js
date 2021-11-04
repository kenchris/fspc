export async function main(_, pwd) {
  for await (const entry of pwd.values()) {
    let output = entry.name;
    if (entry.kind == 'directory') {
      output += '/';
    }
    console.log(output);
  }
}