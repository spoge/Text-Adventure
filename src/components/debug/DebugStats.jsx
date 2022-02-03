const DebugStats = ({ flags }) => {
  return (
    <div>
      <br />
      Flags: {flags.length > 0 && flags.reduce((r, s) => (r += ", " + s))}
    </div>
  );
};

export default DebugStats;
