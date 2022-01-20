import {
  isVisible,
  hasShowFlags,
  getActiveShowFlagIndex,
} from "../../scripts/CheckFlag";

const Paragraphs = ({ flags, paragraphs }) => {
  const sortByShowFlags = (a, b) => {
    if (
      !a.ignoreSortByFlag &&
      !b.ignoreSortByFlag &&
      hasShowFlags(a) &&
      hasShowFlags(b)
    ) {
      let ai = getActiveShowFlagIndex(flags, a);
      let bi = getActiveShowFlagIndex(flags, b);
      return ai - bi;
    }
    return 0;
  };

  return (
    <div className="paragraphs">
      {paragraphs &&
        paragraphs
          .filter((p) => isVisible(flags, p))
          .sort(sortByShowFlags)
          .map((p) => (typeof p === "string" ? p : p.text))
          .map((paragraph, index) => {
            if (paragraph === "---") return <hr />;
            return (
              <div className="paragraph" key={index}>
                {paragraph}
              </div>
            );
          })}
    </div>
  );
};

export default Paragraphs;
