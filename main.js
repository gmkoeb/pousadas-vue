const app = Vue.createApp({
  data(){
    return{
      innsList: [],
      innRooms: [],
      innDetails: {},
      searchText: '',
      checkIn: '',
      checkOut: '',
      guests: 0,
      totalPrice: '',
      responseData: '',
      errorMessage: '',
      checkedRoom: ''
    }
  },
  computed:{
    listResult(){
      if(this.searchText){
        return this.innsList.filter(inn => {

          return inn.brand_name.toLowerCase().includes(this.searchText.toLowerCase())

        })
      }else{
        return this.innsList
      }
    },
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
      this.innRooms = await this.getRooms(inn_id)
     },
     hideInnDetails(){
      this.innDetails = {}
     },
     async getRooms(inn_id){
      let response = await fetch(`http://localhost:3000/api/v1/inns/${inn_id}/rooms`)
      let rooms = await response.json()
      return rooms
     },
     async submitForm(roomId){
      this.errorMessage = ''
      const reservationDetails = {
        check_in: this.checkIn,
        check_out: this.checkOut,
        guests: this.guests,
      }
      const apiEndpoint = `http://localhost:3000/api/v1/rooms/${roomId}/check`
      const headers = {
        'Content-Type': 'application/json',
      }
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ reservation_details: reservationDetails }),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.errors)
        }
        const responseData = await response.json();
        this.totalPrice = responseData.total_price
        this.checkedRoom = responseData.room
      } catch (error) {
        this.errorMessage = error.message
      }
     }
    },
    async mounted() {
      this.innsList = await this.getInns()
    },
})

app.mount('#app')