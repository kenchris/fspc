export async function main(argv) {
  if (argv?.length) {
  console.log(...argv);
  } else {
  console.log("");
  }
}