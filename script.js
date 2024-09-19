"use strict";

// Get references to DOM elements
const heroBar = document.getElementById("hero");
const heroHealth = document.getElementById("hero-health");
const monsterBar = document.getElementById("monster");
const monsterHealth = document.getElementById("monster-health");

document.getElementById("hero-attack").addEventListener("click", function () {
  hero.attack(monster);
});

document.getElementById("monster-attack").addEventListener("click", function () {
  monster.attack(hero);
});

document.getElementById("hero-heal").addEventListener("click", function () {
  hero.heal(20);
});

function Character(name, health, attackPower, healthBar) {
  this.name = name;
  this.health = health;
  this.maxHealth = health;
  this.attackPower = attackPower;
  this.healthBar = healthBar;

  this.attack = function (target) {
    target.health -= this.attackPower;
    if (target.health < 0) return;
    console.log(`${this.name} attacked ${target.name} for ${this.attackPower} damage.`);
    target.updateHealthBar();
    checkGameOver();
  };

  this.heal = function (amount) {
    this.health += amount;
    if (this.health > this.maxHealth) this.health = this.maxHealth; // Prevent going over max health
    console.log(`${this.name} healed for ${amount} health.`);
    this.updateHealthBar();
  };

  this.updateHealthBar = function () {
    this.healthBar.value = this.health;
    monsterHealth.textContent = `Monster Health: ${monster.health}`;
    heroHealth.textContent = `Hero Health: ${hero.health}`;
  };
}

// create the characthers
const hero = new Character("Hero", 100, 10, heroBar);
const monster = new Character("Monster", 100, 10, monsterBar);

function initializeHealthBars() {
  heroBar.max = hero.maxHealth;
  heroBar.value = hero.health;

  monsterBar.max = monster.maxHealth;
  monsterBar.value = monster.health;
}

initializeHealthBars();

function checkGameOver() {
  if (hero.health <= 0) {
    alert("Hero has been defeated! Game Over.");
    disableButtons();
  } else if (monster.health <= 0) {
    alert("Monster has been defeated! You Win!");
    disableButtons();
  }
}

function disableButtons() {
  document.getElementById("hero-attack").disabled = true;
  document.getElementById("monster-attack").disabled = true;
  document.getElementById("hero-heal").disabled = true;
}
