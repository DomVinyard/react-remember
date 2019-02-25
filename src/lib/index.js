import React, { useContext } from "react";
import local from "local-storage";
import ObjectInspector from "react-object-inspector";
import ReactQueryParams from "react-query-params";

const Context = React.createContext();

const isNumeric = num => {
  if (num.match(/^-{0,1}\d+$/)) {
    return true;
  } else if (num.match(/^\d+\.\d+$/)) {
    return true;
  } else {
    return false;
  }
};
class Rememberer extends ReactQueryParams {
  state = {};

  componentDidUpdate() {
    if (!this.state || Object.keys(this.state).length === 0) return;
    local.set("state", this.state);
  }

  componentDidMount() {
    try {
      const localState = local.get("state");
      if (localState && !Object.keys(localState).length) local.remove("state");
      const params = { ...this.queryParams };
      Object.entries(this.queryParams).map(([key, value]) => {
        if (value === "true") params[key] = true;
        if (value === "false") params[key] = false;
        if (isNumeric(value)) params[key] = Number(value);
      });

      this.setState({ ...localState, ...params } || this.props.defaults);
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
          {this.props.defaults && (
            <div>
              <span style={{ fontSize: "1.2rem" }}>Defaults</span>
              <ObjectInspector name="default" data={this.defaults} />
            </div>
          )}
          <div style={{ fontSize: "1.2rem", paddingTop: "2rem" }}>
            Remembered
            <button
              style={{ marginLeft: "8px" }}
              onClick={this.clearState.bind(this)}
            >
              <span role="img" aria-label="reset">
                {this.props.defaults ? "🔄 Reset to defaults" : "💣 Clear all"}
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
    const { children, show, defaults, url } = this.props;
    this.defaults = defaults || {};
    if (show) return this.renderTree();
    return (
      <Context.Provider
        value={{
          useRemember: [
            this.state,
            val => {
              this.setState(val);
              if (url) {
                console.log("set");
                this.setQueryParams(val);
              }
            }
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
  return useRemember || [];
};
