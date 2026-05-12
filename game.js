class AryanAdventure {
    constructor() {
        this.gameState = {
            sceneId: 'intro',
            health: 100,
            maxHealth: 100,
            exp: 0,
            maxExp: 100,
            level: 1
        };

        this.scenes = this.initializeScenes();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadGame();
        this.displayScene();
    }

    setupEventListeners() {
        document.getElementById('restart-btn').addEventListener('click', () => this.restartGame());
        document.getElementById('save-btn').addEventListener('click', () => this.saveGame());
        document.getElementById('load-btn').addEventListener('click', () => this.loadGame());
    }

    initializeScenes() {
        return {
            intro: {
                title: "ARYAN'S ADVENTURE",
                text: `
***  ARYAN'S ADVENTURE  ***
A CLASSIC TEXT ADVENTURE

You awaken in the village of Eldergrove with no memory of how you arrived.
The air smells of smoke and fear.

An old woman approaches you nervously.
"Please, stranger... three of our hunters ventured into Darkwood Forest
three days ago. They have not returned. 

Terrible things stir in those woods now. 
Will you help us find them?"`,
                choices: [
                    { text: "Accept the quest", next: 'village' },
                    { text: "Ask about the hunters", next: 'elder_talk' },
                    { text: "Refuse and leave", next: 'rejected' }
                ]
            },
            rejected: {
                title: "COWARDICE",
                text: `
You turn away from the village elder.
As you walk away, the villagers whisper in disappointment.

"Another coward," one mutters.
"We are doomed," says another.

Without purpose, you wander aimlessly until nightfall.
Alone and afraid, you eventually perish in the wilderness.

GAME OVER.`,
                choices: [
                    { text: "Try again", next: 'intro' }
                ]
            },
            elder_talk: {
                title: "THE ELDER'S TALE",
                text: `
The elder sits down heavily on a wooden bench.

"The hunters were Kael, Mira, and old Thom. 
Kael went to find the legendary Crystal of Eldergrove, 
hidden in the Tower of Wisdom deep in the forest.

Mira and Thom went with him for protection.
But they never returned.

Something ancient has awakened in those woods.
A shadow creature... older than memory itself."

She looks at you with desperate eyes.
"Will you save them?"`,
                choices: [
                    { text: "Head to Darkwood Forest immediately", next: 'forest_entrance' },
                    { text: "Visit the blacksmith for equipment first", next: 'blacksmith' }
                ]
            },
            village: {
                title: "THE VILLAGE OF ELDERGROVE",
                text: `
You nod solemnly. "I will help you."

The elder clasps your hands with relief.
"Thank the gods. We have a blacksmith who might outfit you.
Or you can head straight into Darkwood Forest to search for them.

Choose wisely, stranger. The forest grows darker as night falls."`,
                choices: [
                    { text: "Visit the blacksmith", next: 'blacksmith' },
                    { text: "Head to Darkwood Forest", next: 'forest_entrance' }
                ]
            },
            blacksmith: {
                title: "THE BLACKSMITH'S FORGE",
                text: `
You enter a dimly lit forge. Sparks fly as a gruff man works at his anvil.

"Hail, traveler. I am Gareth, blacksmith of Eldergrove.
You look like you're heading to the cursed forest.

I have a steel sword. Strong and true.
Retrieve the ore from the cave to the north, and it's yours."

A quest marker appears in your mind.
QUEST ADDED: Retrieve Ore from the Northern Cave`,
                choices: [
                    { text: "Accept the quest", next: 'ore_cave' },
                    { text: "Decline and head to the forest", next: 'forest_entrance' }
                ]
            },
            ore_cave: {
                title: "THE NORTHERN CAVE",
                text: `
You venture north from the village. The cave mouth yawns before you,
dark and ominous.

As you enter, your eyes adjust to the gloom.
A low growl echoes through the cavern.

A massive wolf emerges, its eyes glowing with an eerie red light.

"This is MY cave, human," it snarls.
"Few have entered here and lived to tell of it."`,
                choices: [
                    { text: "Fight the wolf", next: 'wolf_battle' },
                    { text: "Try to negotiate", next: 'wolf_talk' },
                    { text: "Run back to the village", next: 'village' }
                ]
            },
            wolf_talk: {
                title: "PARLEY WITH THE BEAST",
                text: `
You raise your hands peacefully.

The wolf pauses, tilting its head in surprise.
For a moment, tension fills the air.

Then, slowly, the beast's aggressive stance softens.

"You show wisdom, human. Few have the courage to speak
when they could have fought."

It sits, regarding you with intelligent eyes.

"I am no mere animal. I am guardian of these mountains.
The hunters you seek... they passed through here.
They went seeking the Tower of Wisdom."

You gain: ANCIENT KNOWLEDGE
"Follow the river north. It will lead you there."`,
                choices: [
                    { text: "Head north along the river", next: 'river_path' },
                    { text: "Ask about the shadow creature", next: 'shadow_info' }
                ]
            },
            shadow_info: {
                title: "DARK TIDINGS",
                text: `
The wolf's eyes glow brighter.

"The shadow... it comes from the north. 
It is as old as the land itself, bound by ancient magic.
But there is a way to stop it.

The Crystal of Eldergrove holds the light of creation.
With that crystal, you can banish the shadow back to the void."

The wolf stands and looks toward the mountains.

"Go. The river north will guide you. 
And human... be brave. The path ahead is dark."`,
                choices: [
                    { text: "Head north along the river", next: 'river_path' }
                ]
            },
            wolf_battle: {
                title: "BATTLE WITH THE ALPHA WOLF",
                text: `
You draw your weapon and face the beast.

The wolf lunges with terrible speed!
You dodge to the side and strike.
Your blow connects, but the wolf is fast.

You exchange blow for blow in a desperate struggle.
The cave echoes with the clash of fang and steel.

Finally, with one last mighty swing, you defeat the beast.
The wolf falls, its glow fading.

VICTORY!
You gain: 25 EXP
You gain: WOLF FANG (souvenir)

Beneath where the wolf fell, you find ore glinting in the darkness.`,
                choices: [
                    { text: "Return to the blacksmith with the ore", next: 'blacksmith_reward' }
                ]
            },
            blacksmith_reward: {
                title: "A BLADE FORGED IN FIRE",
                text: `
The blacksmith's eyes light up when he sees the ore.

"Excellent! With this ore, I can forge a weapon worthy of legend!"

He works through the night, and by morning, presents you with a
finely crafted steel sword, gleaming in the dawn light.

STEEL SWORD OBTAINED!
Your power increases!

"Go now, hero. Save our hunters. Save us all."`,
                choices: [
                    { text: "Head to Darkwood Forest", next: 'forest_entrance' }
                ]
            },
            forest_entrance: {
                title: "DARKWOOD FOREST",
                text: `
You stand at the edge of Darkwood Forest.
The trees loom impossibly tall, their branches bare and skeletal.
A cold wind whispers through the woods, carrying a sense of dread.

The path before you splits in two directions:
- To the left, you see a narrow trail through the trees
- To the right, you notice a clearing with what looks like a campfire

Somewhere in this forest, the hunters await.
Somewhere in this forest, the Shadow dwells.`,
                choices: [
                    { text: "Take the left path deeper into the forest", next: 'forest_deep' },
                    { text: "Investigate the clearing on the right", next: 'hunters_camp' }
                ]
            },
            hunters_camp: {
                title: "THE ABANDONED CAMP",
                text: `
You find the hunters' camp. Tents are torn, supplies scattered.
A journal lies open on the ground.

Reading the hastily scrawled notes:

"We have found the Tower of Wisdom.
But something attacks in the shadows...
A creature of pure darkness...
We are going inside the tower.
If we don't return, the tower holds the Crystal.
Use it to end this curse."

The journal ends abruptly.

A faint red glow appears in the distance.`,
                choices: [
                    { text: "Follow the glow toward the tower", next: 'tower_entrance' },
                    { text: "Venture deeper into the forest", next: 'forest_deep' }
                ]
            },
            forest_deep: {
                title: "INTO THE ABYSS",
                text: `
You venture deeper into the forest.
The trees grow thicker, the light dimmer.
The air becomes cold... impossibly cold.

Then you see it.

A mass of pure darkness, shaped vaguely like a creature.
Red eyes that burn with ancient hatred.
It hovers above the ground, blocking your path.

"I SENSE YOU, MORTAL," it hisses.
"YOUR LIFE FORCE CALLS TO ME.
GIVE ME YOUR ESSENCE, AND YOUR END SHALL BE SWIFT."

The Shadow creature advances slowly, inexorably.`,
                choices: [
                    { text: "Stand and fight", next: 'shadow_battle' },
                    { text: "Try to flee", next: 'forest_entrance' },
                    { text: "Face it with courage", next: 'shadow_battle' }
                ]
            },
            shadow_battle: {
                title: "THE SHADOW'S WRATH",
                text: `
You face the creature of darkness.

It attacks with tendrils of shadow that lash out like whips.
You dodge, weave, and strike back with your blade.

But normal steel seems to pass through it with little effect!
The shadow grows larger, angrier.

Just as despair begins to set in, you remember the crystal.
The tower! You must reach the tower and find the crystal!

With great effort, you push past the shadow creature
and flee toward the tower.

The shadow gives chase, but the tower's light repels it.`,
                choices: [
                    { text: "Enter the tower quickly", next: 'tower_entrance' }
                ]
            },
            tower_entrance: {
                title: "THE TOWER OF WISDOM",
                text: `
Before you stands a magnificent tower of white stone.
It glows with an ethereal light that pushes back the darkness.

The hunters are here - trapped in a magical barrier!

"ARYAN!" Kael shouts. "THE CRYSTAL! GET THE CRYSTAL!"

Mira points upward. "IT'S AT THE TOP! HURRY!"

The shadow creature claws at the barrier, trying to break through.
You don't have much time.`,
                choices: [
                    { text: "Rush into the tower", next: 'tower_climb' }
                ]
            },
            tower_climb: {
                title: "ASCENDING TO DESTINY",
                text: `
You climb the spiral stairs of the tower.
Your legs burn with effort.
Higher and higher you go.

The tower seems to go on forever.
But finally... you reach the top chamber.

There, suspended in mid-air, glows the Crystal of Eldergrove.
Pure white light radiates from it.
It is impossibly beautiful.

As you approach, a figure materializes before you.
The Tower Keeper - an ancient spirit bound to guard the crystal.

"STOP, MORTAL.
YOU MUST PROVE YOURSELF WORTHY."`,
                choices: [
                    { text: "Challenge the guardian", next: 'guardian_battle' },
                    { text: "Speak words of peace", next: 'guardian_peace' }
                ]
            },
            guardian_peace: {
                title: "THE KEEPER'S JUDGMENT",
                text: `
You bow before the guardian.

"Ancient one, I do not come for conquest.
I come to save lives and banish the shadow that plagues this land.
I ask not for power, but for permission."

The guardian is silent for a long moment.
Then, slowly, its form becomes less threatening.

"Your heart is pure, seeker.
Few in this age speak with such wisdom.
Take the crystal. Use it well.
Go. Save the world from darkness."

The crystal floats down into your hands.
It is warm, alive, pulsing with ancient power.

QUEST COMPLETE: THE CRYSTAL OF ELDERGROVE
VICTORY IS WITHIN REACH.`,
                choices: [
                    { text: "Descend the tower with the crystal", next: 'final_battle' }
                ]
            },
            guardian_battle: {
                title: "BATTLE WITH THE TOWER KEEPER",
                text: `
The guardian transforms into a being of pure light.
Magical attacks rain down upon you!

You dodge and weave, fighting with all your might.
Your blade clashes against pure energy.

The battle is fierce and terrible.
But in your heart, you feel something - determination.

With one final strike, powered by righteous fury,
you defeat the guardian.

It dissolves into light and fades away.
The crystal falls into your hands.

YOUR STRENGTH GROWS.
YOU ARE CHANGED BY THIS TRIAL.

QUEST COMPLETE: THE CRYSTAL OF ELDERGROVE`,
                choices: [
                    { text: "Descend with the crystal", next: 'final_battle' }
                ]
            },
            final_battle: {
                title: "THE FINAL CONFRONTATION",
                text: `
You exit the tower, crystal held high.
Its light blazes like a second sun.

The shadow creature SHRIEKS in agony as the crystal's light
touches it.

"NOOOOO! THIS IS NOT POSSIBLE!
I AM ETERNAL! I CANNOT BE DEFEATED!"

You raise the crystal higher.
The light grows blinding.

"For Eldergrove! For the hunters! For the light!"

The crystal's power surges forth, obliterating the shadow.
The creature is torn apart by pure luminescence.

It dissolves into nothingness with one final, fading cry.

The darkness lifts from the forest.
Sunlight pours through the trees for the first time in weeks.
The curse is broken.`,
                choices: [
                    { text: "Free the hunters", next: 'ending' }
                ]
            },
            ending: {
                title: "VICTORY!",
                text: `
The magical barrier shatters.
Kael, Mira, and Thom stumble forward, freed at last.

"You did it," Kael breathes. "You actually did it."

The villagers emerge from their homes to see the crystal's light.
They celebrate in the streets.

The elder approaches you, tears in her eyes.

"You have saved us all, brave hero.
The shadow that plagued these lands for centuries is gone.
Your name will be sung in legend."

You have completed your quest.
The world is safer because of your courage.

         *** THE END ***

Congratulations, Aryan.
You are a true hero of legend.

Would you like to play again?`,
                choices: [
                    { text: "Play again", next: 'intro' }
                ]
            }
        };
    }

    displayScene() {
        const scene = this.scenes[this.gameState.sceneId];
        if (!scene) {
            this.gameState.sceneId = 'intro';
            return this.displayScene();
        }

        const storyDiv = document.getElementById('story');
        storyDiv.innerHTML = `<h2>${scene.title}</h2><p>${scene.text}</p>`;
        
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';
        
        scene.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = `${index + 1}. ${choice.text}`;
            btn.addEventListener('click', () => {
                this.gameState.sceneId = choice.next;
                this.displayScene();
            });
            choicesDiv.appendChild(btn);
        });

        this.updateUI();
    }

    updateUI() {
        document.getElementById('health-text').textContent = `${this.gameState.health}/${this.gameState.maxHealth}`;
        document.getElementById('level-text').textContent = this.gameState.level;
        document.getElementById('exp-text').textContent = `${this.gameState.exp}/${this.gameState.maxExp}`;
    }

    saveGame() {
        localStorage.setItem('aryan_save', JSON.stringify(this.gameState));
        alert('GAME SAVED.');
    }

    loadGame() {
        const saved = localStorage.getItem('aryan_save');
        if (saved) {
            this.gameState = JSON.parse(saved);
            this.displayScene();
            alert('GAME LOADED.');
        }
    }

    restartGame() {
        if (confirm('ARE YOU SURE YOU WANT TO START A NEW GAME?')) {
            this.gameState = {
                sceneId: 'intro',
                health: 100,
                maxHealth: 100,
                exp: 0,
                maxExp: 100,
                level: 1
            };
            this.displayScene();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AryanAdventure();
});
