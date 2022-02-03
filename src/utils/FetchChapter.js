const fetchChapter = (chapterId) => {
  return fetch(`${process.env.PUBLIC_URL}/game/${chapterId}.json`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(function (response) {
    return response.json();
  });
};

export default fetchChapter;
