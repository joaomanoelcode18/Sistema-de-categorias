const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

// model de Usuario
require("../models/Usuarios")
const Usuario = mongoose.model("usuarios")

module.exports= function(passport){
    passport.use(new localStrategy({usernameField: 'email', passwordField:"senha"}, (email, senha, done)=>{
        Usuario.findOne({email: email}).lean().then((usuario)=>{
            if(!usuario){
                return done(null, false, {message:"está conta nao existe"})
            }
            bcrypt.compare(senha, usuario.senha, (erro, batem)=>{
                if(batem){
                    console.log("usuario autenticado")
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))
;passport.serializeUser((usuario, done) => {
    console.log("Serializando usuário:", usuario);
    if (!usuario || !usuario._id) {
        return done(new Error("Usuário inválido para serialização"), null);
    }

    done(null, usuario._id.toString()); // ✅ Convertido para string
});


passport.deserializeUser(async (id, done) => {
    try {
        const usuario = await Usuario.findById(id).lean();
        done(null, usuario);
    } catch (err) {
        done(err, null);
    }
});

}