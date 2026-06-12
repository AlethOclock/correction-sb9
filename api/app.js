import "dotenv/config.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import session from "express-session";
import { attachUser } from "./middlewares/auth.js";

const app = express();
// ? dotenv.config();

app.use(cors({
  origin: 'http://localhost:3000', // ou le client
  credentials: true
}));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    
}));
app.use(express.urlencoded({ extended: true }));
app.use(attachUser); // Middleware pour attacher l'utilisateur à chaque requête

app.use("/api/pokemons", pokemonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);

// Route principale "/" en dernier pour ne pas écraser les autres
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to O'Pokédex API !",
    documentation: "http://localhost:3000/api/docs"
    });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
export default app;