/* Achievement Reward - That's All Folks | Load Script Through DLoad | Minecraft 1.12.2 (05Jul20) | Written by Rimscar */
var DLC = {
    DLOAD_VERSION: 1,
    CATEGORY: "TRINKET",
    MESSAGE: "§a[§2Achievement Reward§a] §7| §aThat's All Folks!",
    ITEMS: [
        "§e[§6§lDLC§e] §2Compound Interest@0variedcommodities:money@1§6§l§o* Legendary §c[Trinket]@1§7@1§aAn expired bank note@1§apromising x2 returns.@1§7@1§7When in off hand:@1§9 DMG is Shared Among Friends@1§c HP is Shared Among Friends@2SCRIPTED@2CINTEREST@2TRINKET@2ACHIEVEMENT@2OFFHAND@2DLC@2LEGENDARY"
    ],
    TRINKET_TAG: "ACHIEVEMENT",
    TRINKET_SCRIPTS_OFFHAND: [
        {
            tag: "CINTEREST",
            range: 16,
            DamagedEntity: function DamagedEntity(e){
                var newDMG = 0;
                var ap = e.player.world.getAllPlayers();
                for(var i = 0; i < ap.length; i++){
                    if (ap[i].getDisplayName() != e.player.getDisplayName() && ap[i].isAlive() && ap[i].getGamemode() != 3){
                        var mainhand = ap[i].getMainhandItem();
                        if (mainhand != null && mainhand.getName() != "minecraft:air"){
                            newDMG += mainhand.getAttackDamage();
                        }
                    }
                }
                e.damage += newDMG;
            },
            Damaged: function Damaged(e){
                if (e.source != null && e.source.getType() == 2){
                    var numPlayers = 0;
                    var ap = e.player.world.getAllPlayers();
                    for(var i = 0; i < ap.length; i++){
                        if (ap[i].isAlive() && ap[i].getGamemode() != 3){
                            numPlayers++;
                        }
                    }
                    var spreadDMG = e.damage / numPlayers;
                    for(var i = 0; i < ap.length; i++){
                        if (ap[i].isAlive() && ap[i].getGamemode() != 3){
                            ap[i].damage(spreadDMG);
                        }
                    }
                    e.setCanceled(true);
                }
            }
        },
    ],
    TRINKET_SCRIPTS_MAINHAND: []
}