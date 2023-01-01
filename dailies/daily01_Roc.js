var DAILY = {
    Init: function Init(e) {
        e.player.world.broadcast("INIT!!!");
    },
    Tick: function Tick(e) {
        e.player.world.broadcast("TICK...");
    },
}
