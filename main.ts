namespace SpriteKind {
    export const Gas = SpriteKind.create()
    export const Life_Up = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Go-N-Fight`, mySprite, 0, -70)
    projectile.startEffect(effects.fire)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Life_Up, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    sprites.destroy(otherSprite, effects.hearts, 500)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.blizzard, 500)
    otherSprite.destroy(effects.warmRadial, 500)
    info.changeScoreBy(1)
})
info.onScore(100, function () {
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
    music.play(music.melodyPlayable(music.beamUp), music.PlaybackMode.UntilDone)
})
info.onLifeZero(function () {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.melt)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    for (let index = 0; index < 1e+96; index++) {
        music.stopAllSounds()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    statusbar.value = 100
    otherSprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
    music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.UntilDone)
    game.setGameOverEffect(false, effects.melt)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.halo, 500)
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.UntilDone)
    info.changeScoreBy(-1)
})
let MyEnemy: Sprite = null
let myFuel: Sprite = null
let projectile: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
info.setScore(0)
effects.starField.startScreenEffect()
mySprite = sprites.create(assets.image`FlameShip`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setFlag(SpriteFlag.StayInScreen, true)
info.changeLifeBy(1)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -25, 0)
let Heart = sprites.create(assets.image`Heart`, SpriteKind.Life_Up)
game.onUpdateInterval(5000, function () {
    Heart = sprites.createProjectileFromSide(assets.image`Heart`, 0, 50)
    Heart.x = randint(5, 155)
    Heart.setKind(SpriteKind.Life_Up)
})
game.onUpdateInterval(5000, function () {
    myFuel = sprites.createProjectileFromSide(assets.image`FlameShip-PowerUp`, 0, 50)
    myFuel.x = randint(5, 155)
    myFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(1000, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`ColdEmenys`, 0, 50)
    MyEnemy.x = randint(5, 155)
    MyEnemy.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
