(this["webpackJsonpdeepseat-react"]=this["webpackJsonpdeepseat-react"]||[]).push([[0],[,,,,,,,,,,function(e,t,r){e.exports=r(18)},,,,,function(e,t,r){},function(e,t,r){e.exports=r.p+"static/media/logo.5d5d9eef.svg"},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),s=r(3),o=r.n(s),i=(r(15),r(1)),l=r(4),c=r(7),u=r(5),h=r(8),f=(r(16),r(17),r(6)),p=r.n(f),g=r(9),d=function e(t){var r=this;Object(i.a)(this,e),this.move=function(e){r.players[r.currentPlayerIndex].move(r,e)},this.pickUpTreasure=function(){r.players[r.currentPlayerIndex].pickUpTreasure(r.board)},this.putDownTreasure=function(e){r.players[r.currentPlayerIndex].pickUpTreasure(e,r.board)},this.turnAround=function(){r.players[r.currentPlayerIndex].turnAround()},this.endTurn=function(){r.currentPlayerIndex=1-r.currentPlayerIndex},this.createPlayers=function(e){return e.map((function(e){return new m(e.name,e.colour)}))},this.finishExcursion=function(){console.log("Called finishExcursion"),this.killStrandedPlayers(),this.tidyEmptySpaces(),this.startNextExcursion()},this.startNextExcursion=function(){if(console.log("called startNextExcursion"),console.log("excursion count: "+this.excursionCount),this.excursionCount<3){this.excursionCount++,this.resetOxygenLevel();for(var e=0;e<this.players.length;e++){var t=this.players[e];console.log(JSON.stringify(t)),t.isHomeSafe=!1,t.direction="down"}}else this.finishGame()},this.finishGame=function(){this.isOver=!0,console.log("GAME OVER\n\n\n\n\nGAME OVER"),this.getFinalScores()},this.getFinalScores=function(){for(var e=this.players,t=this.players.length,r=0;r<t;r++){var n=e[r];console.log(n.name+" final score: "+this.calculateFinalScore(n.treasureStore))}},this.calculateFinalScore=function(e){console.log("calculateFinalScore called");var t=0;console.log("treasureStore length: "+e.length);for(var r=0;r<e.length;r++)if(console.log(e[r]),e[r].valueScore&&(t+=e[r].valueScore,console.log(r)),r.length>0)for(var n=0;n<r.length;n++)r[n].valueScore&&(t+=r[n].valueScore,console.log(n));return t},this.tidyEmptySpaces=function(){console.log("called tidyEmptySpaces"),this.board.path=this.board.path.filter((function(e){return e.treasure||e instanceof y})),console.log("tidyEmptySpaces: "+JSON.stringify(this.board.path[0]));for(var e=1;e<this.board.path.length;e++)this.board.path[e].players=[]},this.killStrandedPlayers=function(){console.log("called killlllll");for(var e=0;e<this.players.length;e++){var t=this.players[e];if(!t.isHomeSafe&&(t.isAlive=t.kill(),t.treasureBag.length>0)){var r=new S;r.setTreasure(t.treasureBag),this.board.path.push(r),console.log("pushing "+JSON.stringify(t)+" to the sub"),console.log(JSON.stringify(this.board.path[0])),this.board.path[0].players.push(t),console.log(JSON.stringify(this.board.path[0])),t.treasureBag=[],t.direction="down",t.isHomeSafe=!1}}},this.checkIfEveryoneIsHome=function(){console.log("checkIfEveryoneIsHome called");var e=this.players.length;console.log("playerCount: "+e);var t=0;console.log("safePlayers: "+t);for(var r=0;r<e;r++){this.players[r].isHomeSafe&&(t++,console.log("safePlayers: "+t))}e==t&&this.finishExcursion()},this.checkTheresStillOxygen=function(){this.oxygenLevel<=0&&this.finishExcursion()},this.resetOxygenLevel=function(){console.log("reset the oxygen level"),this.oxygenLevel=25},console.log(this),this.players=this.createPlayers(t),this.board=new v(this.players),this.excursionCount=1,this.oxygenLevel=25,this.isOver=!1,this.currentPlayerIndex=0,console.log("game created: "+JSON.stringify(this))},m=function e(t,r){Object(i.a)(this,e),this.kill=function(){console.log("called kill on "+this.name),this.isAlive=!1},this.oxygenDeplete=function(e){e.oxygenLevel=e.oxygenLevel-this.treasureBag.length,console.log("oxygen level: "+e.oxygenLevel)},this.turnAround=function(){console.log(this.name+" has turned around!"),this.direction="up"},this.move=function(e,t){var r=this;if(console.log("called move on "+this.name),this.isHomeSafe)console.log("do not move, "+this.name+" already home safe");else{this.oxygenDeplete(e);var n=this.roll();t&&(console.log("override roll with: "+t),n=t);var a=this.combineRollAndSpeedPenalty(n);for(console.log("spaces to go: "+a);a>0;)setTimeout((function(){r.moveOneSpace(e.board)}),50*a),a--;e.checkIfEveryoneIsHome(),e.checkTheresStillOxygen()}},this.combineRollAndSpeedPenalty=function(e){return(e=e-this.treasureBag.length)<0&&(e=0),e},this.pickUpTreasure=function(e){var t=this.getLocation(e);e.path[t].treasure?(this.treasureBag.push(e.path[t].treasure),e.path[t].treasure=null,console.log("picked Up Treasure!!!!!!!!!!!!")):console.log("no treasure to pick up, dummy"),console.log(this.treasureBag)},this.putDownTreasure=function(e,t){var r=this.getLocation(t);t.path[r].treasure?console.log("there is already treasure here, so you cannot put down"):(t.path[r].treasure=this.treasureBag[e],this.treasureBag.splice(e,1)),console.log(this.treasureBag)},this.getLocation=function(e){for(var t=this,r=0;r<e.path.length;r++)if(e.path[r].players.some((function(e){return e.colour==t.colour&&e.name==t.name})))return r},this.roll=function(){var e=[1,2,3];return e[Math.floor(Math.random()*e.length)]+e[Math.floor(Math.random()*e.length)]},this.moveOneSpace=function(e){var t,r=this,n=!0;t="down"==this.direction?1:-1;var a=this.getLocation(e),s=a+t;for(("down"==this.direction&&s>=e.path.length||"up"==this.direction&&0==a)&&(n=!1);n;)e.path[a].players=e.path[a].players.filter((function(e){return e.colour!==r.colour})),this.spaceIsHabitable(e,s)?(e.path[s].players.push(this),this.currentLocation=s,n=!1,console.log(this.name+" is at space index "+s),this.markHomeifNextLocationSubmarine(s)):s=(a=s)+t},this.markHomeifNextLocationSubmarine=function(e){0==e&&this.markHomeSafe()},this.spaceIsHabitable=function(e,t){return this.spaceHasNoPlayersInIt(e,t)||this.spaceIsSubmarine(e,t)||this.spaceIsBottomOfBoard(e,t)},this.spaceHasNoPlayersInIt=function(e,t){return 0==e.path[t].players.length},this.spaceIsSubmarine=function(e,t){return e.path[t]instanceof y},this.spaceIsBottomOfBoard=function(e,t){return t==e.path.length-1},this.markHomeSafe=function(){this.isHomeSafe=!0;var e=this.treasureStore;e.push(this.treasureBag),this.treasureStore=e,this.treasureBag=[],console.log(this.name+" is home safe!")},this.name=t,this.colour=r,this.treasureBag=[],this.currentLocation=0,this.treasureStore=[],this.score=0,this.direction="down",this.isAlive=!0,this.isHomeSafe=!1,console.log("player created: "+JSON.stringify(this))},v=function e(t){Object(i.a)(this,e),this.arrangeSpaces=function(){for(var e=[this.submarine],t=0;t<this.tileSet.length;t++)for(var r=0;r<this.tileSet[t].valueScores.length;r++){var n=new S,a=new b(this.tileSet[t].valueLevel,this.tileSet[t].valueScores[r]);n.setTreasure(a),e.push(n)}return e},this.shuffletileSet=function(e){var t=this;return e.map((function(e){return Object(g.a)({},e,{valueScores:t.shuffle(e.valueScores)})}))},this.shuffle=function(e){for(var t=e.length-1;t>0;t--){var r=Math.floor(Math.random()*(t+1)),n=[e[r],e[t]];e[t]=n[0],e[r]=n[1]}return e},this.submarine=new y(t),this.tileSet=[{valueLevel:1,valueScores:[0,0,1,1,2,2,3,3]},{valueLevel:2,valueScores:[4,4,5,5,6,6,7,7]},{valueLevel:3,valueScores:[8,8,9,9,10,10,11,11]},{valueLevel:4,valueScores:[12,12,13,13,14,14,15,15]}],this.shuffletileSet(this.tileSet),this.path=this.arrangeSpaces(),console.log("board created: "+JSON.stringify(this))},y=function e(t){Object(i.a)(this,e),this.players=t,this.treasure=null,console.log("Submarine created: "+JSON.stringify(this))},S=function e(){Object(i.a)(this,e),this.setTreasure=function(e){console.log("setTreasure called"),this.treasure=e},this.treasure=null,this.players=[],console.log("Space created: "+JSON.stringify(this))},b=function e(t,r){Object(i.a)(this,e),this.valueLevel=t,this.valueScore=r,console.log("Treasure created: "+JSON.stringify(this))};function x(e){var t=e.game,r=null,n=null,s=t.players[t.currentPlayerIndex],o=t.board.path[s.currentLocation];s.treasureBag.length>0&&(r=s.treasureBag.map((function(e,r){return a.a.createElement("button",{key:r,onClick:function(e){return t.putDownTreasure(r)}},"Put Down Treasure Of Level ",e.valueLevel)}))),o.treasure&&(n=a.a.createElement("button",{onClick:function(e){return t.pickUpTreasure()}},"Pick Up Treasure"));var i=t.players.map((function(e,t){var r="Nothing";return e.treasureBag.length>0&&(r=e.treasureBag.map((function(e){return e.valueLevel})).join(", ")),a.a.createElement(a.a.Fragment,null,a.a.createElement("p",null,"Player ",t+1," Store: ",JSON.stringify(e.treasureStore)),a.a.createElement("p",null,"Player ",t+1," Bag: ",r))}));return a.a.createElement("div",{className:"control-panel"},a.a.createElement("div",{className:"player-status"},i),a.a.createElement("br",null),a.a.createElement("button",{onClick:function(e){return t.move()}},"Move"),a.a.createElement("button",{onClick:function(e){return t.turnAround()}},"Turn Around"),n,r,a.a.createElement("button",{onClick:function(e){return t.endTurn()}},"End Turn"))}var E=function(e){function t(e){var r;return Object(i.a)(this,t),(r=Object(c.a)(this,Object(u.a)(t).call(this,e))).updateDisplay=function(){r.setState({renderId:r.state.renderId++})},r.displayPlayers=function(e){return e.players.map((function(e,t){return a.a.createElement("div",{key:t,className:"player",style:{backgroundColor:e.colour.toLowerCase()}},a.a.createElement("span",{className:"direction"},"down"===e.direction?">":"<"),a.a.createElement("p",{className:"name"},e.name))}))},r.displayPath=function(){return r.game.board.path.map((function(e,t){var n="";e instanceof y?n="submarine":e instanceof S&&(n="space");var s=r.displayPlayers(e),o="";return e.treasure&&(o=Array.isArray(e.treasure)?e.treasure.map((function(e){return e.valueLevel})).join(", "):e.treasure.valueLevel),a.a.createElement("div",{key:t,className:p()("tile-item",n)},a.a.createElement("p",{className:"value-level"},o),s)}))},r.currentPlayerIndex=0,r.state={renderId:0},r.game=new d([{name:"chris",colour:"Red"},{name:"sophie",colour:"Green"}]),window.game=r.game,setInterval(r.updateDisplay,10),r}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.displayPath();return a.a.createElement("div",{className:"game-container"},a.a.createElement(x,{game:this.game}),e)}}]),t}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[10,1,2]]]);
//# sourceMappingURL=main.a2dd9f11.chunk.js.map