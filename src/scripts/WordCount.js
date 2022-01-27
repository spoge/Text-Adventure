var fs = require("fs");
const path = require("path");

const countWords = () => {
  const chapterNames = fs.readdirSync("public/game");
  const chapters = chapterNames.map((chId) =>
    JSON.parse(fs.readFileSync(`public/game/${chId}`, { encoding: "utf8" }))
  );

  let wordCount = 0;

  chapters.forEach((chapter) => {
    chapter.scenes.forEach((scene) => {
      wordCount += scene.name.split(" ").length;
      scene.paragraphs.forEach((paragraph) => {
        if (typeof paragraph === "string") {
          wordCount += paragraph.split(" ").length;
        } else {
          wordCount += paragraph.text.split(" ").length;
        }
      });
      scene.actions.forEach((action) => {
        wordCount += action.text.split(" ").length;
      });
    });
  });

  console.log(wordCount);
};

countWords();
