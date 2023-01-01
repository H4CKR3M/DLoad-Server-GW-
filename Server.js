// DLOAD Server for Achievements - Login Rewards - & Daily Challenges
var SERVER = {
    DLOAD_VERSION: 1,
    MAP_VERSION: 2,
    DAILIES: [
        {
            TYPE: "WEEKLY",
            REWARD_URL: "dlc/dlc02_Week1.js",
            SUCCESS_MESSAGE: "&a&lSUCCESS &a- Unique Trinket Added\n&7Kill &8The Roc&7 using only your starting weapon~",
            FAILURE_MESSAGE: "Failed &7&m Kill &8&mThe Roc &7&musing only your starting weapon! ",

            loginMessage: "&cKill &e&oThe Roc &cusing only your starting weapon!",

            isValidRun: true,
            saidLoginMessage: false,

            Init: function Init(e) {
                this.isValidRun = true;
                this.saidLoginMessage = false;
            },
            Tick: function Tick(e) {
                if (e.player.getGamemode() == 1 && this.isValidRun){
                    this.isValidRun = false;
                }
                if (!this.saidLoginMessage){
                    DLoad.MsgWeekly(this.loginMessage);
                    this.saidLoginMessage = true;
                }
            },
            Kill: function Kill(e) {
                if (e.entity != null && e.entity.getType() == 2 && e.entity.getName() == "The Roc"){
                    if (this.isValidRun && this.IsUsingStartingWeapon(e)){
                        DLoad.CompleteDaily(this);
                    }
                }
            },
            DamagedEntity: function DamagedEntity(e){
                if (e.target != null && e.target.getType() == 2 && e.target.getName() == "The Roc"){
                    if (!this.IsUsingStartingWeapon(e)){
                        DLoad.FailDaily(this);
                    }
                }
            },
            IsUsingStartingWeapon: function IsUsingStartingWeapon(e){
                var mainhand = e.player.getMainhandItem();
                if (mainhand != null && mainhand.getName() != "minecraft:air"){
                    var tagObj = Utilities.GetItemTags(mainhand);
                    if (tagObj != null){
                        if (!Utilities.HasTag(tagObj, "STARTING")){
                            return false;
                        }
                    }
                    else{
                        return false;
                    }
                }
                return true;
            }
        },

        // Achievements - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        {
            TYPE: "ACHIEVEMENT",
            REWARD_URL: "dlc/achv_thatsAllFolks.js",
            SUCCESS_MESSAGE: "That's All Folks!\n§7~Complete the R2 Demo Build of Giant Whoop",

            Init: function Init(e) {},
            Tick: function Tick(e) {
                if (e.player.x > 1006 && e.player.x < 1039 && e.player.y > 81 && e.player.y < 93 && e.player.z > 964 && e.player.z < 988){
                    DLoad.CompleteDaily(this);
                }
            }
        },
        {
            TYPE: "ACHIEVEMENT",
            REWARD_URL: "dlc/achv_flawlessExecution.js",
            SUCCESS_MESSAGE: "Flawless Execution\n§7~Complete the map without dying!",

            isValidRun: true,

            Init: function Init(e) {},
            Tick: function Tick(e) {
                if (e.player.getGamemode() == 1 && this.isValidRun){
                    e.player.world.getStoreddata().put("FLAWLESS_X" + e.player.getDisplayName(), 1);
                    this.isValidRun = false;
                }

                if (this.isValidRun && e.player.x > 1006 && e.player.x < 1039 && e.player.y > 81 && e.player.y < 93 && e.player.z > 964 && e.player.z < 988){
                    DLoad.CompleteDaily(this);
                }
            },
            Login: function Login(e) {
                if(e.player.world.getStoreddata().has("FLAWLESS_X" + e.player.getDisplayName())){
                    this.isValidRun = false;
                }
            },
            Died: function Died(e) {
                e.player.world.getStoreddata().put("FLAWLESS_X" + e.player.getDisplayName(), 1);
                this.isValidRun = false;
            }
        },
    ],
    INIT: function INIT(){
        DLoad.DownloadContent("dlc/dlc01_First100.zip");
    }
}
