// Define Testimonial Schema
const testimonialSchema = new mongoose.Schema({
    name: String,
    role: String,
    content: String,
    rating: Number,
    image: String
});

// Create Model
const Testimonial = mongoose.model('Testimonial', testimonialSchema);