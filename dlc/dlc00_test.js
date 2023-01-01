var DLC = {
    Category: "TRINKET",
    Message: "Here is your new trinket and the full ARG SUIT!",
    SpawnpointID: "",
    ItemList: [
        {
            Tag: "SUPERMAGNET",
            DigitalItem: "§8Super Magnet@0variedcommodities:ingot_steel@1§2§o* Uncommon §c[Trinket]@1@1§7Heavy magnet with@1§7§lLOTS OF POWER!!!@1@1§7When in off hand:@1§9 Teleports Nearby@1§9 Items to User@2SUPERMAGNET@2TRINKET@2DLC@2MAINHAND@2SCRIPTED@2UNCOMMON",
            Tick: function Tick(e){ 
                var ni = e.player.getWorld().getNearbyEntities(e.player.getPos(), 8, 6);
                for(var i = 0; i < ni.length; i++){
                    ni[i].setPosition(e.player.x, e.player.y, e.player.z);
                }
            },
        },
        {
            Tag: "SUPERMAGNET",
            DigitalItem: "§8Super Magnet@0variedcommodities:ingot_steel@1§2§o* Uncommon §c[Trinket]@1@1§7Heavy magnet with@1§7§lLOTS OF POWER!!!@1@1§7When in off hand:@1§9 Teleports Nearby@1§9 Items to User@2SUPERMAGNET@2TRINKET@2DLC@2MAINHAND@2SCRIPTED@2UNCOMMON",
            Tick: function Tick(e){ 
                var ni = e.player.getWorld().getNearbyEntities(e.player.getPos(), 8, 6);
                for(var i = 0; i < ni.length; i++){
                    ni[i].setPosition(e.player.x, e.player.y, e.player.z);
                }
            },
        }
    ]
}
