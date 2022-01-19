import isVisible from "../../scripts/CheckFlag";

const Paragraphs = ({ flags, paragraphs }) => {
  return (
    <div className="paragraphs">
      {paragraphs &&
        paragraphs
          .filter((d) => isVisible(flags, d))
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
