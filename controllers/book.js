import { writeFileSync, readFileSync } from 'fs';
import chalk from 'chalk';
import { success, error } from '../utils/response.js';

export const listBook = (req, res) => { // Notez que req vient avant res
  const books = JSON.parse(readFileSync('./data/books.json', 'utf-8'));
  res.status(200).send(books);
}

// Fonction pour recuperer un utilisateur dans le fichier books.json en utilisant l'id
export const getBooks = (req, res) => {
  const { id } = req.params;
  console.log({ id });
  let books;
  try {
    books = JSON.parse(readFileSync('./data/books.json', 'utf-8'));

  } catch (error) {
    console.log(chalk.red('Failed to read the file.'));
    return;
  }

  const book = books.find((book) => book.id == id);
  if (!book) {
    error(res, 'book not found.');
  } else {
    success(res, book);
  }
}


// Fonction pour ajouter un utilisateur dans le fichier books.json en utilisant le body json 
export const addBook = (req, res) => {
  const body = req.body;
  let books;
  console.log(body);
  try {
    books = JSON.parse(readFileSync('./data/books.json', 'utf-8'));
  } catch (error) {
    books = [];
  }
  console.log({ books });
  if (books.some((book) => book.id == body.id)) {

    error(res, 'book already exists. Please use a different id.');
  } else {
    const lastBook = books[books.length - 1];
    const newId = lastBook ? lastBook.id + 1 : 1;

    // Ajouter le nouvel ID au body
    body.id = newId;

    books.push(body);
    writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
    success(res, 'book added successfully.');
  }
}

// Fonction pour modifier un utilisateur dans le fichier books.json en utilisant le body json 
export const modifyBook = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  let books;
  try {
    books = JSON.parse(readFileSync('./data/books.json', 'utf-8'));
  } catch (error) {
    console.log(chalk.red('Failed to read the file.'));
    return;
  }
  const bookIndex = books.findIndex((book) => book.id == id);
  if (bookIndex > -1) {
    books[bookIndex] = { ...books[bookIndex], ...body };
    writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
    success(res, 'book updated successfully.');
  } else {
    error(res, 'book not found.');
  }
}

// Fonction pour supprimer un utilisateur dans le fichier books.json en utilisant l'id
export const deleteBook = (req, res) => {
  const { id } = req.params;
  let books;
  try {
    books = JSON.parse(readFileSync('./data/books.json', 'utf-8'));
  } catch (error) {
    console.log(chalk.red('Failed to read the file.'));
    return;
  }
  const bookIndex = books.findIndex((book) => book.id == id);
  if (bookIndex > -1) {
    books.splice(bookIndex, 1);
    writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
    success(res, 'book deleted successfully.');
  } else {
    error(res, 'book not found.');
  }
}