const fetchChapter = (chapterId, setChapter) => {
  console.log(chapterId);
  fetch(`game/${chapterId}.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      setChapter(json);
    });
};

export default fetchChapter;
