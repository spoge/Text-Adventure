import { isVisible, hasShowFlags, hasShowFlag } from "../../scripts/CheckFlag";

const Paragraphs = ({ flags, paragraphs }) => {
  const sortByShowFlags = (a, b) => {
    if (
      hasShowFlags(a) &&
      !a.ignoreSortByFlag &&
      hasShowFlags(b) &&
      !b.ignoreSortByFlag
    ) {
      let ai = flags.length;
      let bi = flags.length;
      flags.forEach((f, i) => {
        if (hasShowFlag(f, a) && ai > i) {
          ai = i;
        }
        if (hasShowFlag(f, b) && bi > i) {
          bi = i;
        }
      });
      return ai - bi;
    }
    return 0;
  };

  return (
    <div className="paragraphs">
      {paragraphs &&
        paragraphs
          .filter((d) => isVisible(flags, d))
          .sort(sortByShowFlags)
          .map((d) => (typeof d === "string" ? d : d.text))
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
