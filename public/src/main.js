import Kaplay from "./kaplay.js";
let k = Kaplay({ debugKey: "1" });
window.k = k;
export default k;

let scenes = {};
import main_menu from "./scenes/main_menu.js";
scenes.main_menu=main_menu
import lose_screen from "./scenes/lose_screen.js";
scenes.lose_screen=lose_screen
import game from "./scenes/game.js";
scenes.game = game

loadFont("Lilita One", "assets/fonts/LilitaOne-Regular.ttf");

await import ("./globalVariables.js");

scene("game", scenes.game);

scene("main_menu",  scenes.main_menu);

scene("lose_screen",scenes.lose_screen)

go("main_menu");