#!usr/bin/env node

import inquirer from "inquirer";

// For HeroPlayer
class Player {
    name: string;
    health = 100;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        this.health = 100;
    }
}

// For Enemy
class Enemy {
    name: string;
    health = 100;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 20;
    }

    increaseHealth() {
        this.health = 100;
    }
}

// Main function
async function main() {
    const { playerName } = await inquirer.prompt([
        {
            type: "input",
            name: "playerName",
            message: "Enter Your Player Name:"
        }
    ]);

    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["Alien", "Zombie", "Witch"],
            message: "Select the enemy you fight with:"
        }
    ]);

    const player = new Player(playerName);
    const enemy = new Enemy(enemyType);
    // Sort player and enemy names alphabetically
    const sortedNames = [player.name, enemy.name].sort();
    const sortedPlayerName = sortedNames[0];
    const sortedEnemyName = sortedNames[1];
    console.log(`${sortedPlayerName} v/s ${sortedEnemyName}`);

    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "range target", "run"],
                message: "Choose the attack type to perform action:"
            }
        ]);

        switch (action) {
            case "attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    player.decreaseHealth();
                    console.log(`${sortedPlayerName} health: ${player.health}`);
                    console.log(`${sortedEnemyName} health: ${enemy.health}`);
                    if (player.health <= 0) {
                        console.log(`You Loss ${sortedPlayerName}, Try Again.`);
                        return;
                    }
                } else {
                    enemy.decreaseHealth();
                    enemy.decreaseHealth();
                    console.log(`${sortedPlayerName} health: ${player.health}`);
                    console.log(`${sortedEnemyName} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log(`Congratulations ${sortedPlayerName}, You Won!`);
                        return;
                    }
                }
                break;
        }
    } while (true);
}

main();