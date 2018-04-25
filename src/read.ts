import rline from "readline";

/**
 * read the lines of texted recieved via stdin
 * @param callback called with the recieved lines when stdin closed
 */
export async function read(): Promise<string[]> {

    const lines: string[] = [];
    const read = rline.createInterface(process.stdin);

    return new Promise<string[]>((resolve, reject) => {
        read.on("line", lines.push);
        read.on("close", () => resolve(lines));
    });
}