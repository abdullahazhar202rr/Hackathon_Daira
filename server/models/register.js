import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'provider'], required: true },
});

const Register = mongoose.model('Register', registerSchema);

export default Register;
