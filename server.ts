import "./src/config/env.config";
import app from "./src/app";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
});
