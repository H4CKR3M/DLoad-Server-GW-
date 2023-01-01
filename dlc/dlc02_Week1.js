/* Weekly (01) - Completion Reward | Load Script Through DLoad | Minecraft 1.12.2 (05Jul20) | Written by Rimscar */
var DLC = {
    DLOAD_VERSION: 1,
    CATEGORY: "TRINKET",
    CHALLENGE_NUMBER: 1,
    ITEMS: [
        "§e[§6§lDLC§e] §4Cracked Blood Orb@0variedcommodities:orb_broken@1§d§o* Rare §c[Trinket]@1§7@1§cA fractured orb@1§cfilled with malice!@1§7@1§7When in off hand:@1§9 [§eRight-Click§9]@1§9  Detonate a Blood Stone@1§9  Deal DMG to Nearby Foes@1§c  Cost 1 Blood Stone@2SCRIPTED@2RARE@2TRINKET@2DAILY@2OFFHAND@2BLOODORB@2DLC@61"
    ],
    TRINKET_TAG: "DAILY",
    TRINKET_SCRIPTS_OFFHAND: [
        {
            tag: "BLOODORB",
            range: 16,
            Interact: function Interact(e){
                var totalItems = 0;
                var inventoryItems = e.player.getInventory().getItems();
                for(var i = 0; i < inventoryItems.length; i++){
                    var tagObj = Utilities.GetItemTags(inventoryItems[i]);
                    if (tagObj != null){
                        if (Utilities.HasTag(tagObj, "BLOODSTONE")){
                            totalItems += inventoryItems[i].getStackSize();
                        }
                    }
                }
                if (totalItems > 0){
                    var atleastOne = false;
                    var ne = e.player.getWorld().getNearbyEntities(e.player.pos, this.range, 2);
                    for(var i = 0; i < ne.length; i++){
                        if (ne[i].isAlive() && ne[i].getFaction().playerStatus(e.player) == -1){
                            e.player.world.spawnParticle("explode", ne[i].x, ne[i].y + 1, ne[i].z, 0.1, 0.1, 0.1, 0.2, 10); 
                            e.player.world.spawnParticle('flame', ne[i].x, ne[i].y+1, ne[i].z,0.1,0.5,0.1,0.1,50);
                            e.player.playSound("minecraft:block.glass.break", 1, 1);
                            e.player.world.playSoundAt(ne[i].pos, "minecraft:entity.generic.explode", 0.3, 2);
                            
                            var dmgMult = Math.round(Math.max(1, this.range - e.player.pos.distanceTo(ne[i].pos))) * 2;
                            ne[i].damage(dmgMult);
                            if (ne[i].getHealth() > 0 && ne[i].getAttackTarget() != e.player){
                                ne[i].setAttackTarget(e.player);
                            }
                            atleastOne = true;
                        }
                    }
                    if (atleastOne){
                        // Take item
                        for(var i = 0; i < inventoryItems.length; i++){
                            var tagObj = Utilities.GetItemTags(inventoryItems[i]);
                            if (tagObj != null){
                                if (Utilities.HasTag(tagObj, "BLOODSTONE")){
                                    inventoryItems[i].setStackSize(inventoryItems[i].getStackSize() - 1);
                                    break;
                                }
                            }
                        }
                    }
                }
                // Not enough items to use
                else{
                    Utilities.Message(e, "&cNot enough Bloodstones!");
                    e.player.playSound("minecraft:entity.item.break", 1, 1);
                }
            }
        },
    ],
    TRINKET_SCRIPTS_MAINHAND: []
}