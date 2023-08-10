import { success, error } from '../utils/response.js';
import user from '../models/Users.js';
import mongoose from 'mongoose';


//Fonction pour recuperer tous les utilisateur de la base mongodb avec mongoose
export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find({});
    success(res, 400, users);
  } catch (err) {
    console.error(err);
    error(res, 500, 'User not found.');
  }
};

// Fonction pour recuperer un utilisateur dans la base mongodb avec mongoose
export const getUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await user.findById(userId);
    success(res, 400, user);
  } catch (err) {
    error(res, 404, 'User not found.');
  }
};

// Fonction pour rajouter un utilisateur dans la base mongodb avec mongoose
export const createUser = (req, res) => {
  const newUser = new user(req.body);

  newUser.save()
    .then(() => {
      console.log('Utilisateur enregistré avec succès !');
      res.status(201).send('Utilisateur créé avec succès');
    })
    .catch(err => {
      console.error('Une erreur est survenue lors de l\'enregistrement de l\'utilisateur', err);
      res.status(500).send('Erreur lors de la création de l\'utilisateur');
    });
};

// Fonction pour mettre a jour un utilisateur dans la base mongodb avec mongoose

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updateData = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return error(res, 400, 'Identifiant non valide');
  }

  try {
    const updatedUser = await user.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return error(res, 404, 'Utilisateur non trouvé');
    }

    success(res, 200, `Utilisateur ${req.body.firstName} mis à jour avec succès`);
  } catch (err) {
    error(res, 500, "Erreur lors de la mise à jour de l'utilisateur", err);
  }
};

// Fonction pour supprimer un utilisateur dans la base mongodb avec mongoose

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return error(res, 400, 'Identifiant non valide');
  }

  try {
    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return error(res, 404, 'Utilisateur non trouvé');
    }
    success(res, 200, 'Utilisateur supprimé avec succès');
  } catch (e) {
    error(res, 500, 'Erreur non trouvée');
    console.error(e);
  }
};

