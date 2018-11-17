import React, { useContext } from "react";
import local from "local-storage";
import ObjectInspector from "react-object-inspector";

const Context = React.createContext();
class Rememberer extends React.Component {
  state = {};

  componentDidUpdate() {
    if (!this.state || Object.keys(this.state).length === 0) return
    local.set("state", this.state);
  }

  componentDidMount() {
    try {
      const localState = local.get("state");
      if (localState && !Object.keys(localState).length) local.remove("state");
      this.setState(localState || this.props.defaults);
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
          {this.props.defaults && <div>
            <span style={{ fontSize: "1.2rem" }}>Defaults</span>
            <ObjectInspector name="default" data={this.defaults} />
          </div>}
          <div style={{ fontSize: "1.2rem", paddingTop: "2rem" }}>
            Remembered
            <button
              style={{ marginLeft: "8px" }}
              onClick={this.clearState.bind(this)}
            >
              <span role="img" aria-label="reset">
                {this.props.defaults ? '🔄 Reset to defaults' : '💣 Clear all'}
              </span>
            </button>
          </div>
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
