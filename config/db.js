if (process.env.NODE_ENV == "production") {
  module.exports = {
    mongoURI: "mongodb+srv://joaomanoel2006f:80GVjH1M5g4cK2zR@cluster0.mvqmx3l.mongodb.net/blogapp?retryWrites=true&w=majority&appName=Cluster0"
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/blogapp"
  };
}
