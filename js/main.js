

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      searchData:{ 
        brands:[], 
        models:[],
        years: [],     
        versions: [],          
        widths:[],        
        ratios:[
            {
                id: 0,
                ratio_description: 'Selecciones altura para continuar ...'
            }
        ], 
        rim:[],
        selected:{
            brand: '',
            model: '',
            year: '',
            version: '',
            ratio: '',
            width: '',
            rim: ''
        },
        buttonDisabled : true
      }
    },
    async created(){
        await axios.get('/json/brands.json').then(response => {
            this.searchData.brands = response.data.brands
            //console.log(response.data)
        })

        

        
        /* let result = Object.keys(test).map( key => test[key]).filter((v) => v.idUn == 2) */
        
    },
    methods:{
        async changeBrand(){            
            let selectedBrand = this.searchData.selected.brand
            //console.log(selectedBrand)
            await axios.get('/json/models.json').then(response =>{
                let models = response.data.models
                //this.searchData.ratios = ratio.filter(ratio => ratio.width.include('145'))
                //console.log(ratio)
                let results = Object.keys(models)     // Array of keys in the JSON obj
                .map(key => models[key])     // Array of vehicle objects
                .filter( (r) =>  r.brand_id == selectedBrand)

                this.searchData.models = results
                //console.log(results)
            })            
        },
        async changeModel(){
            let selectedBrand = this.searchData.selected.brand
            let selectedModel = this.searchData.selected.model
            console.log(selectedBrand)
            console.log(selectedModel)
            await axios.get('/json/years.json').then(response => {
              let years = response.data.years
              let results = Object.keys(years)
              .map(key => years[key])
              .filter((r) => (r.brand_id == selectedBrand && r.model_id == selectedModel))

              this.searchData.years = results
              //console.log(results)              
            })
            
            //console.log(this.searchData.selected.ratio)
        },
        async changeYear(){
            let selectedBrand = this.searchData.selected.brand,
                selectedModel = this.searchData.selected.model,
                selectedYear = this.searchData.selected.year
                /* console.log(selectedBrand)
                console.log(selectedModel)
                console.log(selectedYear) */
            await axios.get('/json/versions.json').then(response => {
                let versions = response.data.versions,
                    results = Object.keys(versions)
                    .map(key => versions[key])
                    .filter((r) => (r.brand_id == selectedBrand && r.model_id == selectedModel && r.year_id == selectedYear))

                this.searchData.versions = results;
                //console.log(results)                
            })
        },
        activeButton(){
            console.log('Estoy validando...')
            this.searchData.buttonDisabled = (this.searchData.selected.brand != "" && this.searchData.selected.model != "" && this.searchData.selected.year != "" && this.searchData.selected.version != "") ? false : true   
        },
        async sendToResult(){
            let selectedBrand = this.searchData.selected.brand,
                selectedModel = this.searchData.selected.model,
                selectedYear = this.searchData.selected.year,
                selectedVersion = this.searchData.selected.version

                console.log(selectedBrand)
                console.log(selectedModel)
                console.log(selectedYear)
                console.log(selectedVersion)

            await axios.get('/json/all.json').then(response => {
                let all = response.data.all
                
                results = Object.keys(all)
                .map(key => all[key])
                .filter((r) => (r.brand_id == selectedBrand && r.model_id == selectedModel && r.year_id == selectedYear && r.version_id == selectedVersion))

                console.log(results)
                
                let urlResult = '/?post_type=product&a_search=1&filter_ancho_auto='+ results[0].width_description + '&filter_alto_auto='+ results[0].ratio_description+'&filter_rin_auto=' + results[0].rim_description

               window.location.href = urlResult 
            })
            
            //let urlResult = '/?width=' + this.searchData.selected.width + '&ratio=' + this.searchData.selected.ratio + '&rim=' + this.searchData.selected.rim
            /* let urlResult = '/?post_type=product&a_search=1&filter_ancho_auto='+ this.searchData.selecte+'&filter_alto_auto=65&filter_rin_auto=13'
            window.location.href = urlResult */
        }
    }
  })