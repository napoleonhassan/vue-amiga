import { defineStore } from 'pinia'
import { uniqueNumber, upCount } from '@/utils/Utils';

export interface WindowTemplate {
  id: string,
  title: string,
  zi: number
}

export const useWindowStore = defineStore('windows', {
  state: () => {
    return {
      windows: [] as WindowTemplate[],
      focused: ''
    }
  },
  actions: {
    add(action: { payload: WindowTemplate; }) {
      if (this.windows.find(({id}) => id == action.payload.id)) return;
      const newId = action.payload.id || uniqueNumber();
      this.focused = newId;
      this.windows = [...this.windows, {...action.payload, id: action.payload.id || newId, zi: upCount()}];
    },
    remove(action: { payload: WindowTemplate; }) {
      this.windows = [...this.windows.filter((w) => w.id !== action.payload.id)];
      this.focused = (this.windows && this.windows.length) ? 
      this.windows.reduce((max : WindowTemplate, win : WindowTemplate) => (win.zi > max.zi ? win : max)).id 
      : '';
    },
    update(action: { payload: { id: string, zi: number, pos?: { x: number, y: number }}}) {
      const { id, zi } = action.payload;    
      this.windows = this.windows.map(w => w.id === id ? { ...w, zi } : w);
    },
    focus(action: { payload: { id: string } }) {
      this.focused = action.payload.id;
    }
  },
})
