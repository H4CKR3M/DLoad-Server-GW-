/* Weekly (02) - Completion Reward | Load Script Through DLoad | Minecraft 1.12.2 (05Jul20) | Written by Rimscar */
var DLC = {
    DLOAD_VERSION: 1,
    CATEGORY: "TRINKET",
    CHALLENGE_NUMBER: 1,
    ITEMS: [
        "§e[§6§lDLC§e] §a[§2§lULTRA§a] §2Chest §a[§20§a/§21000§a]@0minecraft:skull@1§6§l§o* Legendary §c[Trinket]@1§7@1§8A Chest cursed by the old@1§8ones, it cannot be opened@1§8without sufficient tribute.@1§9@1§7When in off hand:@1§9  > Slay Foes to Fill Chest@1§9 [§eRight-Click§9]@1§7  > When Full?@1§9  * Give Ultra §kDAGGER@2SCRIPTED@2TRINKET@2DAILY@2OFFHAND@2ULTRACHEST@2ULTRAINGREDIENT@2DLC@2INGREDIENT@2LEGENDARY@46bfb34fb-17bf-4104-ba2c-5eea9757ce66$eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvMjJlZTkyOWU2NDEwN2ZmYjVmYjk0NTAwZmM2NDAyZGFmZDE3ZjNiNGIxOGYxZjliMmM4YzAxZWQ5YWRhZGNjYiJ9fX0=@63"
    ],
    TRINKET_TAG: "DAILY",
    TRINKET_SCRIPTS_OFFHAND: [
        {
            tag: "ULTRACHEST",
            rewardStr: "§e[§6§lDLC§e] §a[§2§lULTRA§a] §2Dagger@0variedcommodities:emerald_dagger_reversed@1§6§l§o* Legendary@1§7@1§aA dagger with an errie@1§aradiating glow, said to@1§ahave been lost long ago.@1§9@1§7When in main hand:@1§9  No Attack Cooldown@1§9  20 Attack Damage@1§9  Sneaking = [§ex§l2§9] DMG@1§9  +100 XP on Kill@1§c  Consumes 1 XP/sec@1§9@1§9Unbreakable@2DAILY@2MAINHAND@2INGREDIENT@2SCRIPTED@2ULTRADAGGER@2ULTRAINGREDIENT@2DLC@2LEGENDARY@3100.0$mainhand$generic.attackSpeed$-7339881495005740422L$-7246337421202354335L@320.0$mainhand$generic.attackDamage$5611130981972593098L$-4744572898023570227L@57@71@C34$1",
            Interact: function Interact(e) {
                var offhand = e.player.getOffhandItem();
                if (offhand != null && offhand.getName() != "minecraft:air") {
                    var tagObj = Utilities.GetItemTags(offhand);
                    if (tagObj != null && Utilities.HasTag(tagObj, "ULTRACHEST")) {
                        var name = offhand.getDisplayName();
                        var indexStart = name.indexOf("Chest") + 11;
                        var indexEnd = name.indexOf("§a/§21000");
                        var count = Number(name.substring(indexStart, indexEnd));
                        if (count >= 1000){
                            offhand.setStackSize(0);
                            DigitalTrinkets12.Give(e.player, this.rewardStr);
                            Utilities.Play(e.player, "minecraft:block.end_portal.spawn");
                        }
                    }
                }
            },
            Kill: function Kill(e) {
                var offhand = e.player.getOffhandItem();
                if (offhand != null && offhand.getName() != "minecraft:air") {
                    var tagObj = Utilities.GetItemTags(offhand);
                    if (tagObj != null && Utilities.HasTag(tagObj, "ULTRACHEST")) {
                        var name = offhand.getDisplayName();
                        var indexStart = name.indexOf("Chest") + 11;
                        var indexEnd = name.indexOf("§a/§21000");
                        var count = Number(name.substring(indexStart, indexEnd));
                        var increaseBy = e.entity == null || e.entity.getType() != 2 ? 10 : e.entity.getMaxHealth();
                        count += increaseBy;
                        count = Math.min(count, 1000);
                        offhand.setCustomName("§e[§6§lDLC§e] §a[§2§lULTRA§a] §2Chest §a[§2" + count + "§a/§21000§a]");
                    }
                }
            }
        },
    ],
    TRINKET_SCRIPTS_MAINHAND: [
        {
            tag: "ULTRADAGGER",
            DamagedEntity: function DamagedEntity(e) {
                if (e.player.getExpLevel() > 0 && e.player.isSneaking()){
                    e.damage *= 2;
                }
            },
            Kill: function Kill(e) {
                e.API.executeCommand(e.player.world, "/xp 100 " + e.player.getDisplayName());
            },
        },
    ]
}