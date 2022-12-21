<template>
  <h3>{{ status }}</h3>
  <div v-if="online" class="ipfs-info">
    <h3>
      ID: <span id="ipfs-info-id">{{ id }}</span>
    </h3>
    <h3>
      Agent version: <span id="ipfs-info-agent">{{ agentVersion }}</span>
    </h3>
    <div>
      <input type="file" ref="fileInput" @change="uploadFile"/>
    </div>
    <v-list>
      <v-list-item
        v-for="(fl, i) in fstore.files"
        :key="'fl'+i"
      >
        <v-list-item-content>
        {{ fl.path }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { useFileStore } from '@/stores/useFileStore';
export default {
  setup () {
    const fstore = useFileStore()
    return {
      fstore
    }
  },
  name: "IpfsInfo",
  data: function() {
    return {
      status: "Connecting to IPFS...",
      id: "",
      agentVersion: "",
      online: false
    };
  },
  mounted: function() {
    this.getIpfsNodeInfo();
  },
  methods: {
    async getIpfsNodeInfo() {
      try {
        // Await for ipfs node instance.
        const ipfs = await this.$ipfs;
        // Call ipfs `id` method.
        // Returns the identity of the Peer.
        const { agentVersion, id } = await ipfs.id();
        this.agentVersion = agentVersion;
        this.id = id;
        // Set successful status text.
        this.status = "Connected to IPFS =)";
        this.online = ipfs.isOnline();
        console.log('loading files')
        ipfs.ls('/nba', (err, files) => {
          if(err) {
            console.log(err)
            return
          }
          else{
            console.log(files)
          }
        })
        console.log('files loaded')
      } catch (err) {
        // Set error status text.
        this.status = `Error: ${err}`;
      }
    },
    async uploadFile() {
      const file = this.$refs.fileInput.files[0];
      const fileContent = await this.readFile(file);
      try {
        const ipfs = await this.$ipfs;
        // Add the file to IPFS
        for await (const fileadded of ipfs.addAll([{
          path: '/nba/'+file.name,
          content: fileContent
        }])){
          console.log(fileadded);
          //console.log(this.fstore.addFile(fileadded))
          this.fstore.addFile(fileadded)
          for await (const file1 of ipfs.ls('QmPqQYnGvAzi5dMTtD4oJSv2o6N5eyiw7ZQx2GT5H9Bg1x')) {
            console.log(file1)
          }
        }
        //console.log(fileadded);

      } catch (err) {
        console.log(err);
      }
    },
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
      });
    }
  }
};
</script>
