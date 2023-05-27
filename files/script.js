const fs = require("fs");
const { exec } = require("child_process");

// Read the links from links.txt file
const linksFilePath = "../_videolinks.txt";
const links = fs.readFileSync(linksFilePath, "utf8").split("\n");

// Remove empty lines from the links array
const filteredLinks = links.filter((link) => link.trim() !== "");

// Read the settings from settings.txt file
const settingsFilePath = "../_settings.txt";
const settings = fs.readFileSync(settingsFilePath, "utf8").split("\n");

// Extract the number of videos, volume, and scale from the settings
const numberOfVideosLine = settings.find((line) =>
  line.startsWith("NUMBER_OF_VIDEOS")
);
const numberOfVideos = parseInt(numberOfVideosLine.split("=")[1].trim());

const volumeLine = settings.find((line) => line.startsWith("VOLUME"));
const volume = parseInt(volumeLine.split("=")[1].trim());

const scaleLine = settings.find((line) => line.startsWith("SCALE"));
const scale = parseFloat(scaleLine.split("=")[1].trim());

const mpv = `mpv --no-border --window-scale=${scale} --force-window-position=yes --ontop --ytdl-format="bestvideo[height<=360]+bestaudio/best[height<=360]" --loop-file=inf --volume=${volume}`;

// Shuffle the links array
const shuffledLinks = filteredLinks.sort(() => Math.random() - 0.5);

// Select random numberOfVideos number of videos
const selectedLinks = shuffledLinks.slice(0, numberOfVideos);

selectedLinks.forEach((link) => {
  try {
    exec(`${mpv} ${link}`);
  } catch (error) {
    console.error(`Failed to play video: ${link}`);
  }
});
