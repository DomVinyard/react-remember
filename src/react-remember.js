import React, { useContext } from "react";
import local from "local-storage";
import ObjectInspector from "react-object-inspector";

const Context = React.createContext();
class Rememberer extends React.Component {
  state = {};

  componentDidUpdate() {
    if (this.noPersist) return local.remove("state");
    local.set("state", this.state);
  }

  componentDidMount() {
    this.setState(local.get("state"));
  }

  clearState() {
    local.remove("state");
    window.location.reload();
  }

  renderTree() {
    if (!Object.keys(this.state).length)
      return "nothing remembered (link to docs)";
    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.2rem" }}>Remembered</span>
          <span style={{ float: "right" }}>
            <button onClick={this.clearState.bind(this)}> 💣 Delete All</button>
          </span>
        </div>
        <ObjectInspector
          initialExpandedPaths={["root"]}
          name="the"
          data={this.state}
        />
      </div>
    );
  }

  render() {
    const { children, show, noPersist } = this.props;
    if (noPersist && !this.clearedForNoPersist) {
      this.clearedForNoPersist = true;
      local.remove("state");
    }
    if (show) return this.renderTree();
    return (
      <Context.Provider
        value={{
          useRemember: [
            val => !this.noPersist && this.setState(val),
            this.state
          ]
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export default Rememberer;

export const useRemember = function Consumer() {
  const { useRemember } = useContext(Context);
  return useRemember;
};
