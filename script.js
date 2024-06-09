const { createApp } = Vue;

createApp({
    data() {
        return {
            digimons: [],
            loading: true,
            searchText: ''
        };
    },
    computed: {
        filteredDigimons() {
            return this.digimons.filter(digimon => digimon.name.toLowerCase().includes(this.searchText.toLowerCase()));
        }
    },
    methods: {
        async fetchDigimons() {
            try {
                this.loading = true;
                const response = await fetch('https://digimon-api.vercel.app/api/digimon');
                const data = await response.json();
                this.digimons = data.map(digimon => ({
                    name: digimon.name,
                    img: digimon.img,
                    level: digimon.level,
                    type: digimon.type || 'Desconhecido', // Ensure type has a value
                    showInfo: false
                }));
            } catch (err) {
                console.error('Erro ao buscar Digimons:', err);
            } finally {
                this.loading = false;
            }
        },
        toggleInfo(digimon) {
            digimon.showInfo = !digimon.showInfo;
        }
    },
    created() {
        this.fetchDigimons();
    }
}).mount('#app');
