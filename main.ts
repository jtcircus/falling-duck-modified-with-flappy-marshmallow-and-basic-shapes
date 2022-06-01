enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Gap = SpriteKind.create()
}
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    // negative vy is movement UPWARD
    Floater.vy = -100
    animation.setAction(Floater, ActionKind.Jumping)
    Floater.startEffect(effects.rings, 300)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gap, function (sprite, otherSprite) {
    // If the right edge of the scoreLine - left edge of the floater is less than 2, it's a score!
    if (otherSprite.right - sprite.left < 2) {
        info.changeScoreBy(1)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false)
})
let movingBOTTOMwall: Sprite = null
let movingTOPwall: Sprite = null
let scoreLINE: Sprite = null
let LINE: Image = null
let bottomWALL: Image = null
let topWALL: Image = null
let wallNUMBER = 0
let Floater: Sprite = null
scene.setBackgroundColor(13)
info.setScore(0)
effects.blizzard.startScreenEffect()
Floater = sprites.create(assets.image`Marshmallow 1`, SpriteKind.Player)
Floater.ay = 300
let anim = animation.createAnimation(ActionKind.Jumping, 25)
anim.addAnimationFrame(assets.image`Marshmallow 1`)
anim.addAnimationFrame(assets.image`Marshmallow 2`)
anim.addAnimationFrame(assets.image`Marshmallow 3`)
anim.addAnimationFrame(assets.image`Marshmallow 4`)
anim.addAnimationFrame(assets.image`Marshmallow 5`)
anim.addAnimationFrame(assets.image`Marshmallow 4`)
anim.addAnimationFrame(assets.image`Marshmallow 3`)
anim.addAnimationFrame(assets.image`Marshmallow 2`)
animation.attachAnimation(Floater, anim)
game.onUpdate(function () {
    if (Floater.vy > 0) {
        // This simply stops the jumping animation so the sprite is kind of frozen as it is falling/ moving to bottom of screen.  This is because there isn't actually an animation sequence associated with walking in this program.
        animation.setAction(Floater, ActionKind.Idle)
    }
    if (Floater.bottom > scene.screenHeight() || Floater.top < 0) {
        game.over(false)
    }
})
game.onUpdateInterval(1500, function () {
    wallNUMBER = randint(1, 4)
    if (wallNUMBER == 1) {
        // Top Image will be a projectile that is moving left on screen
        topWALL = assets.image`Top 1`
        // bottomImage is a projectile that is also moving left on the screen
        bottomWALL = assets.image`Bottom 1`
    } else if (wallNUMBER == 2) {
        topWALL = assets.image`Top 2`
        bottomWALL = assets.image`Bottom 2`
    } else if (wallNUMBER == 3) {
        topWALL = assets.image`Top 3`
        bottomWALL = assets.image`Bottom 3`
    } else {
        topWALL = assets.image`Top 4`
        bottomWALL = assets.image`Bottom 4`
    }
    LINE = image.create(2, scene.screenHeight())
    LINE.fill(1)
    scoreLINE = sprites.create(LINE, SpriteKind.Gap)
    scoreLINE.setFlag(SpriteFlag.AutoDestroy, true)
    // Invisible line in front of obstacle
    scoreLINE.setFlag(SpriteFlag.Invisible, true)
    // the scoreLINE starts on the right edge of the screen
    scoreLINE.left = scene.screenWidth()
    scoreLINE.vx = -45
    movingTOPwall = sprites.createProjectileFromSide(topWALL, -45, 0)
    movingTOPwall.top = 0
    movingBOTTOMwall = sprites.createProjectileFromSide(bottomWALL, -45, 0)
    movingBOTTOMwall.bottom = scene.screenHeight()
})
