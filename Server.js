// DLOAD Server for Achievements - Login Rewards - & Daily Challenges
var SERVER = {
    DLOAD_VERSION: 1,
    MAP_VERSION: 2,
    DAILIES: [
        {
            TYPE: "WEEKLY",
            REWARD_URL: "https://h4ckr3m.github.io/DLoad-Server-GW-/dlc/dlc03_Week2.js",
            MESSAGE_LOGIN: "&cDeal &e[&6&l30&e] &cor more damage in a single attack with an unleveled weapon!",
            MESSAGE_SUCCESS: "&a&lSUCCESS &a- Unique Trinket Added\n" + "&7Deal &8[&7&l30&8] &7or more damage in a single attack with an unleveled weapon!",
            MESSAGE_FAILURE: "FAILED! " + "&7Deal &8[&7&l30&8] &7or more damage in a single attack with an unleveled weapon!",

            isValidRun: true,
            saidLoginMessage: false,

            Init: function Init(e) { },
            Tick: function Tick(e) {
                if (e.player.getGamemode() == 1 && this.isValidRun) {
                    this.isValidRun = false;
                }
            },
            Kill: function Kill(e) {
                if (e.entity != null && this.isValidRun && this.IsValidWeapon(e)) {
                    DLoad.CompleteDaily(this);
                }
            },
            DamagedEntity: function DamagedEntity(e) {
                if (e.target != null && this.isValidRun && this.IsValidWeapon(e)) {
                    DLoad.CompleteDaily(this);
                }
            },
            IsValidWeapon: function IsValidWeapon(e) {
                var dmg = e.damage;
                if (dmg >= 70) {
                    var mainhand = e.player.getMainhandItem();
                    if (mainhand != null && mainhand.getName() != "minecraft:air") {
                        var tagObj = Utilities.GetItemTags(mainhand);
                        if (tagObj != null && (Utilities.HasTag(tagObj, "LEVELEDLOW") || Utilities.HasTag(tagObj, "LEVELEDHIGH"))) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }
        },

        // Achievements - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        {
            TYPE: "ACHIEVEMENT",
            REWARD_URL: "https://h4ckr3m.github.io/DLoad-Server-GW-/dlc/achv_thatsAllFolks.js",
            SUCCESS_MESSAGE: "That's All Folks!\n§7~Complete the R2 Demo Build of Giant Whoop",

            Init: function Init(e) { },
            Tick: function Tick(e) {
                if (e.player.x > 1006 && e.player.x < 1039 && e.player.y > 81 && e.player.y < 93 && e.player.z > 964 && e.player.z < 988) {
                    DLoad.CompleteDaily(this);
                }
            }
        },
        {
            TYPE: "ACHIEVEMENT",
            REWARD_URL: "https://h4ckr3m.github.io/DLoad-Server-GW-/dlc/achv_flawlessExecution.js",
            SUCCESS_MESSAGE: "Flawless Execution\n§7~Complete the map without dying!",

            isValidRun: true,

            Init: function Init(e) { },
            Tick: function Tick(e) {
                if (e.player.getGamemode() == 1 && this.isValidRun) {
                    e.player.world.getStoreddata().put("FLAWLESS_X" + e.player.getDisplayName(), 1);
                    this.isValidRun = false;
                }

                if (this.isValidRun && e.player.x > 1006 && e.player.x < 1039 && e.player.y > 81 && e.player.y < 93 && e.player.z > 964 && e.player.z < 988) {
                    DLoad.CompleteDaily(this);
                }
            },
            Login: function Login(e) {
                if (e.player.world.getStoreddata().has("FLAWLESS_X" + e.player.getDisplayName())) {
                    this.isValidRun = false;
                }
            },
            Died: function Died(e) {
                e.player.world.getStoreddata().put("FLAWLESS_X" + e.player.getDisplayName(), 1);
                this.isValidRun = false;
            }
        },
    ],
    INIT: function INIT() {
        DLoad.DownloadContent("https://h4ckr3m.github.io/DLoad-Server-GW-/dlc/dlc01_First100.zip");
    }
}
