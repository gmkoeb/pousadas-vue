const app = Vue.createApp({
  data(){
    return{
      innsList: [],
      innRooms: [],
      innDetails: {}
    }
  },
  methods: {
    async getInns(){
       let response = await fetch('http://localhost:3000/api/v1/inns')
       let inns = await response.json()
       return inns
     },
     async getInnDetails(inn_id){
      let response = await fetch(`http://localhost:3000/api/v1/inns/${inn_id}`)
      let inn = await response.json()
      inn.payment_methods = JSON.parse(inn.payment_methods)
      this.innDetails = inn
     },
     hideInnDetails(){
      this.innDetails = {}
     },
     async getRooms(){
      let response = await fetch('http://localhost:3000/api/v1/inns/1/rooms')
      let rooms = await response.json()
      return rooms
     }
    },
    async mounted() {
      this.innsList = await this.getInns(),
      this.innRooms = await this.getRooms()
    },
})

app.mount('#app')