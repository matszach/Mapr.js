const AssetManager = {

    load(){
        this.loadSymbolsFromAssets();
    },

    symbolUrls : [
        'assets/img/location_symbols/algae.png',
        'assets/img/location_symbols/axe-in-log.png',
        'assets/img/location_symbols/beech.png',
        'assets/img/location_symbols/byzantin-temple.png',
        'assets/img/location_symbols/cald.era.png',
        'assets/img/location_symbols/camping-tent.png',
        'assets/img/location_symbols/castle.png',
        'assets/img/location_symbols/cave-entrance.png',
        'assets/img/location_symbols/congress.png',
        'assets/img/location_symbols/crowned-skull.png',
        'assets/img/location_symbols/damaged-house.png',
        'assets/img/location_symbols/dead-wood.png',
        'assets/img/location_symbols/defensive-wall.png',
        'assets/img/location_symbols/desert.png',
        'assets/img/location_symbols/doorway.png',
        'assets/img/location_symbols/dungeon-gate.png',
        'assets/img/location_symbols/elven-castle.png',
        'assets/img/location_symbols/evil-tower.png',
        'assets/img/location_symbols/family-house.png',
        'assets/img/location_symbols/flying-beetle.png',
        'assets/img/location_symbols/forest.png',
        'assets/img/location_symbols/frozen-ring.png',
        'assets/img/location_symbols/galleon.png',
        'assets/img/location_symbols/gate.png',
        'assets/img/location_symbols/giant-squid.png',
        'assets/img/location_symbols/goblin-camp.png',
        'assets/img/location_symbols/gold-mine.png',
        'assets/img/location_symbols/grave-flowers.png',
        'assets/img/location_symbols/graveyard.png',
        'assets/img/location_symbols/greek-temple.png',
        'assets/img/location_symbols/holy-oak.png',
        'assets/img/location_symbols/hut.png',
        'assets/img/location_symbols/huts-village.png',
        'assets/img/location_symbols/lighthouse.png',
        'assets/img/location_symbols/magic-gate.png',
        'assets/img/location_symbols/magic-portal.png',
        'assets/img/location_symbols/mayan-pyramid.png',
        'assets/img/location_symbols/maze.png',
        'assets/img/location_symbols/medieval-pavilion.png',
        'assets/img/location_symbols/minerals.png',
        'assets/img/location_symbols/oak.png',
        'assets/img/location_symbols/oasis.png',
        'assets/img/location_symbols/ogre.png',
        'assets/img/location_symbols/peaks.png',
        'assets/img/location_symbols/pine-tree.png',
        'assets/img/location_symbols/sea-creature.png',
        'assets/img/location_symbols/smoking-volcano.png',
        'assets/img/location_symbols/spiked-dragon-head.png',
        'assets/img/location_symbols/spooky-house.png',
        'assets/img/location_symbols/stakes-fence.png',
        'assets/img/location_symbols/stone-tower.png',
        'assets/img/location_symbols/swamp.png',
        'assets/img/location_symbols/tower-fall.png',
        'assets/img/location_symbols/tower-flag.png',
        'assets/img/location_symbols/tumulus.png',
        'assets/img/location_symbols/village.png',
        'assets/img/location_symbols/watchtower.png',
        'assets/img/location_symbols/water-fountain.png',
        'assets/img/location_symbols/waterfall.png',
        'assets/img/location_symbols/werewolf.png',
        'assets/img/location_symbols/wheat.png',
        'assets/img/location_symbols/windmill.png',
        'assets/img/location_symbols/window-bars.png',
        'assets/img/location_symbols/wood-cabin.png',
        'assets/img/location_symbols/wooden-pier.png',
    ],

    symbols : [],
    
    loadSymbolsFromAssets(){
        this.symbols = []
        for(var i = 0; i < this.symbolUrls.length; i++){
            var img = new Image();
            img.src = this.symbolUrls[i];
            this.symbols.push(img);
        }
    },





}