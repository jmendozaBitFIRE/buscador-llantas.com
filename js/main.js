

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      searchData:{                 
        widths:[],
        ratios:[
            {
                id: 0,
                ratio_description: 'Selecciones altura para continuar ...'
            }
        ], 
        rim:[],
        selected:{
            ratio: '',
            width: '',
            rim: ''
        },
        buttonDisabled : true
      }
    },
    async created(){
        await axios.get('/json/widths.json').then(response => {
            this.searchData.widths = response.data.widths
            //console.log(response.data)
        })

        

        
        /* let result = Object.keys(test).map( key => test[key]).filter((v) => v.idUn == 2) */
        
    },
    methods:{
        async changeWidths(){            
            let selectedWidth = this.searchData.selected.width
            await axios.get('/json/ratios.json').then(response =>{
                let ratio = response.data.ratios
                //this.searchData.ratios = ratio.filter(ratio => ratio.width.include('145'))
                //console.log(ratio)
                let results = Object.keys(ratio)     // Array of keys in the JSON obj
                .map(key => ratio[key])     // Array of vehicle objects
                .filter( (r) =>  r.width_description == selectedWidth )

                this.searchData.ratios = results
                //console.log(results)
            })            
        },
        async changeRatios(){
            let selectedWidth = this.searchData.selected.width
            let selectedRatio = this.searchData.selected.ratio
            await axios.get('/json/rims.json').then(response => {
              let rim = response.data.rims
              let results = Object.keys(rim)
              .map(key => rim[key])
              .filter((r) => (r.ratio_description == selectedRatio && r.width_description == selectedWidth))

              this.searchData.rims = results
              console.log(results)              
            })
            
            //console.log(this.searchData.selected.ratio)
        },
        activeButton(){
            console.log('Estoy validando...')
            this.searchData.buttonDisabled = (this.searchData.selected.width != "" && this.searchData.selected.ratio != "" && this.searchData.selected.rim != "" ) ? false : true   
        },
        sendToResult(){
            let urlResult = '/?width=' + this.searchData.selected.width + '&ratio=' + this.searchData.selected.ratio + '&rim=' + this.searchData.selected.rim
            window.location.href = urlResult
        }
    }
  })