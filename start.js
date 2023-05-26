const { exec } = require("child_process");

const videoCount = 3;
const mpv = "mpv";

const links = [
  "https://www.youtube.com/watch?v=ybS7AHGoEI8",
  "https://www.youtube.com/watch?v=9_PV5nz_ics",
]
  .sort(() => Math.random() - Math.random()) // shuffle
  .slice(0, videoCount);

exec(`${mpv} ${links.join(" ")}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
