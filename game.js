class AryanAdventure {
    constructor() {
        this.gameState = {
            sceneId: 'start',
            health: 100,
            maxHealth: 100,
            exp: 0,
            maxExp: 100,
            level: 1,
            strength: 10,
            intelligence: 10,
            agility: 10,
            inventory: [],
            defeatedEnemies: [],
            completedQuests: []
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
            start: {
                title: "The Beginning",
                text: "You wake up in the small village of Eldergrove, unsure of how you got here. Your name is Aryan, and you have a strange feeling that destiny awaits you.\n\nThe village elder approaches you with a concerned look. 'We need your help,' she says, 'Dark forces have been stirring in the nearby forest. Our hunters have gone missing.'",
                choices: [
                    { text: "I'll investigate the forest and find the hunters", next: 'forest_entrance' },
                    { text: "Let me prepare first - I'll visit the blacksmith", next: 'blacksmith' },
                    { text: "I need more information - talk to the village elder", next: 'elder_talk' }
                ]
            },
            blacksmith: {
                title: "The Blacksmith's Forge",
                text: "You enter the forge and are greeted by a gruff blacksmith. The heat from the furnace is intense.\n\n'Looking for weapons, are ya?' he asks. 'I have a steel sword that would serve you well. It's yours if you help me retrieve ore from the cave to the north.'",
                choices: [
                    { text: "Accept the quest and head to the ore cave", next: 'ore_cave' },
                    { text: "Decline and return to the village", next: 'start' }
                ]
            },
            elder_talk: {
                title: "The Elder's Wisdom",
                text: "'Thank you for coming,' the elder says. 'Three hunters went into the Darkwood Forest three days ago. They haven't returned. The forest has always been dangerous, but recently... the danger feels different. Unnatural.'\n\nShe hands you a map. 'If you find them, the village will reward you handsomely.'",
                choices: [
                    { text: "Head to the forest immediately", next: 'forest_entrance' },
                    { text: "Visit the blacksmith first for better equipment", next: 'blacksmith' }
                ]
            },
            ore_cave: {
                title: "The Ore Cave",
                text: "You venture north and find the ore cave. Inside, you hear a low growl. A massive wolf emerges from the shadows, its eyes glowing red.\n\n'You've stumbled into MY cave,' the wolf snarls.",
                choices: [
                    { text: "Fight the wolf!", next: 'wolf_fight' },
                    { text: "Try to reason with the beast", next: 'wolf_talk' },
                    { text: "Run back to the village", next: 'start' }
                ]
            },
            wolf_fight: {
                title: "Battle with the Alpha Wolf",
                text: this.generateCombatText('Alpha Wolf', 50),
                choices: [
                    { text: "Use your strength - Direct attack!", next: this.resolveCombat('wolf_fight', 'strength', 'wolf_victory') },
                    { text: "Use your agility - Swift strikes!", next: this.resolveCombat('wolf_fight', 'agility', 'wolf_victory') },
                    { text: "Use intelligence - Cast a spell!", next: this.resolveCombat('wolf_fight', 'intelligence', 'wolf_victory') }
                ]
            },
            wolf_victory: {
                title: "Victory!",
                text: "You've defeated the alpha wolf! As it falls, you notice the ore sparkling behind where it stood. You collect the ore and head back to the blacksmith.",
                choices: [
                    { text: "Return to the blacksmith", next: 'blacksmith_reward' }
                ]
            },
            blacksmith_reward: {
                title: "The Blacksmith's Reward",
                text: "The blacksmith's eyes light up when he sees the ore. 'Excellent! With this, I can forge the finest steel sword in the region. Here, take it!' \n\nYou receive a Steel Sword! Your strength increases by 5.",
                choices: [
                    { text: "Thank him and head to the forest", next: 'forest_entrance' }
                ]
            },
            wolf_talk: {
                title: "Parley with the Beast",
                text: "You hold up your hands peacefully. The wolf tilts its head, surprised by your courage. After a tense moment, it speaks:\n\n'You show wisdom, human. The darkness in the forest... it's spreading from the north. A shadow creature has awakened. The hunters you seek fell to it.'",
                choices: [
                    { text: "Ask about defeating the shadow creature", next: 'shadow_creature_quest' },
                    { text: "Ask where to find the hunters", next: 'forest_entrance' }
                ]
            },
            shadow_creature_quest: {
                title: "The Shadow's Secret",
                text: "The wolf growls softly. 'To defeat the shadow, you'll need the light of the Crystal of Eldergrove. It's hidden in the Tower of Wisdom, deep in the forest. The hunters were heading there when they were ambushed.'",
                choices: [
                    { text: "Head to the forest to find the tower", next: 'forest_entrance' }
                ]
            },
            forest_entrance: {
                title: "The Darkwood Forest",
                text: "You stand at the edge of the dense forest. The trees seem to lean toward you, their branches reaching like skeletal fingers. The air is cold and ominous.\n\nYou can see two paths ahead: one leads deeper into the forest toward where the tower should be, the other seems to lead toward a small clearing.",
                choices: [
                    { text: "Take the path deeper into the forest", next: 'forest_deep' },
                    { text: "Check out the clearing", next: 'forest_clearing' }
                ]
            },
            forest_clearing: {
                title: "A Mysterious Clearing",
                text: "In the clearing, you find remnants of a camp - torn tents and scattered supplies. You also find a journal.\n\nReading it, you learn that the hunters discovered a passage that leads to the Tower of Wisdom. They were about to enter when something attacked them in the darkness.",
                choices: [
                    { text: "Follow the hunters' trail to the tower", next: 'tower_entrance' },
                    { text: "Search the camp more thoroughly", next: 'forest_deep' }
                ]
            },
            forest_deep: {
                title: "Into the Abyss",
                text: "As you venture deeper, the forest becomes darker. You encounter a shadow creature - a mass of darkness with glowing red eyes, the same creature the wolf warned you about.\n\n'Give me your soul, mortal...' it whispers.",
                choices: [
                    { text: "Face the shadow in battle", next: 'shadow_battle' },
                    { text: "Try to flee", next: 'forest_entrance' }
                ]
            },
            shadow_battle: {
                title: "Battle with the Shadow",
                text: this.generateCombatText('Shadow Creature', 75),
                choices: [
                    { text: "Strike with all your might!", next: this.resolveCombat('shadow_battle', 'strength', 'shadow_victory') },
                    { text: "Use magical energy!", next: this.resolveCombat('shadow_battle', 'intelligence', 'shadow_victory') },
                    { text: "Use your speed to dodge and counter!", next: this.resolveCombat('shadow_battle', 'agility', 'shadow_victory') }
                ]
            },
            shadow_victory: {
                title: "The Shadow Vanquished",
                text: "Your attack connects! The shadow creature dissipates with an unearthly shriek. The forest seems to lighten slightly. You press on toward the tower.",
                choices: [
                    { text: "Continue to the tower", next: 'tower_entrance' }
                ]
            },
            tower_entrance: {
                title: "The Tower of Wisdom",
                text: "You find a magnificent tower surrounded by ancient stones. The hunters are here - trapped in some kind of magical barrier!\n\n'Aryan!' one of them shouts. 'We can't break free! There's a crystal inside the tower - use it to free us!'",
                choices: [
                    { text: "Enter the tower", next: 'tower_inside' }
                ]
            },
            tower_inside: {
                title: "Tower Interior",
                text: "Inside the tower, you climb spiraling stairs. On the top floor, you find the Crystal of Eldergrove, glowing with pure white light. As you reach for it, the floor trembles.\n\nA final guardian appears - the Tower Keeper, an ancient spirit bound to protect the crystal.",
                choices: [
                    { text: "Challenge the guardian", next: 'guardian_battle' },
                    { text: "Try to reason with the guardian", next: 'guardian_talk' }
                ]
            },
            guardian_battle: {
                title: "Battle with the Tower Keeper",
                text: this.generateCombatText('Tower Keeper', 80),
                choices: [
                    { text: "Use brute force!", next: this.resolveCombat('guardian_battle', 'strength', 'guardian_victory') },
                    { text: "Outwit the guardian!", next: this.resolveCombat('guardian_battle', 'intelligence', 'guardian_victory') },
                    { text: "Evade and strike precisely!", next: this.resolveCombat('guardian_battle', 'agility', 'guardian_victory') }
                ]
            },
            guardian_talk: {
                title: "A Conversation with Eternity",
                text: "You speak calmly to the guardian. It pauses, and its form becomes less hostile.\n\n'You seek the crystal with a pure heart,' it says. 'I see now why destiny has brought you here. Take it. Save the hunters. Save the world from the shadow.'",
                choices: [
                    { text: "Take the crystal and leave", next: 'guardian_victory' }
                ]
            },
            guardian_victory: {
                title: "The Crystal Obtained",
                text: "You grasp the Crystal of Eldergrove. Its light envelops you, filling you with power and purpose. You rush back down the tower.",
                choices: [
                    { text: "Free the hunters with the crystal's power", next: 'ending' }
                ]
            },
            ending: {
                title: "Victory and a New Beginning",
                text: "You hold up the crystal, and its light breaks the dark barrier. The hunters are freed!\n\nThe shadow curse lifts from the forest. The village celebrates your heroism. The elder approaches you:\n\n'Aryan, you have saved us all. The darkness is gone. But we sense... this is only the beginning of your journey. Greater adventures await you beyond our village.'",
                choices: [
                    { text: "Start a New Game", next: 'start' }
                ]
            }
        };
    }

    generateCombatText(enemy, enemyHealth) {
        return `You face the ${enemy}! (Health: ${enemyHealth})\n\nYour Health: ${this.gameState.health}/${this.gameState.maxHealth}\n\nChoose your strategy:`;
    }

    resolveCombat(battleScene, strategy, victoryScene) {
        const base = this.gameState[strategy];
        const damage = base + Math.floor(Math.random() * 15);
        const enemyDamage = Math.floor(Math.random() * 20);
        
        this.gameState.health = Math.max(0, this.gameState.health - enemyDamage);
        this.gameState.exp = Math.min(this.gameState.maxExp, this.gameState.exp + 25);
        this.gameState[strategy] += 2;

        if (this.gameState.health <= 0) {
            return 'death';
        }

        if (this.gameState.exp >= this.gameState.maxExp) {
            this.levelUp();
        }

        return victoryScene;
    }

    levelUp() {
        this.gameState.level += 1;
        this.gameState.exp = 0;
        this.gameState.maxHealth += 20;
        this.gameState.health = this.gameState.maxHealth;
        this.gameState.strength += 3;
        this.gameState.intelligence += 3;
        this.gameState.agility += 3;
    }

    displayScene() {
        const scene = this.scenes[this.gameState.sceneId];
        if (!scene) {
            this.gameState.sceneId = 'start';
            return this.displayScene();
        }

        document.getElementById('story').innerHTML = `<h2>${scene.title}</h2><p>${scene.text}</p>`;
        
        const choicesDiv = document.getElementById('choices');
        choicesDiv.innerHTML = '';
        
        scene.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
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
        document.getElementById('exp-text').textContent = `${this.gameState.exp}/${this.gameState.maxExp}`;
        document.getElementById('strength').textContent = this.gameState.strength;
        document.getElementById('intelligence').textContent = this.gameState.intelligence;
        document.getElementById('agility').textContent = this.gameState.agility;
        document.getElementById('level').textContent = this.gameState.level;

        const healthPercent = (this.gameState.health / this.gameState.maxHealth) * 100;
        const expPercent = (this.gameState.exp / this.gameState.maxExp) * 100;
        
        document.getElementById('health-bar').style.width = healthPercent + '%';
        document.getElementById('exp-bar').style.width = expPercent + '%';

        const inventoryDiv = document.getElementById('inventory');
        if (this.gameState.inventory.length === 0) {
            inventoryDiv.innerHTML = '<div class="inventory-empty">Empty</div>';
        } else {
            inventoryDiv.innerHTML = this.gameState.inventory
                .map(item => `<div class="inventory-item">• ${item}</div>`)
                .join('');
        }
    }

    saveGame() {
        localStorage.setItem('aryan_save', JSON.stringify(this.gameState));
        alert('Game saved!');
    }

    loadGame() {
        const saved = localStorage.getItem('aryan_save');
        if (saved) {
            this.gameState = JSON.parse(saved);
        }
    }

    restartGame() {
        if (confirm('Are you sure you want to start a new game?')) {
            this.gameState = {
                sceneId: 'start',
                health: 100,
                maxHealth: 100,
                exp: 0,
                maxExp: 100,
                level: 1,
                strength: 10,
                intelligence: 10,
                agility: 10,
                inventory: [],
                defeatedEnemies: [],
                completedQuests: []
            };
            this.displayScene();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AryanAdventure();
});
