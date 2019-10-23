import { decorate, observable } from "mobx";

class MemeStore {
  svgRef;
}

decorate(MemeStore, {
  svgRef: observable
});

export default new MemeStore();
