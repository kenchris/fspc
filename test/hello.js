export async function main(argv) {
  if (argv?.length) {
    console.log("Hello", ...argv);
  } else {
    console.log("Hello World");
  }
}