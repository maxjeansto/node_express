import { writeFileSync, readFileSync } from 'fs';
import chalk from 'chalk';
import { success, error } from '../utils/response.js';
import e from 'express';

// Fonction pour recuperer tous les utilisateurs dans le fichier users.json
export const listUsers = (req, res) => {
    const users = JSON.parse(readFileSync('./data/users.json', 'utf-8'));
    res.status(200).send(users);
}

export const getUsers = () => {
    return JSON.parse(readFileSync('./data/users.json', 'utf-8'));
  }


// Fonction pour recuperer un utilisateur dans le fichier users.json en utilisant l'id
export const getUser = (req, res) => {
    try {
       const { user } = req;
       success(res, user);
    } catch (err) { // Notez que j'ai changé le nom de la variable à 'err'
        error(res, 'User not found.');
    }
}


// Fonction pour ajouter un utilisateur dans le fichier users.json en utilisant les parametre url(id, name, email)
export const addUserUrl = (req, res) => {
    const { id, name, email } = req.query;
    let users;
    try {
        users = JSON.parse(readFileSync('./data/users.json', 'utf-8'));
    } catch (error) {
        users = [];
    }
    if (users.some((user) => user.id == id)) {
        error(res, 'User already exists. Please use a different id.');
    } else {
        users.push({ id, name, email });
        writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
        success(res, 'User added successfully.');
    }
}

// Fonction pour ajouter un utilisateur dans le fichier users.json en utilisant le body json 
export const addUser = (req, res) => {
    const body = req.body;
    let users;
    console.log(body);
    try {
        users = JSON.parse(readFileSync('./data/users.json', 'utf-8'));
    } catch (error) {
        users = [];
    }
    console.log({ users });
    if (users.some((user) => user.id == body.id)) {

        error(res, 'User already exists. Please use a different id.');
    } else {
        const lastUser = users[users.length - 1];
        const newId = lastUser ? lastUser.id + 1 : 1;

        // Ajouter le nouvel ID au body
        body.id = newId;
        users.push(body);
        writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
        success(res, 'User added successfully.');
    }
}

// Fonction pour modifier un utilisateur dans le fichier users.json en utilisant le body json 
export const modifyUser = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    let users;
    try {
        users = JSON.parse(readFileSync('./data/users.json', 'utf-8'));
    } catch (error) {
        console.log(chalk.red('Failed to read the file.'));
        return;
    }
    const userIndex = users.findIndex((user) => user.id == id);
    if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...body };
        writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
        success(res, 'User updated successfully.');
    } else {
        error(res, 'User not found.');
    }
}

// Fonction pour supprimer un utilisateur dans le fichier users.json en utilisant l'id
export const deleteUser = (req, res) => {
    const { id } = req.params;
    let users;
    try {
        users = JSON.parse(readFileSync('./data/users.json', 'utf-8'));
    } catch (error) {
        console.log(chalk.red('Failed to read the file.'));
        return;
    }
    const userIndex = users.findIndex((user) => user.id == id);
    if (userIndex > -1) {
        users.splice(userIndex, 1);
        writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
        success(res, 'User deleted successfully.');
    } else {
        error(res, 'User not found.');
    }
}