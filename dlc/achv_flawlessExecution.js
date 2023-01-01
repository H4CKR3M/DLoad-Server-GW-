/* Achievement Reward - Flawless Execution | Load Script Through DLoad | Minecraft 1.12.2 (05Jul20) | Written by Rimscar */
var DLC = {
    DLOAD_VERSION: 1,
    CATEGORY: "TRINKET",
    MESSAGE: "§a[§2Achievement Reward§a] §7| §aFlawless Execution",
    ITEMS: [
        "§e[§6§lDLC§e] §5Perfectionist's Boon@0minecraft:skull@1§4§l§o* §4§l§oEXOTIC §c[Trinket]@1§7@1 §8§oA curse weighing on@1 §8§oall who would dare@1 §8§obrave §dGiant Whoop§8§o's@1 §8§omost demanding trial.@1§7@1§7When in off hand:@1§9 Kill Enemies in 1-Hit@1§c High DMG to Bosses@1§c Take DMG on Miss@2SCRIPTED@2PERFECTB@2TRINKET@2ACHIEVEMENT@2OFFHAND@2EXOTIC@2DLC@4aed4d2e9-15e5-4aea-8484-0125f97c7e3b$eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNTVkZmEyODRhYTE1MzI0ZTUxNzg1NjFmODAzZjU5NzYyMjhkOTUxMTU1ODNhYjAzMTI2NmFlMjRlZTFhOTlkMSJ9fX0=@63"
    ],
    TRINKET_TAG: "ACHIEVEMENT",
    TRINKET_SCRIPTS_OFFHAND: [
        {
            tag: "PERFECTB",
            range: 16,
            hitTickCounter: 0,
            queueDamage: false,
            DamagedEntity: function DamagedEntity(e){
                if (e.target != null && e.target.getType() == 2 && e.damageSource.getType() != "arrow"){
                    e.damage *= e.target.getDisplay().getBossbar() == 0 ? 99999 : e.damage*2+10;
                    this.queueDamage = false;
                }
            },
            Attack: function Attack(e){
                // Bow should NOT damage the player
                var mainhand = e.player.getMainhandItem();
                if (mainhand == null || mainhand.getName() != "minecraft:bow")
                    this.queueDamage = true;
            },
            Tick: function Tick(e){
                if (this.queueDamage) {
                    if (e.player.getGamemode() == 2){
                        e.player.damage(7);
                    }
                    this.queueDamage = false;
                }
            }
        },
    ],
    TRINKET_SCRIPTS_MAINHAND: []
}