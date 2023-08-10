import { success, error } from '../utils/response.js';
import book from '../models/Books.js';

//Fonction pour recuperer tous les livres de la base mongodb avec mongoose
export const getAllBooks = async (req, res) => {
  try {
    const books = await book.find({});
    success(res, 400, books);
  } catch (err) {
    console.error(err);
    error(res, 500, 'Book not found.');
  }
}

// Fonction pour recuperer un livre dans la base mongodb avec mongoose
export const getBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await book.findById(bookId);
    success(res, 400, book);
  } catch (err) {
    error(res, 404, 'Book not found.');
  }
}

// Fonction pour rajouter un livre dans la base mongodb avec mongoose
export const createBook = (req, res) => {
  const newBook = new book(req.body);

  newBook.save()
    .then(() => {
      console.log('Livre enregistré avec succès !');
      res.status(201).send('Livre créé avec succès');
    }
    )
    .catch(err => {
      console.error('Une erreur est survenue lors de l\'enregistrement du livre', err);
      res.status(500).send('Erreur lors de la création du livre');
    }
    );
}

// Fonction pour mettre a jour un livre dans la base mongodb avec mongoose
export const updateBook = async (req, res) => {
  const bookId = req.params.id;
  const updateData = { ...req.body };
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return error(res, 400, 'Identifiant non valide');
  }

  try {
    const updateBook = await book.findByIdAndUpdate(bookId, updateData, { new: true });

    if (!updateBook) {
      return error(res, 404, 'Book not found.');

    }
    success(res, 200, `Livre ${req.body.title} mis à jour avec succès`);
  }
  catch (err) {
    error(res, 404, 'Book not found.');
  }
  success(res, 200, `Livre ${req.body.title} mis à jour avec succès`);
}

// Fonction pour supprimer un livre dans la base mongodb avec mongoose
 export const deleteBook = async (req, res) => {
  const bookId= req.params.id;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return error(res, 400, 'Identifiant non valide');
  }
  try {
    const deleteBook = await book.findByIdAndDelete(bookId);
    if (!deleteBook) {
      return error(res, 404, 'Book not found.');
    }
    success(res, 200, `Livre ${req.body.title} supprimé avec succès`);
  }
  catch (err) {
    error(res, 404, 'Book not found.');
  }
  success(res, 200, `Livre ${req.body.title} supprimé avec succès`);
}
