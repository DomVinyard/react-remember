import React, { useContext } from "react";
import local from "local-storage";
import ObjectInspector from "react-object-inspector";

const Context = React.createContext();
class Rememberer extends React.Component {
  state = {};

  componentDidUpdate() {
    local.set("state", this.state);
  }

  componentDidMount() {
    try {
      const localState = local.get("state");
      console.log(localState);
      this.setState(localState || this.defaults);
    } catch (error) {
      console.log("nothing to restore");
    }
  }

  clearState() {
    local.remove("state");
    window.location.reload();
  }

  renderTree() {
    if (!Object.keys(this.state).length) return "nothing to remember";
    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <span style={{ fontSize: "1.2rem" }}>Remembered</span>
          <span style={{ float: "right" }}>
            <button onClick={this.clearState.bind(this)}>
              <span role="img" aria-label="delete">
                💣
              </span>{" "}
              Delete All
            </button>
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
    const { children, show, defaults } = this.props;
    this.defaults = defaults || {};
    if (show) return this.renderTree();
    return (
      <Context.Provider
        value={{
          useRemember: [this.state, val => this.setState(val)]
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
  return useRemember || [];
};
