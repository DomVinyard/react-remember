import React, { useContext } from "react";
import local from "local-storage";
import ObjectInspector from "react-object-inspector";
import ReactQueryParams from "react-query-params";

const Context = React.createContext();

const isNumeric = num => num.match(/^-{0,1}\d+$/) || num.match(/^\d+\.\d+$/);
class Rememberer extends ReactQueryParams {
  state = {};

  rememberState() {
    if (!this.url) local.set("state", this.state);
  }

  componentDidUpdate() {
    if (!this.state || Object.keys(this.state).length === 0) return;
    this.rememberState();
  }

  componentDidMount() {
    try {
      const localState = local.get("state");
      if (localState && !Object.keys(localState).length) local.remove("state");
      const qparams = { ...this.queryParams };
      Object.entries(this.queryParams).map(([key, value]) => {
        if (value === "true") qparams[key] = true;
        if (value === "false") qparams[key] = false;
        if (isNumeric(value)) qparams[key] = Number(value);
      });
      const initialState = {
        ...this.props.defaults,
        ...localState,
        ...qparams
      };
      this.setState(initialState);
      if (!this.url) local.set("state", initialState);
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
    this.url = url;
    if (show) return this.renderTree();
    return (
      <Context.Provider
        value={{
          useRemember: [
            this.state,
            val => {
              this.setState(val);
              if (url) {
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
