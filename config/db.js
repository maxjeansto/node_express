import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@clusterwebschool.sfh0ah3.mongodb.net/Library`;

mongoose.connect(url)
  .then(() => {
    console.log('Connecté à la base de données');
  })
  .catch(err => {
    console.error('Erreur de connexion', err);
  });

export default mongoose;
