import { defineStore } from 'pinia'
import { uniqueNumber } from '@/utils/Utils';

export interface windowTemplate {
  id?: string,
  title: string,
  adjPos?: {
    x: number,
    y: number
  }
}

export const useWindowStore = defineStore('windows', {
  state: () => {
    return {
      windows: [{ title: 'Eduardo', id: uniqueNumber() }]
    }
  },
  actions: {
    add(action: { payload: windowTemplate; }) {
      if (this.windows.find(({id}) => id == action.payload.id)) return;
      this.windows = [...this.windows, {...action.payload, id: action.payload.id || uniqueNumber()}];
    },
    remove(action: { payload: windowTemplate; }) {
      this.windows = [...this.windows.filter((w) => w.id !== action.payload.id)];
    }
  },
})
