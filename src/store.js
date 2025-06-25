import { configureStore, createSlice } from "@reduxjs/toolkit";
import { initialData } from "./HierarchicalData";

const addOriginals = (nodes) =>
  nodes.map((node) => ({
    ...node,
    originalValue: node.value ?? 0,
    children: node.children ? addOriginals(node.children) : null,
  }));

const persisted = localStorage.getItem('hierarchicalData');
const initial = persisted
  ? { data: JSON.parse(persisted) }
  : { data: addOriginals(initialData) };

const hierarchicalSlice = createSlice({
  name: "hierarchical",
  initialState: initial,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      localStorage.setItem('hierarchicalData', JSON.stringify(action.payload));
    },
  },
});

export const { setData } = hierarchicalSlice.actions;

const store = configureStore({
  reducer: {
    hierarchical: hierarchicalSlice.reducer,
  },
});

export default store;
