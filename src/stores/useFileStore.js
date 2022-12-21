import { defineStore } from 'pinia'

export const useFileStore = defineStore('files', {
    state: () => ({
        files: [],
        nextId: 0,
    }),
    getters: {},
    actions: {
        addFile(fil) {
            this.files.push({ cid: fil.cid.toString(), id: this.nextId++, path: fil.path, size: fil.size })
            //return true
        }
    },
})